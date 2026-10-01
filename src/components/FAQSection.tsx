import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: 'How do I place a custom order for a name plate or wall art?',
    answer: 'You can submit the contact form above or reach out via WhatsApp with your preferred size, family name or text, and color scheme. We prepare a digital concept preview before pouring the resin, ensuring complete satisfaction before work commences.'
  },
  {
    question: 'Does the resin yellow over time or lose its glass-like shine?',
    answer: 'No. We exclusively use premium UV-stabilized, optical-grade epoxy resin formulated with hindered amine light stabilizers (HALS). This prevents discoloration, yellowing, or fogging when kept indoors.'
  },
  {
    question: 'How does wedding flower (varmala) preservation work?',
    answer: 'After your wedding ceremony, ship or bring your garlands/flowers to our studio as quickly as possible. We carefully dehydrate each petal using specialized silica crystals to preserve their natural colors, then cast them in crystal clear resin blocks or clocks.'
  },
  {
    question: 'Do you deliver across Odisha and other states in India?',
    answer: 'Yes! We securely package all resin art pieces in multi-layer shockproof foam and reinforced wooden crates. We dispatch via reliable courier partners with insurance and real-time tracking across all Indian pin codes.'
  },
  {
    question: 'How do I clean and care for my resin art products?',
    answer: 'Simply wipe gently with a soft micro-fiber cloth and lukewarm water or mild glass cleaner. Avoid harsh abrasive scouring pads, direct prolonged outdoor sunlight, or high heat above 90°C.'
  }
];

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-[#F4EFE6] border-b border-[#E8DFC8]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#8C6D37] mb-2 flex items-center justify-center gap-2">
            <span className="w-5 h-[1.5px] bg-[#C5A059]" />
            <span>Buyer Guide</span>
            <span className="w-5 h-[1.5px] bg-[#C5A059]" />
          </div>
          <h2 className="font-serif-brand text-3xl sm:text-4xl font-bold text-[#2B2118] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#5A483B]">
            Everything you need to know about our resin materials, customization timelines, and care.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-[#FAF7F2] rounded-xl border border-[#E0D5BE] overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif-brand text-base sm:text-lg font-bold text-[#2B2118]">
                    {faq.question}
                  </span>
                  <div className={`p-1 rounded-md text-[#A47E3B] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-sm text-[#5A483B] leading-relaxed border-t border-[#E8DFC8]/60 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-10 p-5 rounded-xl bg-[#FAF7F2] border border-[#E0D5BE] text-center text-xs text-[#6B5746]">
          Have a question not listed here? Call our studio directly at <a href="tel:+918646865900" className="font-semibold text-[#A47E3B] underline">+91 86468 65900</a> or message us on WhatsApp.
        </div>

      </div>
    </section>
  );
};
