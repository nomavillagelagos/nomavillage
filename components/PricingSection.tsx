'use client';

import { usePricingSection } from '@/hooks/usePricingSection';
import React from 'react';

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
          <div className="border rounded-xl p-6 bg-gray-50">
            <h3 className="font-montserrat text-xl font-semibold text-gray-900 mb-4">Separate Costs in Lisbon (per month)</h3>
            <div className="divide-y divide-gray-200">
              {comparison.lisbon.map((item, index) => (
                <div key={index} className="flex items-center justify-between py-3">
                  <span className="font-nunito text-gray-700">{item.item}</span>
                  <span className="font-montserrat font-semibold">{item.price}</span>
                </div>
              ))}
              <div className="flex items-center justify-between pt-4 mt-4 border-t-2 border-gray-300">
                <span className="font-montserrat font-semibold">Total</span>
                <span className="font-montserrat font-bold text-xl">€1,220+</span>
              </div>
            </div>
          </div>

          <div className="border-2 border-lagos-pink/20 rounded-xl p-6 bg-lagos-pink/5 relative">
            <div className="absolute -top-3 right-6 bg-lagos-pink text-white text-xs font-montserrat font-semibold px-3 py-1 rounded-full">
              Noma Lagos Value
            </div>
            <h3 className="font-montserrat text-xl font-semibold text-gray-900 mb-4">All-Inclusive at Noma Lagos</h3>
            <div className="divide-y divide-gray-200">
              {comparison.noma.map((item, index) => (
                <div key={index} className="flex items-center justify-between py-3">
                  <span className="font-nunito text-gray-700">{item.item}</span>
                  <span className="font-montserrat font-semibold">{item.price}</span>
                </div>
              ))}
              <div className="flex items-center justify-between pt-4 mt-4 border-t-2 border-lagos-pink/50">
                <span className="font-montserrat font-semibold">Total</span>
                <span className="font-montserrat font-bold text-2xl text-lagos-pink">{monthlyPrice}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-20">
          {tiers.map((tier, index) => (
            <div 
              key={tier.name}
              className={`border rounded-xl p-8 ${
                tier.popular 
                  ? 'border-2 border-lagos-pink shadow-lg relative overflow-hidden' 
                  : 'shadow-sm hover:shadow-md'
              } transition-all bg-white`}
            >
              {tier.popular && (
                <div className="absolute top-0 right-0 bg-lagos-pink text-white text-xs font-montserrat font-semibold px-4 py-1 rounded-bl-lg">
                  Most Popular
                </div>
              )}
              <h3 className="font-montserrat text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
              <p className="text-lagos-pink font-montserrat text-4xl font-bold mb-1">{tier.price}</p>
              {tier.popular && <p className="text-lagos-pink font-montserrat font-semibold mb-4">Save 10%</p>}
              <p className="font-nunito text-gray-600 mb-6">{tier.description}</p>
              <ul className="space-y-3 mb-8">
                {tier.features.map((feature, i) => (
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
                {tier.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
