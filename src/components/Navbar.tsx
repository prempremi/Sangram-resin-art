import React, { useState } from 'react';
import { Menu, X, Phone, MapPin, Printer } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0A192F]/95 backdrop-blur-md border-b border-[#1E3A5F] text-white">
      {/* Offline store notice banner */}
      <div className="bg-[#112240] py-1.5 px-4 text-center text-[11px] sm:text-xs text-[#E2E8F0] border-b border-[#1E3A5F] flex items-center justify-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
        <span className="font-medium text-white">Sangram Resin Art · Odisha, India</span>
        <span aria-hidden="true" className="text-[#64748B]">·</span>
        <span>Custom Resin Art &amp; Full Printing Services · Offline Orders &amp; Collection</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Zone 1: Single element Brand Wordmark */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="font-heading text-lg sm:text-xl font-bold tracking-tight text-white hover:text-[#D4AF37] transition-colors whitespace-nowrap flex items-center gap-2"
          >
            <Printer className="w-5 h-5 text-[#D4AF37]" />
            <span>Sangram Resin Art</span>
          </a>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#CBD5E1]">
            <button
              onClick={() => scrollTo('services')}
              className="hover:text-[#D4AF37] transition-colors cursor-pointer py-1"
            >
              Services &amp; Resin Art
            </button>
            <button
              onClick={() => scrollTo('why-us')}
              className="hover:text-[#D4AF37] transition-colors cursor-pointer py-1"
            >
              Why Choose Us
            </button>
            <button
              onClick={() => scrollTo('gallery')}
              className="hover:text-[#D4AF37] transition-colors cursor-pointer py-1"
            >
              Sample Works
            </button>
            <button
              onClick={() => scrollTo('location')}
              className="hover:text-[#D4AF37] transition-colors cursor-pointer py-1"
            >
              Shop Location
            </button>
            <button
              onClick={() => scrollTo('contact')}
              className="hover:text-[#D4AF37] transition-colors cursor-pointer py-1"
            >
              Contact
            </button>
          </nav>

          {/* Zone 3: Primary Actions */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <a
              href="tel:+917381522808"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#112240] hover:bg-[#1E3A5F] rounded-lg transition-colors border border-[#1E3A5F] whitespace-nowrap"
              title="Call Sangram Resin Art"
            >
              <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>+91 73815 22808</span>
            </a>

            <button
              onClick={() => scrollTo('location')}
              className="px-4 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold text-[#0A192F] bg-[#D4AF37] hover:bg-[#B89628] rounded-lg transition-all shadow-xs cursor-pointer flex items-center gap-1.5 whitespace-nowrap"
            >
              <MapPin className="w-3.5 h-3.5 text-[#0A192F]" />
              <span>Visit Shop</span>
            </button>

            {/* Mobile menu trigger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-200 hover:bg-[#112240] transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0A192F] border-b border-[#1E3A5F] px-4 pt-2 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-1 pt-2 border-t border-[#1E3A5F]">
            <button
              onClick={() => scrollTo('services')}
              className="text-left py-2.5 px-3 rounded-lg text-base font-medium text-white hover:bg-[#112240]"
            >
              Resin Art &amp; Printing Services
            </button>
            <button
              onClick={() => scrollTo('why-us')}
              className="text-left py-2.5 px-3 rounded-lg text-base font-medium text-white hover:bg-[#112240]"
            >
              Why Choose Sangram
            </button>
            <button
              onClick={() => scrollTo('gallery')}
              className="text-left py-2.5 px-3 rounded-lg text-base font-medium text-white hover:bg-[#112240]"
            >
              Gallery &amp; Samples
            </button>
            <button
              onClick={() => scrollTo('location')}
              className="text-left py-2.5 px-3 rounded-lg text-base font-medium text-white hover:bg-[#112240]"
            >
              Shop Location &amp; Directions
            </button>
            <button
              onClick={() => scrollTo('contact')}
              className="text-left py-2.5 px-3 rounded-lg text-base font-medium text-white hover:bg-[#112240]"
            >
              Inquire / Send Message
            </button>
          </div>

          <div className="pt-2 flex flex-col gap-2.5">
            <a
              href="tel:+917381522808"
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-[#112240] text-white font-semibold text-sm border border-[#1E3A5F]"
            >
              <Phone className="w-4 h-4 text-[#D4AF37]" />
              <span>Call Shop: +91 73815 22808</span>
            </a>
            <a
              href="https://www.google.com/maps?q=20.769753,86.468659"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-[#D4AF37] text-[#0A192F] font-bold text-sm"
            >
              <MapPin className="w-4 h-4" />
              <span>Get Directions to Store</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
