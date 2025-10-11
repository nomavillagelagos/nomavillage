# Form UI Updates - Remaining renderStep() Cases

## Instructions
Replace each case in the `renderStep()` function with the enhanced versions below.

---

## Case 2: Email Step (Enhanced)

```tsx
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
          className={`w-full pl-10 pr-12 p-4 text-lg border-2 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all ${
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
```

---

## Case 3: Entrepreneur Status (Enhanced)

```tsx
case 3:
  return (
    <div className="space-y-6 animate-slide-in">
      <div>
        <h2 className="text-2xl md:text-3xl font-semibold mb-2 text-gray-900">Are you an entrepreneur, working online or a freelancer?</h2>
        <p className="text-sm text-gray-500">Help us understand your background</p>
      </div>
      <div className="space-y-3">
        {['Yes', 'No. But on the way', 'No'].map((option) => (
          <label 
            key={option} 
            className={`flex items-center space-x-3 p-4 border-2 rounded-xl cursor-pointer transition-all hover:border-teal-400 hover:bg-teal-50/50 ${
              formData.entrepreneurStatus === option 
                ? 'border-teal-500 bg-teal-50 shadow-md' 
                : 'border-gray-200'
            }`}
          >
            <input
              type="radio"
              name="entrepreneurStatus"
              checked={formData.entrepreneurStatus === option}
              onChange={() => {
                setFormData(prev => ({ ...prev, entrepreneurStatus: option }));
                setTimeout(() => handleNext(), 400);
              }}
              className="h-5 w-5 text-teal-600 focus:ring-teal-500"
            />
            <span className="text-lg text-gray-700 font-medium flex-1">{option}</span>
            {formData.entrepreneurStatus === option && (
              <Check className="text-teal-500 w-5 h-5 animate-scale-in" />
            )}
          </label>
        ))}
        {errors.entrepreneurStatus && <p className="text-red-500 text-sm mt-1">{errors.entrepreneurStatus}</p>}
      </div>
    </div>
  );
```

---

## Case 4: Colive Preference (Enhanced)

```tsx
case 4:
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
            className={`flex items-center space-x-3 p-4 border-2 rounded-xl cursor-pointer transition-all hover:border-teal-400 hover:bg-teal-50/50 ${
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
                setTimeout(() => handleNext(), 400);
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
```

---

## Case 5: First Name (Enhanced)

```tsx
case 5:
  return (
    <div className="space-y-4 animate-slide-in">
      <div>
        <h2 className="text-2xl md:text-3xl font-semibold mb-2 text-gray-900">What's your first name?</h2>
        <p className="text-sm text-gray-500">Almost done! Just a few more details</p>
      </div>
      <div className="relative">
        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
        <input
          ref={(el) => { inputRefs.current[5] = el; }}
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          onKeyPress={(e) => e.key === 'Enter' && isCurrentStepValid() && handleNext()}
          disabled={isSubmitting}
          className={`w-full pl-10 pr-12 p-4 text-lg border-2 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all ${
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
```

---

## Case 6: Last Name (Enhanced)

```tsx
case 6:
  return (
    <div className="space-y-4 animate-slide-in">
      <div>
        <h2 className="text-2xl md:text-3xl font-semibold mb-2 text-gray-900">What's your last name?</h2>
        <p className="text-sm text-gray-500">One more step to go!</p>
      </div>
      <div className="relative">
        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
        <input
          ref={(el) => { inputRefs.current[6] = el; }}
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          onKeyPress={(e) => e.key === 'Enter' && isCurrentStepValid() && handleNext()}
          disabled={isSubmitting}
          className={`w-full pl-10 pr-12 p-4 text-lg border-2 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all ${
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
```

---

## Case 7: Phone Number (Enhanced)

```tsx
case 7:
  return (
    <div className="space-y-4 animate-slide-in">
      <div>
        <h2 className="text-2xl md:text-3xl font-semibold mb-2 text-gray-900">What's your phone number?</h2>
        <p className="text-sm text-gray-500">Optional - but helps us reach you faster</p>
      </div>
      <div className="flex space-x-3">
        <div className="relative w-1/3">
          <Flag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
          <select
            name="countryCode"
            value={formData.countryCode}
            onChange={handleInputChange}
            disabled={isSubmitting}
            className={`w-full pl-10 pr-3 p-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
              isSubmitting ? 'opacity-80 cursor-not-allowed' : ''
            }`}
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
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
          <input
            ref={(el) => { inputRefs.current[7] = el; }}
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            onKeyPress={(e) => e.key === 'Enter' && isCurrentStepValid() && handleSubmit()}
            disabled={isSubmitting}
            className={`w-full pl-10 pr-12 p-4 text-lg border-2 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all ${
              errors.phone ? 'border-red-500' : formData.phoneNumber && validatePhone(formData.phoneNumber) ? 'border-teal-500 bg-teal-50/30' : 'border-gray-300'
            } ${isSubmitting ? 'opacity-80 cursor-not-allowed' : ''}`}
            placeholder="Your phone number"
          />
          {formData.phoneNumber && validatePhone(formData.phoneNumber) && (
            <Check className="absolute right-3 top-1/2 -translate-y-1/2 text-teal-500 w-6 h-6 animate-scale-in" />
          )}
        </div>
      </div>
      {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
    </div>
  );
```

---

## Key Changes Summary

### Visual Improvements:
- ✅ Larger inputs (p-4 instead of p-3)
- ✅ Border-2 for more prominent borders
- ✅ Rounded-xl for softer corners
- ✅ Green borders + background tint when valid
- ✅ Animated checkmarks on valid inputs
- ✅ Subtitles under each question
- ✅ Better spacing with space-y-4/6
- ✅ Hover states on radio buttons
- ✅ Shadow effects on selected options
- ✅ pointer-events-none on icons (prevents click issues)

### Interaction Improvements:
- ✅ Auto-focus with inputRefs
- ✅ Enter key support on inputs
- ✅ Auto-advance on radio selections (400ms delay)
- ✅ Visual feedback during transitions
- ✅ Larger touch targets

### Responsive Design:
- ✅ text-2xl md:text-3xl for headings
- ✅ Mobile-first approach
- ✅ Proper text sizing across breakpoints

---

## Implementation

Simply copy each case block and replace the corresponding case in your `/app/form/page.tsx` file's `renderStep()` function.
