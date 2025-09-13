"use client"

import React from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { faqItems, type FAQItem } from "@/data/faq"
import Link from "next/link"

export default function FAQSection({
  items = faqItems,
  title = "Frequently Asked Questions",
  showViewAllLink = false,
}: {
  items?: FAQItem[]
  title?: string
  showViewAllLink?: boolean
}) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="font-montserrat text-5xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="font-nunito text-lg text-gray-600">
            Answers to common questions about staying and living with us in Lagos, Portugal
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {items.map((item, idx) => (
            <AccordionItem key={idx} value={`item-${idx}`}>
              <AccordionTrigger className="font-montserrat text-lg text-gray-900">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="font-nunito text-gray-700 leading-relaxed">
                <div dangerouslySetInnerHTML={{ __html: item.answer }} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {showViewAllLink && (
          <div className="text-center mt-10">
            <Link href="/faq" className="font-montserrat text-lagos-pink hover:underline">
              View all FAQs
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
