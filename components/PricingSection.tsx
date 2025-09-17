'use client';

import { usePricingSection } from '@/hooks/usePricingSection';
import React, { useEffect, useState } from 'react';
import ScarcityBadge from '@/components/ScarcityBadge';

interface PricingSectionProps {
  onJoinClick: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onJoinClick }) => {
  const {
    monthlyPrice,
    dailyRate,
    title,
    description,
    comparison,
    tiers
  } = usePricingSection();

  const formatLisbonPrice = (price: string) => {
    // Add a '+' suffix for numeric-like values
    const isNumeric = /^€?\d/.test(price);
    return isNumeric ? `${price.replace(/\+$/, '')}+` : price;
  };

  const mapIncludedToYes = (value?: string) => {
    if (!value) return value ?? '';
    return /^\s*included\s*$/i.test(value) ? 'Yes' : value;
  };

  // Mount flag for sequential fade-in animations
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  // Standardized core benefits
  const coreBenefits = [
    'Private room & bathroom',
    'Access to all facilities',
    'Community events',
    'Weekly cleaning',
    'High-speed WiFi',
    'Yoga',
  ];

  // Daily rates (used for display; show prominently for 1-month)
  const daily2w = `€${Math.round(790 / 14)}/day`; // ~€56/day
  const daily1m = '€49/day';

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero hint */}
        <div className="text-center mb-2">
          <p className="font-montserrat text-sm text-gray-500">From <span className="font-semibold text-gray-800">{monthlyPrice}/month</span></p>
        </div>

        {/* Value justification */}
        <div className="text-center mb-12">
          <h2 className="font-montserrat text-4xl md:text-5xl font-bold text-gray-900 mb-3">{title}</h2>
          <p className="font-nunito text-lg text-gray-600 max-w-3xl mx-auto">{description}</p>
        </div>

        {/* Cost breakdown comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="border border-dashed rounded-xl p-6 bg-[#3db4b8]/5" style={{ borderColor: '#3db4b840' }}>
            <h3 className="font-montserrat text-xl font-semibold text-gray-900 mb-4">What You'd Pay Separately in Lisbon (monthly)</h3>
            <div className="divide-y" style={{ borderColor: '#3db4b820' }}>
              {comparison.lisbon.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between py-3 transition-all duration-500 ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'}`}
                  style={{ transitionDelay: `${index * 80}ms` }}
                >
                  <span className="font-nunito text-gray-700 flex items-center gap-2"><span aria-hidden>€</span>{item.item}</span>
                  <span className="font-montserrat font-semibold text-gray-900">{formatLisbonPrice(item.price)}</span>
                </div>
              ))}
              <div className="flex items-center justify-between pt-4 mt-4 border-t-2" style={{ borderColor: '#3db4b866' }}>
                <span className="font-montserrat font-semibold">Estimated total</span>
                <span className="font-montserrat font-extrabold text-2xl md:text-3xl" style={{ color: '#3db4b8' }}>€1,220+</span>
              </div>
            </div>
          </div>

          <div className="border-2 border-lagos-pink/20 rounded-xl p-6 bg-green-50/40 relative">
            <div className="absolute -top-3 right-6 bg-lagos-pink text-white text-xs font-montserrat font-semibold px-3 py-1 rounded-full">
              Noma Lagos Value
            </div>
            <h3 className="font-montserrat text-xl font-semibold text-gray-900 mb-4">All There at Noma Lagos</h3>
            <div className="divide-y divide-gray-200">
              {comparison.noma.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between py-3 transition-all duration-500 ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'}`}
                  style={{ transitionDelay: `${index * 80}ms` }}
                >
                  <span className="font-nunito text-gray-700">{item.item}</span>
                  {mapIncludedToYes(item.price) === 'Yes' ? (
                    <span className="font-montserrat font-semibold" style={{ color: '#3db4b8' }}>Yes</span>
                  ) : (
                    <span className="font-montserrat font-semibold text-green-700">{mapIncludedToYes(item.price)}</span>
                  )}
                </div>
              ))}
              <div className="flex items-center justify-between pt-4 mt-4 border-t-2 border-lagos-pink/50">
                <span className="font-montserrat font-semibold">Total</span>
                <span className="font-montserrat font-bold text-2xl text-lagos-pink">{monthlyPrice}</span>
              </div>
            </div>
          </div>
        </div>

        

        {/* Pricing Tiers - simplified & standardized */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-20">
          {/* 2 Weeks */}
          <div className="relative border rounded-xl p-8 shadow-sm hover:shadow-md transition-all bg-white">
            <ScarcityBadge />
            <h3 className="font-montserrat text-2xl font-bold text-gray-900 mb-2">2 Weeks</h3>
            <div className="flex items-end gap-3 mb-1">
              <p className="text-lagos-pink font-montserrat text-4xl font-bold">€790</p>
              {/* No daily rate shown for 2 weeks per request; compute but keep hidden if needed: <span className=\"font-montserrat text-sm text-gray-500\">{daily2w}</span> */}
            </div>
            <p className="font-nunito text-gray-600 mb-6">Same great experience — perfect for a short retreat</p>
            <ul className="space-y-3 mb-8">
              {coreBenefits.map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <svg className="h-5 w-5 text-green-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="font-nunito text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={onJoinClick}
              className="w-full bg-lagos-pink hover:bg-lagos-pink/90 text-white font-montserrat py-3 px-6 rounded-lg transition-colors"
            >
              Join Us
            </button>
          </div>

          {/* 1 Month */}
          <div className="relative border-2 border-lagos-pink rounded-xl p-8 shadow-lg transition-all bg-white">
            <ScarcityBadge />
            <h3 className="font-montserrat text-2xl font-bold text-gray-900 mb-2">1 Month</h3>
            <div className="flex items-end gap-3 mb-1">
              <p className="text-lagos-pink font-montserrat text-4xl font-bold">€1,480</p>
              <span className="font-montserrat text-sm text-gray-900">{daily1m}</span>
            </div>
            <p className="font-montserrat text-sm text-green-700 mb-2">Save €200+ vs 2x2-week stays</p>
            <p className="font-nunito text-gray-600 mb-6">Best value — same experience, better daily rate</p>
            <ul className="space-y-3 mb-8">
              {coreBenefits.map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <svg className="h-5 w-5 text-green-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="font-nunito text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={onJoinClick}
              className="w-full bg-lagos-pink hover:bg-lagos-pink/90 text-white font-montserrat py-3 px-6 rounded-lg transition-colors"
            >
              Join Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
