import React from 'react';
import { Award, Zap, IndianRupee, Palette, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const points = [
    {
      title: 'High-Quality Printing',
      desc: 'Equipped with commercial roll-to-roll printers and original eco-solvent CMYK inks that guarantee razor-sharp text, vivid photographic color saturation, and all-weather resilience.',
      icon: <Award className="w-6 h-6 text-[#D4AF37]" />,
      badge: 'Original Inks'
    },
    {
      title: 'Fast Service',
      desc: 'We know event deadlines and shop inaugurations cannot wait. Enjoy same-day flex printing, express emergency turnarounds, and instant digital proofs right inside our studio.',
      icon: <Zap className="w-6 h-6 text-[#D4AF37]" />,
      badge: 'Same-Day Options'
    },
    {
      title: 'Affordable Pricing',
      desc: 'Transparent per-square-foot pricing with zero hidden handling costs. Special volume discounts for schools, political rallies, retail campaigns, and wedding bulk cards.',
      icon: <IndianRupee className="w-6 h-6 text-[#D4AF37]" />,
      badge: 'Best Local Rates'
    },
    {
      title: 'Custom Designs Available',
      desc: 'Work 1-on-1 with experienced graphic designers right at the shop desk. We customize typography, Odia/Hindi/English fonts, and custom creative layouts to match your exact vision.',
      icon: <Palette className="w-6 h-6 text-[#D4AF37]" />,
      badge: 'Live Editing'
    },
    {
      title: 'Local Trusted Business',
      desc: 'Proudly serving Odisha businesses, event planners, families, and retail outlets for years. Known for dependable delivery, honest commitments, and friendly customer care.',
      icon: <ShieldCheck className="w-6 h-6 text-[#D4AF37]" />,
      badge: 'Odisha Proud'
    }
  ];

  return (
    <section id="why-us" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#B89628] mb-2 flex items-center gap-2">
            <span className="w-5 h-[2px] bg-[#D4AF37]" />
            <span>The Sangram Advantage</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A192F] tracking-tight">
            Why Choose Sangram Resin Art
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            From bespoke hand-poured epoxy name plates and geode wall clocks to 100-foot flex banners, we combine artisan craftsmanship with high-capacity digital print hardware.
          </p>
        </div>

        {/* 5 Points Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {points.map((pt, idx) => (
            <div
              key={idx}
              className="bg-[#F8FAFC] rounded-xl p-6 sm:p-7 border border-slate-200 hover:border-[#D4AF37] transition-all duration-200 shadow-2xs hover:shadow-sm"
            >
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-lg bg-[#0A192F] flex items-center justify-center">
                  {pt.icon}
                </div>
                <span className="text-xs font-semibold text-[#B89628] uppercase tracking-wide">
                  {pt.badge}
                </span>
              </div>

              <h3 className="font-heading text-lg sm:text-xl font-bold text-[#0A192F]">
                {pt.title}
              </h3>

              <p className="mt-2.5 text-sm text-slate-600 leading-relaxed">
                {pt.desc}
              </p>
            </div>
          ))}

          {/* Offline Store Invitation Card (6th slot in grid) */}
          <div className="bg-[#0A192F] rounded-xl p-6 sm:p-7 border border-[#1E3A5F] text-white flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider mb-2">
                Offline Store Experience
              </div>
              <h3 className="font-heading text-lg sm:text-xl font-bold text-white">
                Inspect Samples Before You Print
              </h3>
              <p className="mt-2.5 text-sm text-slate-300 leading-relaxed">
                Feel paper GSM weights, inspect banner tear resistance, and view backlit glow-sign samples live in our showroom.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#1E3A5F]">
              <a
                href="https://www.google.com/maps?q=20.769753,86.468659"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-[#D4AF37] text-[#0A192F] text-xs font-bold hover:bg-[#B89628] transition-colors"
              >
                <span>Navigate to Studio</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
