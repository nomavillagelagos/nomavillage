'use client';

import { usePricingSection } from '@/hooks/usePricingSection';
import React, { useEffect, useState } from 'react';
import ScarcityBadge from '@/components/ScarcityBadge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useInView } from '@/hooks/use-in-view';

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

  // In-view trigger for brush underline animation on day-rate banner
  const { ref: rateRef, inView: rateInView } = useInView<HTMLDivElement>({ threshold: 0.3 });

  // Pricing tiers data
  const pricingTiers = [
    {
      id: '2weeks',
      label: '2 Weeks',
      price: '€644',
      dailyRate: '€46/day',
      savings: null,
      description: 'Perfect for a short retreat',
    },
    {
      id: '3weeks',
      label: '3 Weeks',
      price: '€882',
      dailyRate: '€42/day',
      savings: null,
      description: 'Great balance of time and value',
    },
    {
      id: '1month',
      label: '1 Month',
      price: '€1,170',
      dailyRate: '€39/day',
      savings: 'Save €118 vs. 2x2-week stays',
      description: 'Best value - lowest daily rate',
    },
  ];

  const coreBenefits = [
    'Private room with ensuite bathroom',
    'Dedicated coworking space (24/7)',
    '2 pools & large outdoor area to chill',
    'High-speed WiFi (100+ Mbps)',
    'Weekly cleaning service',
    'Curated community events',
  ];

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="font-montserrat text-sm text-gray-500 mb-2">From <span className="font-semibold text-gray-800">{monthlyPrice}/month</span></p>
          <h2 className="font-montserrat text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Simple, All-Inclusive Pricing
          </h2>
          <p className="font-nunito text-lg text-gray-600 max-w-2xl mx-auto">
            Choose your stay duration. Everything included - no hidden fees.
          </p>
        </div>

        {/* Emphasized Day Rate Banner */}
        <div className="max-w-2xl mx-auto mb-6" ref={rateRef}>
          <div className="rounded-2xl border-2 border-lagos-blue-green bg-lagos-blue-green/10 px-6 py-4 text-center">
            <p className="font-montserrat text-2xl md:text-3xl font-semibold text-gray-900">
              Now from{' '}
              <span className="text-lagos-blue-green price-highlight">
                <span className="price-text">€39/day</span>
                <span
                  className={`price-brush ${rateInView ? 'is-visible' : ''}`}
                  aria-hidden
                />
              </span>
            </p>
          </div>
          <style jsx>{`
            .price-highlight { position: relative; display: inline-block; padding-bottom: 6px; }
            .price-text { position: relative; z-index: 2; }
            .price-brush {
              position: absolute;
              left: -6%;
              right: -6%;
              bottom: -4px;
              height: 26px;
              background-color: #50bbb7;
              transform: scaleX(0);
              transform-origin: left center;
              opacity: 0.85;
              z-index: 1;
              -webkit-mask-image: url('/brush-underline.webp');
              mask-image: url('/brush-underline.webp');
              -webkit-mask-repeat: no-repeat;
              mask-repeat: no-repeat;
              -webkit-mask-size: contain;
              mask-size: contain;
              -webkit-mask-position: center bottom;
              mask-position: center bottom;
            }
            @keyframes brushReveal { from { transform: scaleX(0); opacity: 0.6; } to { transform: scaleX(1); opacity: 1; } }
            .price-brush.is-visible { animation: brushReveal 900ms cubic-bezier(0.16, 1, 0.3, 1) 100ms forwards; }
          `}</style>
        </div>

        {/* Tabbed Pricing Card */}
        <div className="max-w-2xl mx-auto mb-20">
          <Tabs defaultValue="1month" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              {pricingTiers.map((tier) => (
                <TabsTrigger key={tier.id} value={tier.id} className="font-montserrat">
                  {tier.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {pricingTiers.map((tier) => (
              <TabsContent key={tier.id} value={tier.id}>
                <div className="relative border-2 border-lagos-blue-green rounded-2xl p-8 shadow-xl bg-gradient-to-br from-white to-gray-50">
                  {tier.id === '1month' && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-lagos-blue-green text-white px-4 py-1 rounded-full text-xs font-montserrat font-semibold">
                      BEST VALUE
                    </div>
                  )}

                  <div className="text-center mb-8">
                    <div className="flex items-end justify-center gap-2 mb-2">
                      <span className="text-5xl font-bold text-gray-900 font-montserrat">{tier.price}</span>
                      <span className="text-gray-500 font-nunito pb-2">/ {tier.label.toLowerCase()}</span>
                    </div>
                    <div className="text-lagos-blue-green font-montserrat font-semibold mb-2">
                      {tier.dailyRate}
                    </div>
                    {tier.savings && (
                      <div className="inline-block bg-green-50 border border-green-200 rounded-full px-3 py-1 text-sm font-montserrat font-semibold text-green-700 mb-2">
                        {tier.savings}
                      </div>
                    )}
                    <p className="font-nunito text-gray-600">{tier.description}</p>
                  </div>

                  <div className="space-y-3 mb-8">
                    {coreBenefits.map((benefit, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <svg className="h-5 w-5 text-lagos-blue-green mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="font-nunito text-gray-700">{benefit}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    onClick={onJoinClick}
                    className="w-full bg-lagos-pink hover:bg-lagos-pink/90 text-white font-montserrat text-lg py-6"
                  >
                    Join Us
                  </Button>

                  <p className="text-center text-sm text-gray-500 mt-4 font-nunito">
                    🔒 Secure payment • 📅 Flexible dates • ✉️ Instant confirmation
                  </p>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* Value Comparison Section */}
        <div className="border-t border-gray-200 pt-16 mt-8">
          <div className="text-center mb-12">
            <div className="inline-block bg-lagos-pink/10 text-lagos-pink px-4 py-1 rounded-full text-sm font-montserrat font-semibold mb-4">
              WHY NOMA LAGOS
            </div>
            <h3 className="font-montserrat text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              The All-In-One Advantage
            </h3>
            <p className="font-nunito text-lg text-gray-600 max-w-2xl mx-auto">
              See how much you save compared to piecing it together yourself in Lisbon
            </p>
          </div>

          {/* Comparison Table - Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
          {/* DIY Lisbon Column */}
          <div className="bg-gray-50 rounded-2xl p-8 border-2 border-gray-200 relative">
            <div className="absolute -top-3 -right-3 bg-gray-500 text-white px-3 py-1 rounded-full text-xs font-montserrat font-semibold shadow-lg rotate-12">
              ⚠️ HASSLE
            </div>
            <h3 className="font-montserrat text-2xl font-bold text-gray-900 mb-2">
              Do-It-Yourself in Lisbon
            </h3>
            <p className="font-nunito text-sm text-gray-600 mb-6">
              Monthly cost to recreate this lifestyle on your own
            </p>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-start pb-3 border-b border-gray-200">
                <div className="flex items-start gap-2">
                  <span className="text-gray-500 mt-1">❌</span>
                  <div>
                    <div className="font-nunito text-gray-700">Room in shared flat on Airbnb</div>
                    <div className="text-xs text-gray-500">No ensuite, bills extra, roommate roulette</div>
                  </div>
                </div>
                <span className="font-montserrat font-semibold text-gray-900">€1000+</span>
              </div>

              <div className="flex justify-between items-start pb-3 border-b border-gray-200">
                <div className="flex items-start gap-2">
                  <span className="text-gray-500 mt-1">❌</span>
                  <div>
                    <div className="font-nunito text-gray-700">Utilities & WiFi</div>
                    <div className="text-xs text-gray-500">Power, water, internet, gas - separate bills</div>
                  </div>
                </div>
                <span className="font-montserrat font-semibold text-gray-900">€120+</span>
              </div>

              <div className="flex justify-between items-start pb-3 border-b border-gray-200">
                <div className="flex items-start gap-2">
                  <span className="text-gray-500 mt-1">❌</span>
                  <div>
                    <div className="font-nunito text-gray-700">Coworking space</div>
                    <div className="text-xs text-gray-500">Hot desk, limited hours, no dedicated area</div>
                  </div>
                </div>
                <span className="font-montserrat font-semibold text-gray-900">€250+</span>
              </div>

              <div className="flex justify-between items-start pb-3 border-b border-gray-200">
                <div className="flex items-start gap-2">
                  <span className="text-gray-500 mt-1">❌</span>
                  <div>
                    <div className="font-nunito text-gray-700">Yoga & fitness</div>
                    <div className="text-xs text-gray-500">Drop-in rates, gym membership extra</div>
                  </div>
                </div>
                <span className="font-montserrat font-semibold text-gray-900">€150+</span>
              </div>

              <div className="flex justify-between items-start pb-3 border-b border-gray-200">
                <div className="flex items-start gap-2">
                  <span className="text-gray-500 mt-1">❌</span>
                  <div>
                    <div className="font-nunito text-gray-700">Cleaning & laundry</div>
                    <div className="text-xs text-gray-500">Laundromat, cleaning products, your time</div>
                  </div>
                </div>
                <span className="font-montserrat font-semibold text-gray-900">€80+</span>
              </div>

              <div className="flex justify-between items-start pb-3 border-b border-gray-200">
                <div className="flex items-start gap-2">
                  <span className="text-gray-500 mt-1">❌</span>
                  <div>
                    <div className="font-nunito text-gray-700">Transport to beach</div>
                    <div className="text-xs text-gray-500">Uber/bus to Cascais, time wasted commuting</div>
                  </div>
                </div>
                <span className="font-montserrat font-semibold text-gray-900">€100+</span>
              </div>

              <div className="flex justify-between items-start pb-3 border-b border-gray-200 bg-gray-50/50 -mx-2 px-2 py-2">
                <div className="flex items-start gap-2">
                  <span className="text-gray-500 mt-1">❌</span>
                  <div>
                    <div className="font-nunito text-gray-700 font-semibold">Community & social life</div>
                    <div className="text-xs text-gray-600 font-medium">Good luck finding like-minded people...</div>
                  </div>
                </div>
                <span className="font-montserrat font-semibold text-gray-400 italic">???</span>
              </div>

              <div className="flex justify-between items-start pb-3 bg-gray-50/50 -mx-2 px-2 py-2">
                <div className="flex items-start gap-2">
                  <span className="text-gray-500 mt-1">❌</span>
                  <div>
                    <div className="font-nunito text-gray-700 font-semibold">Your time & energy</div>
                    <div className="text-xs text-gray-600 font-medium">Coordinating everything yourself</div>
                  </div>
                </div>
                <span className="font-montserrat font-semibold text-gray-400 italic">∞</span>
              </div>
            </div>

            <div className="pt-4 border-t-2 border-gray-300 bg-gray-50/30 -mx-4 px-4 pb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-montserrat font-bold text-gray-900">Monthly Total</span>
                <span className="font-montserrat text-3xl font-bold text-gray-700">€1,700+</span>
              </div>
              <p className="text-sm text-gray-600 font-semibold mt-2">
                ⚠️ Plus: Lonely, time-consuming, stressful - still no community or coastal lifestyle
              </p>
            </div>
          </div>

          {/* Noma Lagos Column */}
          <div className="bg-gradient-to-br from-lagos-aquamarine/10 to-lagos-blue-green/10 rounded-2xl p-8 border-2 border-lagos-blue-green relative overflow-visible shadow-xl">
            <div className="absolute -top-3 -right-3 bg-lagos-blue-green text-white px-4 py-1 rounded-full text-xs font-montserrat font-semibold shadow-lg">
              BEST VALUE
            </div>


            <h3 className="font-montserrat text-2xl font-bold text-gray-900 mb-2">
              All-Inclusive at Noma Lagos
            </h3>
            <p className="font-nunito text-sm text-gray-600 mb-6">
              Everything you need in one beautiful package
            </p>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-start pb-3 border-b border-lagos-blue-green/20">
                <div className="flex items-start">
                  <div>
                    <div className="font-nunito text-gray-900 font-semibold">Private room with ensuite</div>
                    <div className="text-xs text-gray-600">Queen bed, desk, A/C, cleaning</div>
                  </div>
                </div>
                <span className="font-montserrat font-semibold text-lagos-blue-green">✓</span>
              </div>

              <div className="flex justify-between items-start pb-3 border-b border-lagos-blue-green/20">
                <div className="flex items-start">
                  <div>
                    <div className="font-nunito text-gray-900 font-semibold">Dedicated coworking space</div>
                    <div className="text-xs text-gray-600">24/7 access, multiple zones</div>
                  </div>
                </div>
                <span className="font-montserrat font-semibold text-lagos-blue-green">✓</span>
              </div>

              <div className="flex justify-between items-start pb-3 border-b border-lagos-blue-green/20">
                <div className="flex items-start">
                  <div>
                    <div className="font-nunito text-gray-900 font-semibold">2 pools & large outdoor area</div>
                    <div className="text-xs text-gray-600">Perfect space to relax and recharge</div>
                  </div>
                </div>
                <span className="font-montserrat font-semibold text-lagos-blue-green">✓</span>
              </div>

              <div className="flex justify-between items-start pb-3 border-b border-lagos-blue-green/20">
                <div className="flex items-start">
                  <div>
                    <div className="font-nunito text-gray-900 font-semibold">All utilities + 100 Mbps WiFi</div>
                    <div className="text-xs text-gray-600">No surprise bills, ever</div>
                  </div>
                </div>
                <span className="font-montserrat font-semibold text-lagos-blue-green">✓</span>
              </div>

              <div className="flex justify-between items-start pb-3 border-b border-lagos-blue-green/20">
                <div className="flex items-start">
                  <div>
                    <div className="font-nunito text-gray-900 font-semibold">Curated community</div>
                    <div className="text-xs text-gray-600">145+ vetted remote professionals</div>
                  </div>
                </div>
                <span className="font-montserrat font-semibold text-lagos-blue-green">✓</span>
              </div>

              <div className="flex justify-between items-start pb-3">
                <div className="flex items-start">
                  <div>
                    <div className="font-nunito text-gray-900 font-semibold">Golden beaches & surf</div>
                    <div className="text-xs text-gray-600">10-min walk, year-round sunshine</div>
                  </div>
                </div>
                <span className="font-montserrat font-semibold text-lagos-blue-green">✓</span>
              </div>
            </div>

            <div className="pt-4 border-t-2 border-lagos-blue-green bg-gradient-to-r from-green-50 to-blue-50 -mx-4 px-4 pb-4">
              <div className="flex justify-between items-center mb-3">
                <span className="font-montserrat font-bold text-gray-900">Your Monthly Total</span>
                <span className="font-montserrat text-4xl font-bold text-lagos-blue-green">€1,170</span>
              </div>
              <div className="bg-[#50bbb7] text-black rounded-lg px-4 py-3 mb-3 shadow-md">
                <p className="text-base font-montserrat font-bold">
                  Actually CHEAPER than DIY!
                </p>
                <p className="text-sm font-nunito mt-1">
                  Save €200+/month • Zero hassle • Instant community
                </p>
              </div>
              <div className="bg-lagos-blue-green/10 border-2 border-lagos-blue-green rounded-lg px-3 py-2">
                <p className="text-sm text-gray-800 font-semibold">
                  ✨ <strong>Plus:</strong> Instant friends, weekly events, beach lifestyle, surf lessons, yoga, and memories that last forever
                </p>
              </div>
            </div>
            {/* Button under the right card (desktop only) */}
            <div className="md:col-start-2 mt-4">
              <Button
                onClick={onJoinClick}
                className="w-full bg-lagos-pink hover:bg-lagos-pink/90 text-white font-montserrat text-lg py-4"
              >
                Join Us
              </Button>
            </div>
          </div>
        </div>

        {/* Comparison Table - Mobile Horizontal Scroll */}
        <div className="md:hidden overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-4 px-4 mb-10 overflow-y-visible">
          <div className="flex gap-4 pb-4 pt-6">
            {/* Noma Lagos Column (Mobile First - Restored) */}
            <div className="flex-none w-[85vw] snap-center bg-gradient-to-br from-lagos-aquamarine/10 to-lagos-blue-green/10 rounded-2xl p-6 border-2 border-lagos-blue-green relative overflow-visible shadow-xl">
              <div className="absolute -top-3 -right-3 bg-lagos-blue-green text-white px-4 py-1 rounded-full text-xs font-montserrat font-semibold shadow-lg">
                BEST VALUE
              </div>

              <h3 className="font-montserrat text-xl font-bold text-gray-900 mb-2">
                All-Inclusive at Noma Lagos
              </h3>
              <p className="font-nunito text-sm text-gray-600 mb-6">
                Everything you need in one beautiful package
              </p>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-start pb-3 border-b border-lagos-blue-green/20">
                  <div className="flex items-start">
                    <div>
                      <div className="font-nunito text-gray-900 font-semibold text-sm">Private room with ensuite</div>
                      <div className="text-xs text-gray-600">Queen bed, desk, A/C, cleaning</div>
                    </div>
                  </div>
                  <span className="font-montserrat font-semibold text-lagos-blue-green">✓</span>
                </div>

                <div className="flex justify-between items-start pb-3 border-b border-lagos-blue-green/20">
                  <div className="flex items-start">
                    <div>
                      <div className="font-nunito text-gray-900 font-semibold text-sm">Dedicated coworking space</div>
                      <div className="text-xs text-gray-600">24/7 access, multiple zones</div>
                    </div>
                  </div>
                  <span className="font-montserrat font-semibold text-lagos-blue-green">✓</span>
                </div>

                <div className="flex justify-between items-start pb-3 border-b border-lagos-blue-green/20">
                  <div className="flex items-start">
                    <div>
                      <div className="font-nunito text-gray-900 font-semibold text-sm">2 pools & large outdoor area</div>
                      <div className="text-xs text-gray-600">Perfect space to relax and recharge</div>
                    </div>
                  </div>
                  <span className="font-montserrat font-semibold text-lagos-blue-green">✓</span>
                </div>

                <div className="flex justify-between items-start pb-3 border-b border-lagos-blue-green/20">
                  <div className="flex items-start">
                    <div>
                      <div className="font-nunito text-gray-900 font-semibold text-sm">All utilities + 100 Mbps WiFi</div>
                      <div className="text-xs text-gray-600">No surprise bills, ever</div>
                    </div>
                  </div>
                  <span className="font-montserrat font-semibold text-lagos-blue-green">✓</span>
                </div>

                <div className="flex justify-between items-start pb-3">
                  <div className="flex items-start">
                    <div>
                      <div className="font-nunito text-gray-900 font-semibold text-sm">Curated community</div>
                      <div className="text-xs text-gray-600">145+ vetted remote professionals</div>
                    </div>
                  </div>
                  <span className="font-montserrat font-semibold text-lagos-blue-green">✓</span>
                </div>

                <div className="flex justify-between items-start pb-3">
                  <div className="flex items-start">
                    <div>
                      <div className="font-nunito text-gray-900 font-semibold text-sm">Golden beaches & surf</div>
                      <div className="text-xs text-gray-600">10-min walk, year-round sunshine</div>
                    </div>
                  </div>
                  <span className="font-montserrat font-semibold text-lagos-blue-green">✓</span>
                </div>
              </div>

              <div className="pt-4 border-t-2 border-lagos-blue-green bg-gradient-to-r from-green-50 to-blue-50 -mx-4 px-4 pb-4">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-montserrat font-bold text-gray-900 text-sm">Your Monthly Total</span>
                  <span className="font-montserrat text-3xl font-bold text-lagos-blue-green">€1,170</span>
                </div>
                <div className="bg-[#50bbb7] text-black rounded-lg px-3 py-2 mb-3 shadow-md">
                  <p className="text-sm font-montserrat font-bold">
                    Actually CHEAPER than DIY!
                  </p>
                  <p className="text-xs font-nunito mt-1">
                    Save €200+/month • Zero hassle • Instant community
                  </p>
                </div>
                <div className="bg-lagos-blue-green/10 border-2 border-lagos-blue-green rounded-lg px-3 py-2">
                  <p className="text-xs text-gray-800 font-semibold">
                    ✨ <strong>Plus:</strong> Instant friends, weekly events, beach lifestyle, surf lessons, yoga, and memories that last forever
                  </p>
                </div>
              </div>
            </div>

            {/* DIY Lisbon Column */}
            <div className="flex-none w-[85vw] snap-center bg-gray-50 rounded-2xl p-6 border-2 border-gray-200 relative">
              <div className="absolute -top-3 -right-3 bg-gray-500 text-white px-3 py-1 rounded-full text-xs font-montserrat font-semibold shadow-lg rotate-12">
                ⚠️ HASSLE
              </div>
              <h3 className="font-montserrat text-xl font-bold text-gray-900 mb-2">
                Do-It-Yourself in Lisbon
              </h3>
              <p className="font-nunito text-sm text-gray-600 mb-6">
                Monthly cost to recreate this lifestyle on your own
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-start pb-3 border-b border-gray-200">
                  <div className="flex items-start gap-2">
                    <span className="text-gray-500 mt-1">❌</span>
                    <div>
                      <div className="font-nunito text-gray-700 text-sm">Room in shared flat on Airbnb</div>
                      <div className="text-xs text-gray-500">No ensuite, bills extra, roommate roulette</div>
                    </div>
                  </div>
                  <span className="font-montserrat font-semibold text-gray-900">€1000+</span>
                </div>

                <div className="flex justify-between items-start pb-3 border-b border-gray-200">
                  <div className="flex items-start gap-2">
                    <span className="text-gray-500 mt-1">❌</span>
                    <div>
                      <div className="font-nunito text-gray-700 text-sm">Utilities & WiFi</div>
                      <div className="text-xs text-gray-500">Power, water, internet, gas - separate bills</div>
                    </div>
                  </div>
                  <span className="font-montserrat font-semibold text-gray-900">€120+</span>
                </div>

                <div className="flex justify-between items-start pb-3 border-b border-gray-200">
                  <div className="flex items-start gap-2">
                    <span className="text-gray-500 mt-1">❌</span>
                    <div>
                      <div className="font-nunito text-gray-700 text-sm">Coworking space</div>
                      <div className="text-xs text-gray-500">Hot desk, limited hours, no dedicated area</div>
                    </div>
                  </div>
                  <span className="font-montserrat font-semibold text-gray-900">€250+</span>
                </div>

                <div className="flex justify-between items-start pb-3 border-b border-gray-200">
                  <div className="flex items-start gap-2">
                    <span className="text-gray-500 mt-1">❌</span>
                    <div>
                      <div className="font-nunito text-gray-700 text-sm">Yoga & fitness</div>
                      <div className="text-xs text-gray-500">Drop-in rates, gym membership extra</div>
                    </div>
                  </div>
                  <span className="font-montserrat font-semibold text-gray-900">€150+</span>
                </div>

                <div className="flex justify-between items-start pb-3 border-b border-gray-200">
                  <div className="flex items-start gap-2">
                    <span className="text-gray-500 mt-1">❌</span>
                    <div>
                      <div className="font-nunito text-gray-700 text-sm">Cleaning & laundry</div>
                      <div className="text-xs text-gray-500">Laundromat, cleaning products, your time</div>
                    </div>
                  </div>
                  <span className="font-montserrat font-semibold text-gray-900">€80+</span>
                </div>

                <div className="flex justify-between items-start pb-3 border-b border-gray-200">
                  <div className="flex items-start gap-2">
                    <span className="text-gray-500 mt-1">❌</span>
                    <div>
                      <div className="font-nunito text-gray-700 text-sm">Transport to beach</div>
                      <div className="text-xs text-gray-500">Uber/bus to Cascais, time wasted commuting</div>
                    </div>
                  </div>
                  <span className="font-montserrat font-semibold text-gray-900">€100+</span>
                </div>

                <div className="flex justify-between items-start pb-3 border-b border-gray-200 bg-gray-50/50 -mx-2 px-2 py-2">
                  <div className="flex items-start gap-2">
                    <span className="text-gray-500 mt-1">❌</span>
                    <div>
                      <div className="font-nunito text-gray-700 font-semibold text-sm">Community & social life</div>
                      <div className="text-xs text-gray-600 font-medium">Good luck finding like-minded people...</div>
                    </div>
                  </div>
                  <span className="font-montserrat font-semibold text-gray-400 italic">???</span>
                </div>

                <div className="flex justify-between items-start pb-3 bg-gray-50/50 -mx-2 px-2 py-2">
                  <div className="flex items-start gap-2">
                    <span className="text-gray-500 mt-1">❌</span>
                    <div>
                      <div className="font-nunito text-gray-700 font-semibold text-sm">Your time & energy</div>
                      <div className="text-xs text-gray-600 font-medium">Coordinating everything yourself</div>
                    </div>
                  </div>
                  <span className="font-montserrat font-semibold text-gray-400 italic">∞</span>
                </div>
              </div>

              <div className="pt-4 border-t-2 border-gray-300 bg-gray-50/30 -mx-4 px-4 pb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-montserrat font-bold text-gray-900">Monthly Total</span>
                  <span className="font-montserrat text-2xl font-bold text-gray-700">€1,700+</span>
                </div>
                <p className="text-xs text-gray-600 font-semibold mt-2">
                  ⚠️ Plus: Lonely, time-consuming, stressful - still no community or coastal lifestyle
                </p>
              </div>
            </div>

            
          </div>
        </div>

        {/* Bottom message */}
        <div className="text-center mt-8">
          <p className="font-nunito text-lg text-gray-700">
            <strong>The math is simple:</strong> You get more for less, <em>and</em> you don't have to coordinate 5 different bookings.
          </p>
        </div>
      </div>
    </div>
    </section>
  );
};

export default PricingSection;
