import { useMemo } from 'react';

export const usePricingSection = () => {
  const pricingData = useMemo(() => ({
    monthlyPrice: '€990',
    dailyRate: '€33',
    title: '€33/day for the Coastal Noma Life',
    description: 'Yoga, surf-friendly schedule, coworking, community meals, and personal growth — not just accommodation, but a lifestyle transformation in Lagos.',
    
    // Cost comparison data
    comparison: {
      lisbon: [
        { item: 'Decent room in shared flat', price: '€900' },
        { item: 'Coworking space', price: '€200' },
        { item: 'Yoga classes (3x/week)', price: '€120' },
        { item: 'Community events', price: 'Priceless' },
        { item: 'Surf-friendly schedule', price: 'Rare' },
      ],
      noma: [
        { item: 'Private room with bathroom', price: 'Included' },
        { item: 'Dedicated coworking space', price: 'Included' },
        { item: 'Regular yoga & mindfulness', price: 'Included' },
        { item: 'Curated community', price: 'Included' },
        { item: 'Surf-friendly lifestyle', price: 'Included' },
      ]
    },
    
    // Pricing tiers
    tiers: [
      {
        name: '2 Weeks',
        price: '€550',
        description: 'Perfect for a short retreat',
        features: [
          'Private room & bathroom',
          'Access to all facilities',
          'Community events',
          'Weekly cleaning',
          'High-speed WiFi',
        ],
        cta: 'Book Now',
      },
      {
        name: '1 Month',
        price: '€990',
        description: 'Best value - save 10%',
        popular: true,
        features: [
          'Everything in 2 Weeks',
          'Weekly community dinners',
          'Welcome package',
          'Local SIM card',
          'Airport transfer',
        ],
        cta: 'Book Now',
      },
    ],
  }), []);

  return pricingData;
};

export default usePricingSection;
