import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, MapPin, ArrowUp } from 'lucide-react';

export const FloatingActions: React.FC = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  const whatsappUrl = "https://wa.me/917381522808?text=Hello%20Sangram%20Resin%20Art!%20I%20would%20like%20to%20inquire%20about%20your%20resin%20art%20designs%20and%20printing%20services.";
  const directionsUrl = "https://www.google.com/maps?q=20.769753,86.468659";

  useEffect(() => {
    const checkScroll = () => {
      // Appears when user scrolls past hero section (~420px)
      if (window.scrollY > 420) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', checkScroll, { passive: true });
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Floating 'Back to Top' Button */}
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Scroll back to top"
        title="Back to Top"
        className={`fixed z-40 flex items-center justify-center rounded-full bg-[#0A192F] text-[#D4AF37] border-2 border-[#D4AF37] shadow-xl hover:bg-[#112240] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer ${
          /* Mobile positioning: above bottom bar (bottom-18, right-4). Desktop: bottom-6 left-6 */
          'bottom-18 right-4 sm:bottom-6 sm:left-6 w-11 h-11 sm:w-12 sm:h-12'
        } ${
          showBackToTop
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <ArrowUp className="w-5 h-5 text-[#D4AF37] stroke-[2.5]" />
      </button>

      {/* Desktop Floating Actions (Bottom Right) */}
      <aside aria-label="Desktop Quick Actions" className="hidden sm:flex flex-col gap-3 fixed bottom-6 right-6 z-40">
        <a
          href="tel:+917381522808"
          className="flex items-center gap-2.5 px-4 py-3 bg-[#0A192F] hover:bg-[#112240] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-[#1E3A5F] active:scale-95 group"
          title="Call Shop Now"
        >
          <Phone className="w-4 h-4 text-[#D4AF37]" />
          <span className="text-xs font-bold tracking-wide">Call Studio</span>
        </a>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 px-4 py-3 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95 group"
          title="Chat on WhatsApp"
        >
          <MessageCircle className="w-5 h-5 fill-current" />
          <span className="text-xs font-bold tracking-wide">WhatsApp Us</span>
        </a>
      </aside>

      {/* Mobile Sticky Action Bar (Bottom Screen - Under 15% Viewport Budget, Large Tap Targets) */}
      <nav aria-label="Mobile quick actions" className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0A192F]/98 backdrop-blur-md border-t border-[#1E3A5F] p-2 flex items-center gap-2">
        <a
          href="tel:+917381522808"
          className="flex-1 min-h-[46px] flex items-center justify-center gap-1.5 px-3 rounded-lg bg-[#112240] text-white text-xs font-bold active:bg-[#1E3A5F] transition-colors border border-[#2A4D78]"
        >
          <Phone className="w-4 h-4 text-[#D4AF37]" />
          <span>Call Shop</span>
        </a>

        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 min-h-[46px] flex items-center justify-center gap-1.5 px-3 rounded-lg bg-[#D4AF37] text-[#0A192F] text-xs font-bold active:bg-[#B89628] transition-colors"
        >
          <MapPin className="w-4 h-4" />
          <span>Get Directions</span>
        </a>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-[46px] min-h-[46px] flex items-center justify-center rounded-lg bg-[#25D366] text-white active:bg-[#20ba59] transition-colors"
          title="WhatsApp"
        >
          <MessageCircle className="w-5 h-5 fill-current" />
        </a>
      </nav>
    </>
  );
};
