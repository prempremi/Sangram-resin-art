import React from 'react';
import { Palette, IndianRupee, Award, Sparkles, Check, Clock, ShieldCheck } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-16 sm:py-24 bg-[#F4EFE6] border-b border-[#E8DFC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#8C6D37] mb-2 flex items-center gap-2">
            <span className="w-5 h-[1.5px] bg-[#C5A059]" />
            <span>About Sangram Resin Art</span>
          </div>
          <h2 className="font-serif-brand text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2B2118] tracking-tight">
            Artisanal Precision in Every Pour
          </h2>
          <p className="mt-5 text-base sm:text-lg text-[#5A483B] leading-relaxed">
            We create handcrafted resin art pieces including name plates, wall decor, customized gifts, and more. Every design is unique and made with precision.
          </p>
        </div>

        {/* 3 Core Highlights (as specified in prompt) */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          
          {/* Highlight 1: Custom designs available */}
          <div className="bg-[#FAF7F2] p-7 rounded-xl border border-[#E0D5BE] shadow-xs transition-transform hover:-translate-y-1 duration-200">
            <div className="w-12 h-12 rounded-lg bg-[#F4EFE6] border border-[#E0D5BE] flex items-center justify-center text-[#A47E3B] mb-5">
              <Palette className="w-6 h-6" />
            </div>
            <h3 className="font-serif-brand text-xl font-bold text-[#2B2118]">
              Custom Designs Available
            </h3>
            <p className="mt-3 text-sm text-[#5A483B] leading-relaxed">
              Every home and milestone is distinctive. We tailor dimensions, color palettes, wood species, and personalization (names, scriptures, dried wedding flowers) strictly to your vision.
            </p>
            <ul className="mt-4 space-y-2 text-xs text-[#6B5746] pt-4 border-t border-[#E8DFC8]">
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#A47E3B]" />
                <span>Custom font styles & regional languages</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#A47E3B]" />
                <span>Pantone-matched pigment blending</span>
              </li>
            </ul>
          </div>

          {/* Highlight 2: Affordable pricing */}
          <div className="bg-[#FAF7F2] p-7 rounded-xl border border-[#E0D5BE] shadow-xs transition-transform hover:-translate-y-1 duration-200">
            <div className="w-12 h-12 rounded-lg bg-[#F4EFE6] border border-[#E0D5BE] flex items-center justify-center text-[#A47E3B] mb-5">
              <IndianRupee className="w-6 h-6" />
            </div>
            <h3 className="font-serif-brand text-xl font-bold text-[#2B2118]">
              Affordable Pricing
            </h3>
            <p className="mt-3 text-sm text-[#5A483B] leading-relaxed">
              Direct from the artisan studio with zero retail markup or middleman fees. Enjoy museum-grade resin artistry and luxury gift sets at accessible, transparent prices.
            </p>
            <ul className="mt-4 space-y-2 text-xs text-[#6B5746] pt-4 border-t border-[#E8DFC8]">
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#A47E3B]" />
                <span>Honest price estimates before pouring</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#A47E3B]" />
                <span>Bulk discounts for wedding & corporate hampers</span>
              </li>
            </ul>
          </div>

          {/* Highlight 3: Local handcrafted quality */}
          <div className="bg-[#FAF7F2] p-7 rounded-xl border border-[#E0D5BE] shadow-xs transition-transform hover:-translate-y-1 duration-200">
            <div className="w-12 h-12 rounded-lg bg-[#F4EFE6] border border-[#E0D5BE] flex items-center justify-center text-[#A47E3B] mb-5">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-serif-brand text-xl font-bold text-[#2B2118]">
              Local Handcrafted Quality
            </h3>
            <p className="mt-3 text-sm text-[#5A483B] leading-relaxed">
              Proudly made in Odisha by dedicated resin artisans. We use premium non-yellowing epoxy resin, 24k gold leaf, and seasoned hardwoods cured for 72+ hours to ensure glass-like permanence.
            </p>
            <ul className="mt-4 space-y-2 text-xs text-[#6B5746] pt-4 border-t border-[#E8DFC8]">
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#A47E3B]" />
                <span>UV-stabilized resin prevents yellowing</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#A47E3B]" />
                <span>Triple-check bubble-free optical clarity</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Handcrafted Workflow Section (Process) */}
        <div id="process" className="mt-20 pt-12 border-t border-[#E8DFC8]">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold tracking-wider uppercase text-[#8C6D37]">
              Craftsmanship Workflow
            </span>
            <h3 className="font-serif-brand text-2xl sm:text-3xl font-bold text-[#2B2118] mt-2">
              From Idea to Finished Masterpiece
            </h3>
            <p className="mt-2 text-sm text-[#5A483B]">
              Every custom order undergoes our four-stage precision curing cycle.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#FAF7F2] p-5 rounded-lg border border-[#E0D5BE]">
              <div className="text-xs font-serif-brand font-bold text-[#A47E3B] mb-1">
                01. Consultation
              </div>
              <h4 className="font-semibold text-[#2B2118] text-base mb-1">
                Concept &amp; Dimensions
              </h4>
              <p className="text-xs text-[#5A483B] leading-relaxed">
                You share your design ideas, name spelling, colors, or wedding flowers. We provide a mock plan and quote.
              </p>
            </div>

            <div className="bg-[#FAF7F2] p-5 rounded-lg border border-[#E0D5BE]">
              <div className="text-xs font-serif-brand font-bold text-[#A47E3B] mb-1">
                02. Pigment &amp; Gilt
              </div>
              <h4 className="font-semibold text-[#2B2118] text-base mb-1">
                Hand Embellishment
              </h4>
              <p className="text-xs text-[#5A483B] leading-relaxed">
                Raw crystals, minerals, dried botanicals, and 24K gold foil flakes are hand-placed in precise layers.
              </p>
            </div>

            <div className="bg-[#FAF7F2] p-5 rounded-lg border border-[#E0D5BE]">
              <div className="text-xs font-serif-brand font-bold text-[#A47E3B] mb-1">
                03. Curing Cycle
              </div>
              <h4 className="font-semibold text-[#2B2118] text-base mb-1">
                72-Hour Hardening
              </h4>
              <p className="text-xs text-[#5A483B] leading-relaxed">
                Poured in a clean, dust-controlled environment and slow-cured for rock-solid scratch and heat resistance.
              </p>
            </div>

            <div className="bg-[#FAF7F2] p-5 rounded-lg border border-[#E0D5BE]">
              <div className="text-xs font-serif-brand font-bold text-[#A47E3B] mb-1">
                04. Final Polish
              </div>
              <h4 className="font-semibold text-[#2B2118] text-base mb-1">
                Safe Packing &amp; Dispatch
              </h4>
              <p className="text-xs text-[#5A483B] leading-relaxed">
                Hand-buffed to high gloss, packaged in protective bubble crates, and dispatched with tracking across India.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
