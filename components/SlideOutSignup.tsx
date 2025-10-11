"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check, X } from "lucide-react";

type FormData = {
  email: string;
  isEntrepreneur: string;
  interests: string;
  firstName: string;
  lastName: string;
  countryCode: string;
  phone: string;
};

const OCEAN_IMG =
  "https://images.unsplash.com/photo-1470217407524-b1e77afc6ec5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2665&q=80&w=2000";

export default function SlideOutSignup() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>({
    email: "",
    isEntrepreneur: "",
    interests: "",
    firstName: "",
    lastName: "",
    countryCode: "+351",
    phone: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Prevent background scroll when panel is open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  // ESC to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validateEmail = (email: string) => /[^\s@]+@[^\s@]+\.[^\s@]+/.test(email);
  const validatePhone = (phone: string) => /^[0-9\s-]+$/.test(phone);

  const validateStep = (s = step) => {
    const e: Record<string, string> = {};
    if (s === 2 && !form.email) e.email = "Email is required";
    else if (s === 2 && !validateEmail(form.email)) e.email = "Enter a valid email";
    else if (s === 3 && !form.isEntrepreneur) e.isEntrepreneur = "Please choose one";
    else if (s === 4 && !form.interests) e.interests = "Please choose one";
    else if (s === 5 && !form.firstName.trim()) e.firstName = "First name required";
    else if (s === 6 && !form.lastName.trim()) e.lastName = "Last name required";
    else if (s === 7 && !form.phone) e.phone = "Phone required";
    else if (s === 7 && !validatePhone(form.phone)) e.phone = "Enter a valid phone";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (validateStep()) setStep((p) => Math.min(8, p + 1));
  };
  const back = () => setStep((p) => Math.max(1, p - 1));
  const close = () => setOpen(false);

  const stepContent = useMemo(() => {
    switch (step) {
      case 1:
        return (
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Welcome to NomaVillage!</h1>
            <p className="text-gray-600">The right people mean everything to us</p>
          </div>
        );
      case 2:
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">What's your email?</h2>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={onChange}
              placeholder="you@example.com"
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
        );
      case 3:
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              Are you an entrepreneur, working online or a freelancer?
            </h2>
            <div className="space-y-3">
              {["Yes", "No. But on the way", "No"].map((opt) => (
                <label key={opt} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="isEntrepreneur"
                    checked={form.isEntrepreneur === opt}
                    onChange={() => setForm((p) => ({ ...p, isEntrepreneur: opt }))}
                    className="h-5 w-5 text-teal-600 focus:ring-teal-500"
                  />
                  <span className="text-gray-800">{opt}</span>
                </label>
              ))}
              {errors.isEntrepreneur && (
                <p className="text-red-500 text-sm mt-1">{errors.isEntrepreneur}</p>
              )}
            </div>
          </div>
        );
      case 4:
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              What would you like to see at our Colive?
            </h2>
            <div className="space-y-3">
              {[
                "A Place with a Strong Community Vibe",
                "A Focus on Professional and Networking Opportunities",
                "Both of the Above",
              ].map((opt) => (
                <label key={opt} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="interests"
                    checked={form.interests === opt}
                    onChange={() => setForm((p) => ({ ...p, interests: opt }))}
                    className="h-5 w-5 text-teal-600 focus:ring-teal-500"
                  />
                  <span className="text-gray-800">{opt}</span>
                </label>
              ))}
              {errors.interests && (
                <p className="text-red-500 text-sm mt-1">{errors.interests}</p>
              )}
            </div>
          </div>
        );
      case 5:
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">What's your first name?</h2>
            <input
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={onChange}
              placeholder="First name"
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                errors.firstName ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
            )}
          </div>
        );
      case 6:
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">What's your last name?</h2>
            <input
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={onChange}
              placeholder="Last name"
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                errors.lastName ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
            )}
          </div>
        );
      case 7:
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">What's your phone number?</h2>
            <div className="flex gap-3">
              <select
                name="countryCode"
                value={form.countryCode}
                onChange={onChange}
                className="w-1/3 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                <option value="+351">+351 (PT)</option>
                <option value="+1">+1 (US)</option>
                <option value="+44">+44 (UK)</option>
                <option value="+33">+33 (FR)</option>
                <option value="+49">+49 (DE)</option>
                <option value="+34">+34 (ES)</option>
              </select>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={onChange}
                placeholder="Phone number"
                className={`flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                }`}
              />
            </div>
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>
        );
      case 8:
        return (
          <div className="text-center">
            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8 text-teal-600" />
            </div>
            <h2 className="text-3xl font-bold mb-2">Thank You!</h2>
            <p className="text-gray-600 mb-6">
              We've received your information. Our team will get in touch with you soon!
            </p>
            <a
              href="https://nomavillage.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center w-full bg-teal-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-teal-700 transition-colors"
            >
              Check out Nomavillage.com
            </a>
          </div>
        );
      default:
        return null;
    }
  }, [step, form, errors]);

  const canGoBack = step > 1 && step < 8;
  const showNav = step < 8; // hide nav on thank-you

  return (
    <div className="relative">
      {/* Trigger */}
      <button
        onClick={() => {
          setOpen(true);
          setStep(1);
        }}
        className="inline-flex items-center gap-2 bg-teal-600 text-white px-5 py-2.5 rounded-lg hover:bg-teal-700 transition-colors shadow cursor-pointer"
      >
        Join NomaVillage
      </button>

      {/* Overlay */}
      {open && (
        <div className="fixed inset-0 z-[60]">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-[1px] opacity-100 transition-opacity"
            onClick={close}
          />

          {/* Panel */}
          <div
            className={
              "absolute right-0 left-0 bottom-0 md:top-0 md:bottom-0 h-[80vh] md:h-screen w-full md:w-1/2 bg-white shadow-2xl transform transition-transform duration-300 will-change-transform overflow-hidden" +
              " " +
              (open
                ? "translate-y-0 md:translate-x-0"
                : "translate-y-full md:translate-x-full")
            }
            style={{ zIndex: 70 }}
            role="dialog"
            aria-modal="true"
          >
            {/* Close button */}
            <button
              onClick={close}
              aria-label="Close"
              className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-gray-700 shadow cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Split layout */}
            <div className="flex flex-col h-full">
              {/* Top: image */}
              <div
                className="h-1/2 bg-cover bg-center"
                style={{ backgroundImage: `url(${OCEAN_IMG})` }}
              >
                <div className="w-full h-full bg-gradient-to-t from-teal-900/50 to-transparent" />
              </div>

              {/* Bottom: form */}
              <div className="h-1/2 bg-white/95 backdrop-blur-sm border-t border-gray-100 p-5 md:p-8 overflow-y-auto">
                {/* Progress */}
                {step < 8 && (
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
                    <div
                      className="bg-teal-600 h-2.5 rounded-full transition-all duration-300"
                      style={{ width: `${(step / 7) * 100}%` }}
                    />
                  </div>
                )}

                {/* Step content */}
                <div key={step} className="transition-all duration-300">
                  {stepContent}
                </div>

                {/* Nav buttons */}
                {showNav && (
                  <div className="mt-6 flex items-center justify-between">
                    <button
                      onClick={back}
                      disabled={!canGoBack}
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                        canGoBack
                          ? "text-teal-700 hover:bg-teal-50 cursor-pointer"
                          : "text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      <ArrowLeft className="w-5 h-5" /> Back
                    </button>
                    <button
                      onClick={() => {
                        if (step === 7) {
                          // Simulate loading before showing thank-you
                          if (validateStep()) {
                            // Optionally add real submit logic here
                            setTimeout(() => setStep(8), 300);
                          }
                        } else {
                          next();
                        }
                      }}
                      className="inline-flex items-center gap-2 bg-teal-600 text-white px-5 py-2.5 rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-60 cursor-pointer"
                    >
                      {step === 7 ? "Submit" : "Next"}
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
