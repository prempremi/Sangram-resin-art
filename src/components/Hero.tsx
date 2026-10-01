import React from 'react';
import { MapPin, Phone, ArrowRight, Printer, Sparkles, Clock, ShieldCheck } from 'lucide-react';

interface HeroProps {
  onLocationClick: () => void;
  onServicesClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onLocationClick, onServicesClick }) => {
  return (
    <section className="relative overflow-hidden bg-[#0A192F] text-white pt-10 pb-16 sm:pt-16 sm:pb-24 border-b border-[#1E3A5F]">
      {/* Background print registration and subtle grid */}
      <div className="absolute inset-0 bg-pattern-navy opacity-70 pointer-events-none" />

      {/* Atmospheric lighting */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#1E3A5F]/40 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Business Name, Tagline, Subtext & Action Buttons */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Subtle Indian motif kicker */}
            <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#D4AF37] mb-3">
              <span className="w-5 h-[2px] bg-[#D4AF37]" />
              <span>Odisha Studio &amp; Workshop</span>
              <span aria-hidden="true" className="text-[#64748B]">·</span>
              <span>Bespoke Resin Art &amp; Full Printing Services</span>
            </div>

            {/* Business Name (Clearly visible as requested) */}
            <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] text-balance">
              Sangram <span className="text-[#D4AF37]">Resin Art</span>
            </h1>

            {/* Tagline */}
            <div className="mt-4 p-3 sm:p-4 bg-[#112240] border-l-4 border-[#D4AF37] rounded-r-lg max-w-xl">
              <p className="font-heading text-base sm:text-lg lg:text-xl font-bold text-[#F1F5F9] tracking-wide">
                “All Types Resin Art Design &amp; Printing Services Available”
              </p>
            </div>

            {/* Subtext */}
            <p className="mt-5 text-base sm:text-lg text-[#CBD5E1] leading-relaxed max-w-xl">
              Visit our shop for handcrafted custom resin art, luxury name plates, geode wall clocks, flex banners, and complete design solutions.
            </p>

            {/* Offline Store Notice Banner */}
            <div className="mt-4 px-3.5 py-2 rounded-lg bg-[#1E3A5F]/60 border border-[#2A4D78] text-xs text-[#E2E8F0] flex items-center gap-2 max-w-xl">
              <span className="inline-block w-2 h-2 rounded-full bg-[#EA580C] shrink-0" />
              <span>Offline Orders &amp; Direct Pick-up · Walk into our workshop in Odisha for live design proofing, resin color selection, and sample inspection.</span>
            </div>

            {/* Buttons: "Get Directions" and "Call Now" */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <a
                href="https://www.google.com/maps?q=20.769753,86.468659"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm sm:text-base font-bold text-[#0A192F] bg-[#D4AF37] hover:bg-[#B89628] rounded-lg transition-all shadow-md active:scale-98 cursor-pointer whitespace-nowrap"
              >
                <MapPin className="w-5 h-5 text-[#0A192F]" />
                <span>Get Directions</span>
              </a>

              <a
                href="tel:+917381522808"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm sm:text-base font-semibold text-white bg-[#112240] hover:bg-[#1E3A5F] rounded-lg transition-colors border border-[#2A4D78] active:scale-98 whitespace-nowrap"
              >
                <Phone className="w-4 h-4 text-[#D4AF37]" />
                <span>Call: +91 73815 22808</span>
              </a>

              <button
                type="button"
                onClick={onServicesClick}
                className="hidden sm:inline-flex items-center justify-center gap-1.5 px-4 py-3.5 text-xs font-semibold text-[#94A3B8] hover:text-white transition-colors cursor-pointer"
              >
                <span>View All Services</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Trust Markers */}
            <div className="mt-10 pt-6 border-t border-[#1E3A5F] w-full grid grid-cols-3 gap-4 text-left">
              <div>
                <div className="text-xl sm:text-2xl font-bold font-heading text-[#D4AF37] tabular-nums">
                  Resin Art
                </div>
                <div className="text-xs text-[#94A3B8] mt-0.5">
                  100% Handcrafted
                </div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold font-heading text-[#D4AF37] tabular-nums">
                  UV Stable
                </div>
                <div className="text-xs text-[#94A3B8] mt-0.5">
                  Non-Yellowing Gloss
                </div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold font-heading text-[#D4AF37] tabular-nums">
                  Odisha
                </div>
                <div className="text-xs text-[#94A3B8] mt-0.5">
                  Local Trusted Shop
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Visual of Printing Machine & Design Work */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#2A4D78] bg-[#112240]">
              <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full overflow-hidden">
                <img
                  src="/src/assets/images/hero_printing_press_1790843426570.jpg"
                  alt="Sangram Printing Studio digital large format flex printer"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transform hover:scale-103 transition-transform duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/90 via-transparent to-transparent" />

                {/* Overlaid Badge */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="text-[11px] font-bold text-[#D4AF37] tracking-wider uppercase mb-1">
                    Production Unit
                  </div>
                  <div className="text-sm sm:text-base font-heading font-semibold text-white drop-shadow-sm">
                    Large-format digital flex, vinyl &amp; offset press machines
                  </div>
                </div>
              </div>

              {/* Bottom Card Bar */}
              <div className="p-4 sm:p-5 bg-[#0D2040] border-t border-[#1E3A5F] flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white">
                    Need Custom Sizing or Emergency Banners?
                  </div>
                  <div className="text-[11px] text-[#94A3B8]">
                    Visit workshop or call directly for instant queue setup
                  </div>
                </div>

                <a
                  href="https://wa.me/917381522808?text=Hello%20Sangram%20Resin%20Art!%20I%20would%20like%20to%20inquire%20about%20resin%20art%20and%20printing%20services."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-[#D4AF37] hover:text-white transition-colors flex items-center gap-1 shrink-0"
                >
                  <span>WhatsApp</span>
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
