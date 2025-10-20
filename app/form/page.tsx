 'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowLeft, Check, Mail, User, Phone, Flag, Clock, Users as UsersIcon, Sparkles, Calendar as CalendarIcon, Loader2, Home } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import { captureWithAttribution } from '@/lib/track';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { DayPicker } from 'react-day-picker';
import { format, parse, isValid, differenceInDays } from 'date-fns';
import 'react-day-picker/style.css';
import confetti from 'canvas-confetti';

const FormPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    ageRange: '',
    workStyle: '',
    colivePreference: '',
    arrivalDate: '',
    departureDate: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    additionalNotes: '',
    countryCode: '+351'
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [showResumeBanner, setShowResumeBanner] = useState(false);
  const [stepStartTime, setStepStartTime] = useState<number>(Date.now());
  const [showConfetti, setShowConfetti] = useState(false);
  const [userCountry, setUserCountry] = useState<string | undefined>(undefined); // Wait for detection
  const [numberOfDays, setNumberOfDays] = useState<number>(0);
  const [showArrivalCalendar, setShowArrivalCalendar] = useState(false);
  const [showDepartureCalendar, setShowDepartureCalendar] = useState(false);
  const [notSureDates, setNotSureDates] = useState(false);
  const inputRefs = useRef<Record<number, HTMLInputElement | HTMLSelectElement | null>>({});
  const router = useRouter();

  // Supabase client will be created on-demand inside handleSubmit
  // For progressive saving we will create it when needed in savePartialData as well

  // Format date to DD.MM.YYYY for display
  const formatDateDisplay = (dateString: string) => {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-');
    return `${day}.${month}.${year}`;
  };

  // Parse DD.MM.YYYY to YYYY-MM-DD for storage
  const parseDateInput = (displayDate: string) => {
    if (!displayDate) return '';
    const parts = displayDate.replace(/\./g, '-').split('-');
    if (parts.length === 3) {
      const [day, month, year] = parts;
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }
    return displayDate;
  };

  // Helper to get step name for analytics
  const getStepName = (stepNum: number) => {
    const names: Record<number, string> = {
      1: 'welcome',
      2: 'email',
      // 3 removed: age_range step skipped
      4: 'work_style',
      5: 'colive_preference',
      6: 'dates',
      7: 'first_name',
      8: 'last_name',
      9: 'phone_number',
      10: 'additional_notes',
      11: 'complete'
    };
    return names[stepNum] || `step_${stepNum}`;
  };

  // Track step timing for analytics and auto-focus
  useEffect(() => {
    setStepStartTime(Date.now());

    // Track step entry
    captureWithAttribution('form_step_entered', {
      step,
      step_name: getStepName(step)
    });

    // Auto-focus input on step change
    setTimeout(() => {
      const input = inputRefs.current[step];
      if (input && step > 1) {
        input.focus();
      }
    }, 100);
  }, [step]);

  // Close calendars when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.daypicker-custom') && !target.closest('button')) {
        setShowArrivalCalendar(false);
        setShowDepartureCalendar(false);
      }
    };

    if (showArrivalCalendar || showDepartureCalendar) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showArrivalCalendar, showDepartureCalendar]);

  // Detect user's country from IP address
  useEffect(() => {
    const detectCountry = async () => {
      try {
        // Use ipapi.co free API (no key required, 1000 requests/day)
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        if (data.country_code) {
          const countryCode = data.country_code.toLowerCase();
          setUserCountry(countryCode);
          console.log('🌍 Detected country:', countryCode.toUpperCase(), 'Setting as default');
        } else {
          setUserCountry('pt'); // Fallback
        }
      } catch (error) {
        console.log('Could not detect country, using default (PT)');
        setUserCountry('pt'); // Fallback on error
      }
    };
    detectCountry();
  }, []);

  // Persist form data between steps and refreshes
  useEffect(() => {
    try {
      // Check Supabase env vars
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      if (!supabaseUrl || !supabaseKey) {
        console.warn('⚠️ Supabase environment variables not set! Data will only save to localStorage.');
        console.log('Required: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY');
      } else {
        console.log('✅ Supabase configured');
      }

      // Load or generate session_id
      let sid = localStorage.getItem('nomavillage_session_id');
      if (!sid) {
        if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
          sid = crypto.randomUUID();
        } else {
          sid = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
        }
        localStorage.setItem('nomavillage_session_id', sid);
      }
      setSessionId(sid);

      // Track form session start
      captureWithAttribution('form_session_started', { session_id: sid });

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
            ageRange: data.age_range ?? prev.ageRange,
            workStyle: data.work_style ?? prev.workStyle,
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
      age_range: formData.ageRange || null,
      work_style: formData.workStyle || null,
      colive_preference: formData.colivePreference || null,
      arrival_date: formData.arrivalDate || null,
      departure_date: formData.departureDate || null,
      first_name: formData.firstName || null,
      last_name: formData.lastName || null,
      country_code: null, // Phone number now includes country code
      phone_number: formData.phoneNumber || null,
      additional_notes: formData.additionalNotes || null,
      current_step,
      is_completed: false,
      updated_at: new Date().toISOString(),
      // created_at handled by DB default on first insert if available
    } as const;

    try {
      const { data, error } = await supabase
        .from('partial_signups')
        .upsert(payload, { onConflict: 'session_id' });

      if (error) {
        // Silently fail - this is non-blocking
        // Common cause: Database columns not yet created (run SQL migration)
        console.warn('⚠️ Partial save skipped (database may need migration)');
      } else {
        console.log('✅ Saved to Supabase partial_signups:', { session_id: sessionId, step: current_step });
      }
    } catch (e) {
      // Non-blocking; rely on localStorage as backup
      // Silently fail - form still works with localStorage
    }
  };

  const validateEmail = (email: string) => {
    // More robust email validation that ensures:
    // - Valid characters only (alphanumeric, dots, hyphens, underscores, plus)
    // - Proper format with @ and domain
    // - No consecutive dots
    // - Valid TLD (at least 2 characters)
    const re = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    // Additional checks for edge cases
    if (!re.test(email)) return false;
    if (email.includes('..')) return false; // No consecutive dots
    if (email.startsWith('.') || email.endsWith('.')) return false;
    if (email.split('@')[0].startsWith('.') || email.split('@')[0].endsWith('.')) return false;
    
    return true;
  };

  const validatePhone = (phone: string) => {
    // Phone input includes country code format like "+351 912 345 678"
    // Just check if it has at least 8 characters (country code + some digits)
    return phone.length >= 8;
  };

  const validateCurrentStep = () => {
    const newErrors: Record<string, string> = {};

    if (step === 2 && !formData.email) {
      newErrors.email = 'Email is required';
    } else if (step === 2 && !validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    } else if (step === 4 && !formData.workStyle) {
      newErrors.workStyle = 'Please select an option';
    } else if (step === 5 && !formData.colivePreference) {
      newErrors.colivePreference = 'Please select an option';
    } else if (step === 6 && notSureDates) {
      // If user chose "Not sure yet" for dates, skip date validation entirely
      // and clear any previous date errors
      setErrors({});
      return true;
    } else if (step === 6 && !formData.arrivalDate) {
      newErrors.arrivalDate = 'Arrival date is required';
    } else if (step === 6 && !formData.departureDate) {
      newErrors.departureDate = 'Departure date is required';
    } else if (step === 6 && formData.arrivalDate && formData.departureDate) {
      const arrivalDate = new Date(formData.arrivalDate);
      const departureDate = new Date(formData.departureDate);
      const diffTime = departureDate.getTime() - arrivalDate.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays < 14) {
        newErrors.departureDate = 'Minimum stay is 14 days';
      } else if (diffDays <= 0) {
        newErrors.departureDate = 'Departure must be after arrival';
      }
    } else if (step === 7 && !formData.firstName) {
      newErrors.firstName = 'First name is required';
    } else if (step === 8 && !formData.lastName) {
      newErrors.lastName = 'Last name is required';
    } else if (step === 9 && formData.phoneNumber && !validatePhone(formData.phoneNumber)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Derived validity to control Next/Submit disabled state without showing errors
  const isCurrentStepValid = () => {
    if (step === 1) return true;
    if (step === 2) return !!formData.email && validateEmail(formData.email);
    if (step === 4) return !!formData.workStyle;
    if (step === 5) return !!formData.colivePreference;
    if (step === 6) {
      if (notSureDates) return true;
      if (!formData.arrivalDate || !formData.departureDate) return false;
      const arrivalDate = new Date(formData.arrivalDate);
      const departureDate = new Date(formData.departureDate);
      const diffTime = departureDate.getTime() - arrivalDate.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays >= 14;
    }
    if (step === 7) return !!formData.firstName.trim();
    if (step === 8) return !!formData.lastName.trim();
    if (step === 9) return !formData.phoneNumber || validatePhone(formData.phoneNumber);
    if (step === 10) return true; // Additional notes are optional
    return true;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      // Track step completion with timing
      const timeSpent = Math.round((Date.now() - stepStartTime) / 1000);
      captureWithAttribution('form_step_completed', {
        step,
        step_name: getStepName(step),
        time_spent_seconds: timeSpent,
        has_errors: Object.keys(errors).length > 0
      });

      let nextStep = step + 1;
      // Skip removed step 3 (age)
      if (nextStep === 3) nextStep = 4;
      // Save partial progress for the next step index
      savePartialData(nextStep);
      setStep(nextStep);
    } else {
      // Track validation failure
      captureWithAttribution('form_step_validation_failed', {
        step,
        step_name: getStepName(step),
        errors: Object.keys(errors)
      });
    }
  };

  const handlePrev = () => {
    // Track backward navigation
    captureWithAttribution('form_step_back', {
      from_step: step,
      to_step: step - 1
    });

    let prevStep = Math.max(step - 1, 1);
    // Skip removed step 3 (age)
    if (prevStep === 3) prevStep = 2;
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
        age_range: formData.ageRange || null,
        work_style: formData.workStyle || null,
        colive_preference: formData.colivePreference || null,
        arrival_date: formData.arrivalDate || null,
        departure_date: formData.departureDate || null,
        first_name: formData.firstName,
        last_name: formData.lastName,
        country_code: null, // Phone number now includes country code
        phone_number: formData.phoneNumber || null,
        additional_notes: formData.additionalNotes || null,
        created_at: new Date().toISOString(),
      };

      const { error } = await supabase.from('user_signups').insert([payload]);
      if (error) {
        captureWithAttribution('form_submit_failed', { step, error: error.message });
        throw new Error(error.message);
      }

      // ✅ SUCCESS! Now delete the partial signup entry since we have the full submission
      try {
        if (sessionId) {
          await supabase
            .from('partial_signups')
            .delete()
            .eq('session_id', sessionId);
          console.log('✅ Deleted partial signup entry:', sessionId);
        }
      } catch (deleteError) {
        // Non-blocking - log but don't fail the submission
        console.warn('Could not delete partial signup:', deleteError);
      }

      setSubmitSuccess(true);

      // Send form data to Make.com webhook (non-blocking)
      try {
        const webhookData = {
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
          phoneNumber: formData.phoneNumber || null,
          ageRange: formData.ageRange || null,
          workStyle: formData.workStyle || null,
          colivePreference: formData.colivePreference || null,
          arrivalDate: formData.arrivalDate || null,
          departureDate: formData.departureDate || null,
          additionalNotes: formData.additionalNotes || null,
          source: 'form_page',
          timestamp: new Date().toISOString(),
          sessionId: sessionId || null
        };

        fetch('https://hook.eu1.make.com/caxaxq4u39shva6swr6ctty5fmguvdba', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(webhookData)
        }).then(response => {
          if (response.ok) {
            console.log('✅ Successfully sent form data to Make.com webhook');
          } else {
            console.warn('⚠️ Make.com webhook returned non-OK status:', response.status);
          }
        }).catch(error => {
          console.warn('⚠️ Failed to send to Make.com webhook:', error);
        });
      } catch (webhookError) {
        // Non-blocking - log but don't fail the submission
        console.warn('⚠️ Webhook call failed:', webhookError);
      }

      // Fire confetti celebration - EPIC EXPLOSION! 🎉
      const count = 200;
      const defaults = {
        origin: { y: 0.5 }
      };

      function fire(particleRatio: number, opts: any) {
        confetti({
          ...defaults,
          ...opts,
          particleCount: Math.floor(count * particleRatio)
        });
      }

      // Multiple bursts from center with different spreads and speeds
      fire(0.25, {
        spread: 26,
        startVelocity: 55,
      });
      fire(0.2, {
        spread: 60,
      });
      fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8
      });
      fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2
      });
      fire(0.1, {
        spread: 120,
        startVelocity: 45,
      });

      // Calculate total time spent
      const totalTime = Math.round((Date.now() - stepStartTime) / 1000);
      captureWithAttribution('form_submit_success', {
        step: 7,
        total_fields_filled: Object.values(formData).filter(v => v).length,
        time_to_complete_seconds: totalTime
      });

      // Clear persisted data on success
      try { localStorage.removeItem('nomavillage_form'); } catch {}
      try { localStorage.removeItem('nomavillage_session_id'); } catch {}

      // Delay navigation slightly for confetti effect
      setTimeout(() => {
        router.push('/thankyou');
      }, 1200);
    } catch (err: any) {
      console.error('Submit error:', err);
      setSubmitError(err?.message || 'Something went wrong while saving your info.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Calculate number of days when dates change
    if (name === 'arrivalDate' || name === 'departureDate') {
      // If user starts entering dates after choosing "Not sure yet", disable that flag
      if (notSureDates) setNotSureDates(false);
      const arrival = name === 'arrivalDate' ? value : formData.arrivalDate;
      const departure = name === 'departureDate' ? value : formData.departureDate;

      if (arrival && departure) {
        const arrivalDate = new Date(arrival);
        const departureDate = new Date(departure);
        const diffTime = departureDate.getTime() - arrivalDate.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        setNumberOfDays(diffDays > 0 ? diffDays : 0);
      } else {
        setNumberOfDays(0);
      }
    }

    // Clear any submit errors when user is typing
    if (submitError) {
      setSubmitError(null);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="text-center space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-500">
              Welcome to <br /> <span className="text-lagos-amber">NomaVillage</span>
            </h1>
            <div className="inline-flex items-center justify-center gap-2 text-teal-700 bg-teal-50 px-4 py-2 rounded-full mx-auto shadow-sm">
              <UsersIcon className="w-4 h-4" />
              <span className="text-sm font-medium">so far 145+ guests from 26+ countries</span>
            </div>
            <p className="text-xl md:text-2xl text-gray-600 leading-snug">
              Join remote workers, entrepreneurs, and digital nomads

              living their best life in Lagos, Portugal 🌞 🌴 🌊
            </p>
            <div className="flex items-center justify-center gap-2 text-gray-500">
              <Clock className="w-5 h-5" />
              <p className="text-lg">
                Takes less than 1 minute
              </p>
            </div>
            <p className="text-sm text-gray-400 max-w-md mx-auto">
              🔒 Your information is safe with us. We do not share your data with third parties.
            </p>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4 animate-slide-in">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold mb-2 text-gray-900">What's your email?</h2>
              <p className="text-sm text-gray-500">We'll use this to keep you updated</p>
            </div>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
              <input
                ref={(el) => { inputRefs.current[2] = el; }}
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                onKeyPress={(e) => e.key === 'Enter' && isCurrentStepValid() && handleNext()}
                disabled={isSubmitting}
                className={`w-full pl-10 pr-12 p-4 text-lg border-2 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all bg-white ${
                  errors.email ? 'border-red-500' : formData.email && validateEmail(formData.email) ? 'border-teal-500 bg-teal-50/30' : 'border-gray-300'
                } ${isSubmitting ? 'opacity-80 cursor-not-allowed' : ''}`}
                placeholder="your.email@example.com"
              />
              {formData.email && validateEmail(formData.email) && (
                <Check className="absolute right-3 top-1/2 -translate-y-1/2 text-teal-500 w-6 h-6 animate-scale-in" />
              )}
            </div>
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
        );
      case 3:
        return null; // Step removed
      case 4:
        return (
          <div className="space-y-6 animate-slide-in">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold mb-2 text-gray-900">How do you work?</h2>
              <p className="text-sm text-gray-500">We're a community of remote workers, entrepreneurs, and digital nomads</p>
            </div>
            <div className="space-y-3">
              {[
                '🌍 Remote employee or freelancer',
                '💼 Entrepreneur or business owner',
                '🚀 Building something new',
                '🔄 In transition / exploring'
              ].map((option) => (
                <label
                  key={option}
                  className={`flex items-center space-x-3 p-4 border-2 rounded-xl cursor-pointer transition-all hover:border-teal-400 hover:bg-teal-50/50 bg-white ${
                    formData.workStyle === option
                      ? 'border-teal-500 bg-teal-50 shadow-md'
                      : 'border-gray-200'
                  }`}
                >
                  <input
                    type="radio"
                    name="workStyle"
                    checked={formData.workStyle === option}
                    onChange={() => {
                      setFormData(prev => ({ ...prev, workStyle: option }));
                      setErrors({}); // Clear any errors
                      setTimeout(() => {
                        // Advance without validation since selection is inherently valid
                        const nextStep = step + 1;
                        const timeSpent = Math.round((Date.now() - stepStartTime) / 1000);
                        captureWithAttribution('form_step_completed', {
                          step,
                          step_name: getStepName(step),
                          time_spent_seconds: timeSpent,
                          has_errors: false
                        });
                        savePartialData(nextStep);
                        setStep(nextStep);
                      }, 400);
                    }}
                    className="h-5 w-5 text-teal-600 focus:ring-teal-500"
                  />
                  <span className="text-base text-gray-700 font-medium flex-1">{option}</span>
                  {formData.workStyle === option && (
                    <Check className="text-teal-500 w-5 h-5 animate-scale-in" />
                  )}
                </label>
              ))}
              {errors.workStyle && <p className="text-red-500 text-sm mt-1">{errors.workStyle}</p>}
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-6 animate-slide-in">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold mb-2 text-gray-900">What would you like to see at our Colive?</h2>
              <p className="text-sm text-gray-500">This helps us tailor your experience</p>
            </div>
            <div className="space-y-3">
              {[
                'A Place with a Strong Community Vibe',
                'A Focus on Professional and Networking Opportunities',
                'Both of the Above'
              ].map((option) => (
                <label
                  key={option}
                  className={`flex items-center space-x-3 p-4 border-2 rounded-xl cursor-pointer transition-all hover:border-teal-400 hover:bg-teal-50/50 bg-white ${
                    formData.colivePreference === option
                      ? 'border-teal-500 bg-teal-50 shadow-md'
                      : 'border-gray-200'
                  }`}
                >
                  <input
                    type="radio"
                    name="colivePreference"
                    checked={formData.colivePreference === option}
                    onChange={() => {
                      setFormData(prev => ({ ...prev, colivePreference: option }));
                      setErrors({}); // Clear any errors
                      setTimeout(() => {
                        // Advance without validation since selection is inherently valid
                        const nextStep = step + 1;
                        const timeSpent = Math.round((Date.now() - stepStartTime) / 1000);
                        captureWithAttribution('form_step_completed', {
                          step,
                          step_name: getStepName(step),
                          time_spent_seconds: timeSpent,
                          has_errors: false
                        });
                        savePartialData(nextStep);
                        setStep(nextStep);
                      }, 400);
                    }}
                    className="h-5 w-5 text-teal-600 focus:ring-teal-500"
                  />
                  <span className="text-base text-gray-700 font-medium flex-1">{option}</span>
                  {formData.colivePreference === option && (
                    <Check className="text-teal-500 w-5 h-5 animate-scale-in" />
                  )}
                </label>
              ))}
              {errors.colivePreference && <p className="text-red-500 text-sm mt-1">{errors.colivePreference}</p>}
            </div>
          </div>
        );
      case 6:
        return (
          <div className="space-y-4 animate-slide-in">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold mb-2 text-gray-900">When are you planning to visit?</h2>
              <p className="text-sm text-gray-500">Select your arrival and departure dates (minimum 14 days)</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Arrival Date</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none z-10" />
                  <button
                    ref={(el) => { inputRefs.current[5] = el as any; }}
                    type="button"
                    onClick={() => setShowArrivalCalendar(!showArrivalCalendar)}
                    disabled={isSubmitting}
                    className={`w-full pl-10 pr-12 p-4 text-lg border-2 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-left bg-white ${
                      errors.arrivalDate ? 'border-red-500' : formData.arrivalDate ? 'border-teal-500 bg-teal-50/30' : 'border-gray-300'
                    } ${isSubmitting ? 'opacity-80 cursor-not-allowed' : 'cursor-pointer hover:border-teal-400'}`}
                  >
                    {formData.arrivalDate ? formatDateDisplay(formData.arrivalDate) : 'DD.MM.YYYY'}
                  </button>
                  <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                  {showArrivalCalendar && (
                    <div className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-2xl border-2 border-teal-500 z-50 p-4">
                      <DayPicker
                        mode="single"
                        selected={formData.arrivalDate ? parse(formData.arrivalDate, 'yyyy-MM-dd', new Date()) : undefined}
                        onSelect={(date) => {
                          if (date) {
                            const formatted = format(date, 'yyyy-MM-dd');
                            setFormData(prev => ({ ...prev, arrivalDate: formatted }));
                            if (notSureDates) setNotSureDates(false);

                            // Calculate days
                            if (formData.departureDate) {
                              const arrivalDate = new Date(formatted);
                              const departureDate = new Date(formData.departureDate);
                              const days = differenceInDays(departureDate, arrivalDate);
                              setNumberOfDays(days > 0 ? days : 0);
                            }

                            setShowArrivalCalendar(false);
                          }
                        }}
                        disabled={{ before: new Date() }}
                        className="daypicker-custom"
                      />
                    </div>
                  )}
                </div>
                {errors.arrivalDate && <p className="text-red-500 text-sm">{errors.arrivalDate}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Departure Date</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none z-10" />
                  <button
                    type="button"
                    onClick={() => setShowDepartureCalendar(!showDepartureCalendar)}
                    disabled={isSubmitting}
                    className={`w-full pl-10 pr-12 p-4 text-lg border-2 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-left bg-white ${
                      errors.departureDate ? 'border-red-500' : formData.departureDate ? 'border-teal-500 bg-teal-50/30' : 'border-gray-300'
                    } ${isSubmitting ? 'opacity-80 cursor-not-allowed' : 'cursor-pointer hover:border-teal-400'}`}
                  >
                    {formData.departureDate ? formatDateDisplay(formData.departureDate) : 'DD.MM.YYYY'}
                  </button>
                  <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                  {showDepartureCalendar && (
                    <div className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-2xl border-2 border-teal-500 z-50 p-4">
                      <DayPicker
                        mode="single"
                        selected={formData.departureDate ? parse(formData.departureDate, 'yyyy-MM-dd', new Date()) : undefined}
                        onSelect={(date) => {
                          if (date) {
                            const formatted = format(date, 'yyyy-MM-dd');
                            setFormData(prev => ({ ...prev, departureDate: formatted }));
                            if (notSureDates) setNotSureDates(false);

                            // Calculate days
                            if (formData.arrivalDate) {
                              const arrivalDate = new Date(formData.arrivalDate);
                              const departureDate = new Date(formatted);
                              const days = differenceInDays(departureDate, arrivalDate);
                              setNumberOfDays(days > 0 ? days : 0);
                            }

                            setShowDepartureCalendar(false);
                          }
                        }}
                        disabled={{ before: formData.arrivalDate ? parse(formData.arrivalDate, 'yyyy-MM-dd', new Date()) : new Date() }}
                        className="daypicker-custom"
                      />
                    </div>
                  )}
                </div>
                {errors.departureDate && <p className="text-red-500 text-sm">{errors.departureDate}</p>}
              </div>
            </div>
            {numberOfDays > 0 && (
              <div className={`mt-4 p-4 rounded-xl border-2 transition-all ${
                numberOfDays >= 14 ? 'bg-teal-50 border-teal-500' : 'bg-amber-50 border-amber-500'
              }`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-lg font-semibold ${numberOfDays >= 14 ? 'text-teal-700' : 'text-amber-700'}`}>
                      {numberOfDays} {numberOfDays === 1 ? 'day' : 'days'}
                    </p>
                    <p className={`text-sm ${numberOfDays >= 14 ? 'text-teal-600' : 'text-amber-600'}`}>
                      {numberOfDays >= 14 ? 'Perfect! Your stay meets the minimum requirement' : `${14 - numberOfDays} more ${14 - numberOfDays === 1 ? 'day' : 'days'} needed to meet minimum`}
                    </p>
                  </div>
                  {numberOfDays >= 14 && (
                    <Check className="w-8 h-8 text-teal-500" />
                  )}
                </div>
              </div>
            )}
            {/* Alternative path: Not sure about dates */}
            <div className="mt-2 pt-2 border-t border-gray-200">
              <button
                type="button"
                onClick={() => {
                  setNotSureDates(true);
                  // Set arrival to today and departure to tomorrow when user is unsure
                  const today = new Date();
                  const tomorrow = new Date(today);
                  tomorrow.setDate(tomorrow.getDate() + 1);
                  setFormData(prev => ({
                    ...prev,
                    arrivalDate: format(today, 'yyyy-MM-dd'),
                    departureDate: format(tomorrow, 'yyyy-MM-dd')
                  }));
                  setNumberOfDays(1);
                  setErrors((prev) => {
                    const n = { ...prev };
                    delete n.arrivalDate;
                    delete n.departureDate;
                    return n;
                  });
                  captureWithAttribution('form_dates_unsure_selected', { step: 6 });
                  const nextStep = step + 1;
                  savePartialData(nextStep);
                  setStep(nextStep);
                }}
                className="w-full text-center px-6 py-3 rounded-lg border-2 border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer"
              >
                Not sure yet
              </button>
              <p className="text-xs text-gray-500 mt-2 text-center">You can always tell us later or we can help you pick dates.</p>
            </div>
          </div>
        );
      case 7:
        return (
          <div className="space-y-4 animate-slide-in">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold mb-2 text-gray-900">What's your first name?</h2>
              <p className="text-sm text-gray-500">Almost done! Just a few more details</p>
            </div>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
              <input
                ref={(el) => { inputRefs.current[7] = el; }}
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                onKeyPress={(e) => e.key === 'Enter' && isCurrentStepValid() && handleNext()}
                disabled={isSubmitting}
                className={`w-full pl-10 pr-12 p-4 text-lg border-2 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all bg-white ${
                  errors.firstName ? 'border-red-500' : formData.firstName.trim() ? 'border-teal-500 bg-teal-50/30' : 'border-gray-300'
                } ${isSubmitting ? 'opacity-80 cursor-not-allowed' : ''}`}
                placeholder="Your first name"
              />
              {formData.firstName.trim() && (
                <Check className="absolute right-3 top-1/2 -translate-y-1/2 text-teal-500 w-6 h-6 animate-scale-in" />
              )}
            </div>
            {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
          </div>
        );
      case 8:
        return (
          <div className="space-y-4 animate-slide-in">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold mb-2 text-gray-900">What's your last name?</h2>
              <p className="text-sm text-gray-500">One more step to go!</p>
            </div>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
              <input
                ref={(el) => { inputRefs.current[8] = el; }}
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                onKeyPress={(e) => e.key === 'Enter' && isCurrentStepValid() && handleNext()}
                disabled={isSubmitting}
                className={`w-full pl-10 pr-12 p-4 text-lg border-2 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all bg-white ${
                  errors.lastName ? 'border-red-500' : formData.lastName.trim() ? 'border-teal-500 bg-teal-50/30' : 'border-gray-300'
                } ${isSubmitting ? 'opacity-80 cursor-not-allowed' : ''}`}
                placeholder="Your last name"
              />
              {formData.lastName.trim() && (
                <Check className="absolute right-3 top-1/2 -translate-y-1/2 text-teal-500 w-6 h-6 animate-scale-in" />
              )}
            </div>
            {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
          </div>
        );
      case 9:
        return (
          <div className="space-y-4 animate-slide-in">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold mb-2 text-gray-900">What's your phone number?</h2>
              <p className="text-sm text-gray-500">Optional - but helps us reach you faster</p>
            </div>
            <div className={`relative ${errors.phone ? 'phone-error-container' : ''} ${formData.phoneNumber && formData.phoneNumber.length > 8 ? 'phone-valid-container' : ''}`}>
              {userCountry ? (
                <div
                  className="phone-wrapper"
                  style={{
                    position: 'relative',
                    width: '100%',
                    border: errors.phone ? '2px solid #ef4444' : (formData.phoneNumber && formData.phoneNumber.length > 8 ? '2px solid #14b8a6' : '2px solid #d1d5db'),
                    borderRadius: '0.75rem',
                    padding: '0 1rem',
                    height: '56px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    background: formData.phoneNumber && formData.phoneNumber.length > 8 ? 'rgba(20, 184, 166, 0.03)' : 'white',
                    transition: 'all 0.2s',
                  }}
                >
                  <PhoneInput
                    key={userCountry}
                    defaultCountry={userCountry}
                  value={formData.phoneNumber}
                  onChange={(phone) => {
                    setFormData(prev => ({ ...prev, phoneNumber: phone }));
                    if (submitError) {
                      setSubmitError(null);
                    }
                  }}
                  disabled={isSubmitting}
                  inputProps={{
                    onKeyDown: (e: React.KeyboardEvent) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        e.stopPropagation();
                        if (isCurrentStepValid()) {
                          handleNext();
                        }
                      }
                    },
                    style: {
                      border: 'none',
                      outline: 'none',
                      background: 'transparent',
                      fontSize: '1.125rem',
                      padding: 0,
                      width: '100%',
                    }
                  }}
                  countrySelectorStyleProps={{
                    buttonStyle: {
                      border: 'none',
                      background: 'transparent',
                      padding: 0,
                      margin: 0,
                    }
                  }}
                  style={{
                    border: 'none',
                    background: 'transparent',
                    padding: 0,
                    width: '100%',
                    height: 'auto',
                  }}
                />
                {formData.phoneNumber && formData.phoneNumber.length > 8 && !errors.phone && (
                  <Check className="text-teal-500 w-6 h-6 animate-scale-in pointer-events-none flex-shrink-0" />
                )}
              </div>
              ) : (
                <div
                  className="phone-wrapper"
                  style={{
                    position: 'relative',
                    width: '100%',
                    border: '2px solid #d1d5db',
                    borderRadius: '0.75rem',
                    padding: '0 1rem',
                    height: '56px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'white',
                  }}
                >
                  <span className="text-gray-400">Loading...</span>
                </div>
              )}
            </div>
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>
        );
      case 10:
        return (
          <div className="space-y-4 animate-slide-in">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold mb-2 text-gray-900">Anything else we should know?</h2>
              <p className="text-sm text-gray-500">Optional - Share any additional information, questions, or special requests</p>
            </div>
            <div className="relative">
              <textarea
                ref={(el) => { inputRefs.current[10] = el as any; }}
                name="additionalNotes"
                value={formData.additionalNotes}
                onChange={handleInputChange}
                disabled={isSubmitting}
                rows={5}
                maxLength={500}
                className={`w-full p-4 text-lg border-2 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all resize-none bg-white ${
                  formData.additionalNotes ? 'border-teal-500 bg-teal-50/30' : 'border-gray-300'
                } ${isSubmitting ? 'opacity-80 cursor-not-allowed' : ''}`}
                placeholder="Let us know if you have any additional information, questions, or special requests..."
              />
              <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                {formData.additionalNotes.length} / 500
              </div>
            </div>
            <p className="text-xs text-gray-500">This field is completely optional. Feel free to skip if you have nothing to add.</p>
          </div>
        );
      default:
        return null;
    }
  };

  // Prevent form submission on Enter key press
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      const target = e.target as HTMLElement;

      // Allow Enter in textarea for line breaks on step 10
      if (step === 10 && target.tagName === 'TEXTAREA') {
        return;
      }

      // Prevent default for all other cases
      e.preventDefault();

      if (step < 10 && isCurrentStepValid()) {
        // Navigate to next step
        handleNext();
      }
      // On step 10, do nothing - user must click Submit button
    }
  };

  return (
    <div className="min-h-screen flex relative" onKeyDown={handleKeyDown}>
      {/* Mobile Background Image */}
      <div className="md:hidden absolute inset-0 z-0">

        <div className="absolute inset-0 bg-white" />
      </div>

      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          <div className="text-6xl animate-bounce">🎉</div>
        </div>
      )}

      {/* Form Section */}
      <div className="w-full md:w-1/2 bg-transparent md:bg-white p-8 md:p-12 flex flex-col justify-center relative z-10">
        <div className="max-w-md mx-auto w-full">
          {/* Back to Home Button */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-teal-600 transition-colors mb-6 group"
          >
            <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>

          {showResumeBanner && (
            <div className="mb-6 rounded-lg border border-teal-200 bg-teal-50 px-4 py-3 text-teal-800 flex items-start justify-between gap-3 animate-slide-in">
              <div>
                <p className="font-semibold">Resume where you left off</p>
                <p className="text-sm">We loaded your previous progress so you can continue your application.</p>
              </div>
              <button
                type="button"
                onClick={() => setShowResumeBanner(false)}
                className="text-teal-700 hover:text-teal-900 text-xl leading-none cursor-pointer"
                aria-label="Dismiss resume banner"
              >
                ×
              </button>
            </div>
          )}
          {/* Progress Bar */}
          {step < 10 && (
            <div className="mb-8">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Step {step} of 9</span>
                <span>{Math.round((step / 9) * 100)}% complete</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-teal-600 h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${(step / 9) * 100}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Form Step Content */}
          <div>
            {renderStep()}
          </div>

          {step < 9 ? (
            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={handlePrev}
                disabled={step === 1}
                className={`flex items-center px-6 py-2 rounded-lg ${step === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-teal-600 hover:bg-teal-50 cursor-pointer'}`}
              >
                <ArrowLeft className="mr-2 h-5 w-5" /> Back
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={!isCurrentStepValid()}
                className={`flex items-center px-6 py-2 rounded-lg transition-colors text-white ${
                  isCurrentStepValid() ? 'bg-teal-600 hover:bg-teal-700 cursor-pointer' : 'bg-teal-500/30 cursor-not-allowed'
                }`}
              >
                Next <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          ) : step === 9 ? (
            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={handlePrev}
                className="flex items-center px-6 py-2 rounded-lg text-teal-600 hover:bg-teal-50 cursor-pointer"
              >
                <ArrowLeft className="mr-2 h-5 w-5" /> Back
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!isCurrentStepValid() || isSubmitting}
                className={`flex items-center px-6 py-2 rounded-lg transition-colors text-white ${
                  !isCurrentStepValid() || isSubmitting ? 'bg-teal-400 cursor-not-allowed' : 'bg-teal-600 hover:bg-teal-700 cursor-pointer'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </button>
            </div>
          ) : null}

          {submitError && (
            <p className="mt-3 text-sm text-red-600">{submitError}</p>
          )}
        </div>
      </div>

      {/* Background Image Section */}
      <div className="hidden md:block md:w-1/2 relative">
        <Image
          src="/images/pool-view.webp"
          alt="NomaVillage Pool View"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-teal-900/40 to-teal-600/30 flex items-end p-12">
          <div className="text-white hidden md:block">
            <h2 className="text-4xl font-bold mb-0">Join the Noma Community</h2>
            <p className="text-teal-100 text-lg">Be part of something special at enjoy living your best life in Lagos, Portugal</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormPage;
