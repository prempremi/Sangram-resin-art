import React from 'react';
import { MapPin, Phone, Mail, Printer, ArrowUp, Navigation } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0A192F] text-slate-300 border-t border-[#1E3A5F]">
      {/* Saffron & Gold accent trim */}
      <div className="h-1 w-full bg-gradient-to-r from-[#D4AF37] via-[#EA580C] to-[#D4AF37]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <Printer className="w-6 h-6 text-[#D4AF37]" />
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-white tracking-tight">
                Sangram Resin Art
              </h3>
            </div>
            
            <p className="text-xs sm:text-sm text-[#D4AF37] font-semibold italic">
              “All Types Resin Art Design &amp; Printing Services Available”
            </p>

            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              Handcrafted bespoke resin art pieces, luxury name plates, preserved wedding keepsakes, along with full-scale commercial flex printing in Odisha.
            </p>

            <div className="p-3 bg-[#112240] rounded-lg border border-[#1E3A5F] text-xs text-slate-300 max-w-sm">
              <span className="font-bold text-[#D4AF37]">Offline Store: </span>
              Orders and physical collections are completed in person at our workshop.
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
              Services &amp; Art Collections
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              <li>
                <button
                  onClick={() => scrollTo('services')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Custom Resin Name Plates
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('services')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Resin Wall Clocks &amp; Geode Art
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('services')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Wedding Varmala Keepsakes
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('services')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Flex Banner Printing
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('services')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Visiting &amp; Wedding Cards
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('services')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  3D Acrylic Shop Boards
                </button>
              </li>
            </ul>
          </div>

          {/* Shop Location & Contact */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
              Store Location &amp; Contact
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>
                  Sangram Resin Art, Odisha, India (GPS: 20.769753, 86.468659)
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <a href="tel:+917381522808" className="text-white hover:text-[#D4AF37] font-semibold transition-colors">
                  +91 73815 22808
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>contact@sangramresinart.com</span>
              </div>

              <div className="pt-2">
                <a
                  href="https://www.google.com/maps?q=20.769753,86.468659"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#112240] hover:bg-[#1E3A5F] text-[#D4AF37] text-xs font-semibold border border-[#2A4D78] transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Navigate via Google Maps</span>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="mt-12 pt-8 border-t border-[#1E3A5F] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 Sangram Printing &amp; Design Studio. All rights reserved.</p>

          <div className="flex items-center gap-4">
            <span>Offline Local Business · Odisha, India</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-[#112240] hover:bg-[#1E3A5F] text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Back to top"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
