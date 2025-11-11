import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nomavillage.com';

export const metadata: Metadata = {
  title: 'Terms and Conditions - Noma Village',
  description: 'Terms and conditions for Noma Village coliving and coworking community in Lagos, Portugal.',
  alternates: {
    canonical: `${siteUrl}/terms`,
  },
  openGraph: {
    title: 'Terms and Conditions - Noma Village',
    description:
      'Terms and conditions for Noma Village coliving and coworking community in Lagos, Portugal.',
    url: `${siteUrl}/terms`,
    siteName: 'Noma Village',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Link 
        href="https://nomavillage.com" 
        className="inline-flex items-center text-primary hover:text-primary/80 transition-colors mb-6 group"
      >
        <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
        Go back to NomaVillage
      </Link>
      
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-white to-secondary/40 border mb-10">
        <div className="absolute -left-10 top-0 h-full w-40 bg-[oklch(var(--chart-2))] opacity-10 blur-2xl rounded-full pointer-events-none" />
        <div className="absolute -right-10 top-0 h-full w-40 bg-[oklch(var(--chart-3))] opacity-10 blur-2xl rounded-full pointer-events-none" />
        <div className="relative px-6 py-14 sm:px-10">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">Terms and Conditions</h1>
          <p className="mt-3 text-lg text-muted-foreground max-w-2xl">
            Please read these terms carefully. They govern your use of Noma Village services.
          </p>
        </div>
      </section>

      <div className="prose prose-lg text-gray-700">
        <p>This agreement outlines the terms between you ("Customer") and NomaVillage. By purchasing or using our services, you confirm that you have read, understood, and agreed to these terms in full. This agreement supersedes any prior verbal or written arrangements. We believe that clarity and mutual understanding are essential for creating positive experiences for all our guests.</p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Booking & Eligibility</h2>
        <p>At NomaVillage, we strive to cultivate an inclusive community that aligns with our core values of community, honesty, openness, and compassion. Our location in the serene Algarve region of Portugal is the perfect backdrop for fostering these values. However, we reserve the right to decline reservations if we feel a participant's values or behavior do not align with our mission, or if they are unable to demonstrate remote work capability.</p>
        <p>If a reservation is declined or a participant is removed from the experience, it is to ensure the overall well-being of our community. We take our responsibility seriously to maintain a positive, respectful, and inspiring environment for everyone involved.</p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Legal Agreement</h2>
        <p>By making a down payment, you confirm the following:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>You are of legal age to enter into a binding contract.</li>
          <li>You have the authority to agree to these terms on behalf of yourself or your organization.</li>
          <li>You accept and understand that NomaVillage provides no warranties beyond what is explicitly stated.</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">Cancellation Policy</h2>
        <p>We understand that plans can change. To manage booking changes, please contact us via email at <a href="mailto:hello@nomavillage.com" className="text-lagos-blue-green hover:underline">hello@nomavillage.com</a>. Our refund policy is as follows:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>30+ days before arrival: Full refund minus a 4% processing fee.</li>
          <li>Under 30 days before arrival: No refund.</li>
          <li>No-shows: No refund.</li>
        </ul>
        <p>We strongly advise you to consider purchasing trip cancellation insurance to cover any unforeseen circumstances that may impact your travel plans.</p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Media Rights</h2>
        <h3 className="text-xl font-semibold mt-6 mb-2">NomaVillage's Usage</h3>
        <p>During your stay, we may capture photos or videos of experiences and activities at NomaVillage. By participating, you grant us permission to use this content for promotional and commercial purposes without compensation. You agree to release any claims regarding the use of your image or likeness.</p>
        
        <h3 className="text-xl font-semibold mt-6 mb-2">User Submissions</h3>
        <p>If you choose to submit your own photos or videos to NomaVillage, you confirm that you own the content and have obtained the necessary rights from all subjects. By submitting, you grant us a perpetual worldwide license to use, modify, and distribute your content across various media platforms. You release NomaVillage from any claims related to the use of your submissions.</p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Visa, Passport & Health Requirements</h2>
        <p>It is your own responsibility to ensure compliance with the immigration, visa, and health requirements of the country where the experience is located. Requirements may change over time, so we strongly recommend checking the up-to-date information provided by your country's Passport Office, the appropriate embassy or consulate, or your doctor well in advance of your departure date.</p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Events Beyond Our Reasonable Control</h2>
        <p>NomaVillage will not be held responsible for any delays or failures to fulfill our obligations if such delays or failures arise from events beyond our reasonable control. This includes, but is not limited to, natural disasters, government actions, or other unforeseen events. Please note that this condition does not affect your statutory rights as a consumer.</p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Participant Conduct and Expulsion Policy</h2>
        <p>NomaVillage reserves the right to accept, decline, or remove any participant at our sole discretion. Participants may be expelled for various reasons, including, but not limited to:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Non-payment of fees.</li>
          <li>Behavior causing distress or annoyance to other participants or staff.</li>
          <li>Actions that compromise safety or violate the law.</li>
        </ul>
        <p>Should a participant be expelled during an experience, no refunds, payments, or credits for unused services will be issued. The participant will remain responsible for the full month's fee, regardless of the circumstances leading to their removal.</p>
      </div>
    </div>
  );
}
