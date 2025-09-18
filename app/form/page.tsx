 'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, ArrowLeft, Check, Mail, User, Phone, Flag } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import { captureWithAttribution } from '@/lib/track';
// Client component; no server-side route config exports here

// Rest of your form page code...
// Supabase integration prep (commented):
// 1) Install client:  npm i @supabase/supabase-js
// 2) Add env vars to .env.local:
//    NEXT_PUBLIC_SUPABASE_URL=your_project_url
//    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
// 3) Create client in lib/supabaseClient.ts (see example in that file).
// 4) Uncomment import and usage in handleSubmit below to store form data in 'noma_signups'.
// import { supabase } from '@/lib/supabaseClient';

const FormPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    entrepreneurStatus: '',
    colivePreference: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    countryCode: '+351'
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [showResumeBanner, setShowResumeBanner] = useState(false);
  const router = useRouter();

  // Supabase client will be created on-demand inside handleSubmit
  // For progressive saving we will create it when needed in savePartialData as well

  // Persist form data between steps and refreshes
  useEffect(() => {
    try {
      // Load or generate session_id
      let sid = localStorage.getItem('nomavillage_session_id');
      if (!sid) {
        if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
          sid = crypto.randomUUID();
        } else {
          // Fallback simple UUID if needed
          sid = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
        }
        localStorage.setItem('nomavillage_session_id', sid);
      }
      setSessionId(sid);

      // Load any locally saved form data as immediate fallback
      const raw = localStorage.getItem('nomavillage_form');
      if (raw) {
        const parsed = JSON.parse(raw);
        setFormData(prev => ({ ...prev, ...parsed }));
      }
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // If we have a session_id, try to load the partial record from Supabase and resume progress
  useEffect(() => {
    const loadPartial = async () => {
      if (!sessionId) return;

      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      if (!supabaseUrl || !supabaseAnonKey) return;
      const supabase = createClient(supabaseUrl, supabaseAnonKey);

      try {
        const { data, error } = await supabase
          .from('partial_signups')
          .select('*')
          .eq('session_id', sessionId)
          .maybeSingle();
        if (error) return;
        if (data && !data.is_completed) {
          // Merge remote partial data into form and resume step
          setFormData(prev => ({
            ...prev,
            email: data.email ?? prev.email,
            entrepreneurStatus: data.is_entrepreneur ?? prev.entrepreneurStatus,
            colivePreference: data.colive_preference ?? prev.colivePreference,
            firstName: data.first_name ?? prev.firstName,
            lastName: data.last_name ?? prev.lastName,
            countryCode: data.country_code ?? prev.countryCode,
            phoneNumber: data.phone_number ?? prev.phoneNumber,
          }));
          if (typeof data.current_step === 'number' && data.current_step >= 1 && data.current_step <= 7) {
            setStep(data.current_step);
          }
          setShowResumeBanner(true);
        }
      } catch {}
    };
    loadPartial();
  }, [sessionId]);

  // Once we have a session, perform an initial partial save for the current step (on first load)
  useEffect(() => {
    if (sessionId) {
      savePartialData(step);
    }
  }, [sessionId]);

  useEffect(() => {
    try {
      localStorage.setItem('nomavillage_form', JSON.stringify(formData));
    } catch {}
  }, [formData]);

  // Debounced autosave on field changes
  useEffect(() => {
    if (!sessionId) return;
    const t = setTimeout(() => {
      savePartialData(step);
    }, 800);
    return () => clearTimeout(t);
  }, [formData, step, sessionId]);

  // Helper to upsert partial progress to Supabase
  const savePartialData = async (current_step: number) => {
    if (!sessionId) return;
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!supabaseUrl || !supabaseAnonKey) return;
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    const payload = {
      session_id: sessionId,
      email: formData.email || null,
      is_entrepreneur: formData.entrepreneurStatus || null,
      colive_preference: formData.colivePreference || null,
      first_name: formData.firstName || null,
      last_name: formData.lastName || null,
      country_code: formData.countryCode || null,
      phone_number: formData.phoneNumber || null,
      current_step,
      is_completed: false,
      updated_at: new Date().toISOString(),
      // created_at handled by DB default on first insert if available
    } as const;

    try {
      await supabase
        .from('partial_signups')
        .upsert(payload, { onConflict: 'session_id' });
    } catch (e) {
      // Non-blocking; rely on localStorage as backup
      console.warn('Partial save failed', e);
    }
  };

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhone = (phone: string) => {
    const re = /^[0-9\s-]+$/;
    return re.test(phone);
  };

  const validateCurrentStep = () => {
    const newErrors: Record<string, string> = {};
    
    if (step === 2 && !formData.email) {
      newErrors.email = 'Email is required';
    } else if (step === 2 && !validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    } else if (step === 3 && !formData.entrepreneurStatus) {
      newErrors.entrepreneurStatus = 'Please select an option';
    } else if (step === 4 && !formData.colivePreference) {
      newErrors.colivePreference = 'Please select an option';
    } else if (step === 5 && !formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    } else if (step === 6 && !formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    } else if (step === 7 && formData.phoneNumber && !validatePhone(formData.phoneNumber)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Derived validity to control Next/Submit disabled state without showing errors
  const isCurrentStepValid = () => {
    if (step === 1) return true;
    if (step === 2) return !!formData.email && validateEmail(formData.email);
    if (step === 3) return !!formData.entrepreneurStatus;
    if (step === 4) return !!formData.colivePreference;
    if (step === 5) return !!formData.firstName.trim();
    if (step === 6) return !!formData.lastName.trim();
    if (step === 7) return !formData.phoneNumber || validatePhone(formData.phoneNumber);
    return true;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      const nextStep = Math.min(step + 1, 7);
      // Save partial progress for the next step index
      savePartialData(nextStep);
      setStep(nextStep);
    }
  };

  const handlePrev = () => {
    const prevStep = Math.max(step - 1, 1);
    savePartialData(prevStep);
    setStep(prevStep);
  };

  const handleSubmit = async () => {
    if (!isCurrentStepValid()) return;
    const ok = validateCurrentStep();
    if (!ok) return;

    // Create Supabase client only when needed (runtime)
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!supabaseUrl || !supabaseAnonKey) {
      setSubmitError('Configuration error. Please try again later.');
      return;
    }
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // Offline handling
    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      setSubmitError('You appear to be offline. Please reconnect and try again.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);
    try {
      // Map to DB schema
      const payload = {
        email: formData.email,
        is_entrepreneur: formData.entrepreneurStatus || null,
        colive_preference: formData.colivePreference || null,
        first_name: formData.firstName,
        last_name: formData.lastName,
        country_code: formData.countryCode || null,
        phone_number: formData.phoneNumber || null,
        created_at: new Date().toISOString(),
      };

      const { error } = await supabase.from('user_signups').insert([payload]);
      if (error) {
        captureWithAttribution('form_submit_failed', { step, error: error.message });
        throw new Error(error.message);
      }

      // Mark partial as completed
      try {
        if (sessionId) {
          await supabase
            .from('partial_signups')
            .update({ is_completed: true, current_step: 7, updated_at: new Date().toISOString() })
            .eq('session_id', sessionId);
        }
      } catch {}

      setSubmitSuccess(true);
      captureWithAttribution('form_submit_success', { step: 7 });

      // Clear persisted data on success
      try { localStorage.removeItem('nomavillage_form'); } catch {}
      try { localStorage.removeItem('nomavillage_session_id'); } catch {}

      router.push('/thankyou');
    } catch (err: any) {
      console.error('Submit error:', err);
      setSubmitError(err?.message || 'Something went wrong while saving your info.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4 text-gray-900">Welcome to NomaVillage!</h1>
            <p className="text-3xl text-gray-600 mb-4">
              The right people mean everything to us.
              <br />
              Please answer 2 questions.
            </p>
            <p className="text-2xl text-gray-500">
              Your information is safe with us. We do not share your data with third parties.
              <br />
              (It takes less than 1 minute to answer)
            </p>
          </div>
        );
      case 2:
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">What's your email?</h2>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={isSubmitting}
                aria-busy={isSubmitting}
                className={`w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${errors.email ? 'border-red-500' : 'border-gray-300'} ${isSubmitting ? 'opacity-80 cursor-not-allowed' : ''}`}
                placeholder="Enter your email"
              />
            </div>
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
        );
      case 3:
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Are you an entrepreneur, working online or a freelancer?</h2>
            <div className="space-y-4">
              {['Yes', 'No. But on the way', 'No'].map((option) => (
                <label key={option} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="entrepreneurStatus"
                    checked={formData.entrepreneurStatus === option}
                    onChange={() => setFormData(prev => ({ ...prev, entrepreneurStatus: option }))}
                    className="h-5 w-5 text-teal-600 focus:ring-teal-500"
                  />
                  <span className="text-gray-700">{option}</span>
                </label>
              ))}
              {errors.entrepreneurStatus && <p className="text-red-500 text-sm mt-1">{errors.entrepreneurStatus}</p>}
            </div>
          </div>
        );
      case 4:
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">What would you like to see at our Colive?</h2>
            <div className="space-y-4">
              {[
                'A Place with a Strong Community Vibe',
                'A Focus on Professional and Networking Opportunities',
                'Both of the Above'
              ].map((option) => (
                <label key={option} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="colivePreference"
                    checked={formData.colivePreference === option}
                    onChange={() => setFormData(prev => ({ ...prev, colivePreference: option }))}
                    className="h-5 w-5 text-teal-600 focus:ring-teal-500"
                  />
                  <span className="text-gray-700">{option}</span>
                </label>
              ))}
              {errors.colivePreference && <p className="text-red-500 text-sm mt-1">{errors.colivePreference}</p>}
            </div>
          </div>
        );
      case 5:
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">What's your first name?</h2>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                disabled={isSubmitting}
                aria-busy={isSubmitting}
                className={`w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${errors.firstName ? 'border-red-500' : 'border-gray-300'} ${isSubmitting ? 'opacity-80 cursor-not-allowed' : ''}`}
                placeholder="Enter your first name"
              />
            </div>
            {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
          </div>
        );
      case 6:
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">What's your last name?</h2>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                disabled={isSubmitting}
                aria-busy={isSubmitting}
                className={`w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${errors.lastName ? 'border-red-500' : 'border-gray-300'} ${isSubmitting ? 'opacity-80 cursor-not-allowed' : ''}`}
                placeholder="Enter your last name"
              />
            </div>
            {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
          </div>
        );
      case 7:
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">What's your phone number?</h2>
            <div className="flex space-x-3">
              <div className="relative w-1/3">
                <Flag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  aria-busy={isSubmitting}
                  className={`w-full pl-10 pr-3 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${isSubmitting ? 'opacity-80 cursor-not-allowed' : ''}`}
                >
                  <option value="+351">+351 (PT)</option>
                  <option value="+1">+1 (US)</option>
                  <option value="+44">+44 (UK)</option>
                  <option value="+33">+33 (FR)</option>
                  <option value="+49">+49 (DE)</option>
                  <option value="+34">+34 (ES)</option>
                </select>
              </div>
              <div className="relative flex-1">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  aria-busy={isSubmitting}
                  className={`w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${errors.phone ? 'border-red-500' : 'border-gray-300'} ${isSubmitting ? 'opacity-80 cursor-not-allowed' : ''}`}
                  placeholder="Enter your phone number"
                />
              </div>
            </div>
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>
        );
      case 8:
        return (
          <div className="text-center">
            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8 text-teal-600" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Thank You!</h2>
            <p className="text-gray-600 mb-8">We've received your information. Our team will get in touch with you soon!</p>
            <button
              onClick={() => router.push('/')}
              className="w-full bg-teal-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-teal-700 transition-colors"
            >
              Back to Home
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Form Section */}
      <div className="w-full md:w-1/2 bg-white p-8 md:p-12 flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full">
          {showResumeBanner && (
            <div className="mb-4 rounded-lg border border-teal-200 bg-teal-50 px-4 py-3 text-teal-800 flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold">Resume where you left off</p>
                <p className="text-sm">We loaded your previous progress so you can continue your application.</p>
              </div>
              <button
                type="button"
                onClick={() => setShowResumeBanner(false)}
                className="text-teal-700 hover:text-teal-900"
                aria-label="Dismiss resume banner"
              >
                ×
              </button>
            </div>
          )}
          {/* Progress Bar */}
          {step < 8 && (
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-8">
              <div 
                className="bg-teal-600 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${(step / 7) * 100}%` }}
              ></div>
            </div>
          )}

          <div key={step} className="mb-8 transition-opacity duration-300">
            {renderStep()}
          </div>

          {step < 7 ? (
            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={handlePrev}
                disabled={step === 1}
                className={`flex items-center px-6 py-2 rounded-lg ${step === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-teal-600 hover:bg-teal-50'}`}
              >
                <ArrowLeft className="mr-2 h-5 w-5" /> Back
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={!isCurrentStepValid()}
                className={`flex items-center px-6 py-2 rounded-lg transition-colors text-white ${
                  isCurrentStepValid() ? 'bg-teal-600 hover:bg-teal-700' : 'bg-teal-400 cursor-not-allowed'
                }`}
              >
                {step === 7 ? 'Submit' : 'Next'} <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          ) : step === 7 ? (
            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={handlePrev}
                className="flex items-center px-6 py-2 rounded-lg text-teal-600 hover:bg-teal-50"
              >
                <ArrowLeft className="mr-2 h-5 w-5" /> Back
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!isCurrentStepValid() || isSubmitting}
                className={`flex items-center px-6 py-2 rounded-lg transition-colors text-white ${
                  !isCurrentStepValid() || isSubmitting ? 'bg-teal-400 cursor-not-allowed' : 'bg-teal-600 hover:bg-teal-700'
                }`}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'} <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          ) : null}

          {submitError && (
            <p className="mt-3 text-sm text-red-600">{submitError}</p>
          )}
        </div>
      </div>

      {/* Background Image Section */}
      <div 
        className="hidden md:block md:w-1/2 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1470217407524-b1e77afc6ec5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2665&q=80&w=2000)'
        }}
      >
        <div className="h-full bg-gradient-to-t from-teal-900/70 to-teal-600/50 flex items-end p-12">
          <div className="text-white">
            <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
            <p className="text-teal-100">Be part of something special at NomaVillage</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormPage;
