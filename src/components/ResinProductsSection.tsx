import React from 'react';
import { Sparkles, MessageCircle, MapPin, CheckCircle2, ArrowRight, ShieldAlert, Heart, Frame, Key } from 'lucide-react';
import { RESIN_PRODUCTS, ResinProductItem } from '../data/resinProducts';

interface ResinProductsSectionProps {
  onSelectProductForInquiry?: (productTitle: string) => void;
}

const categoryIcons: Record<string, React.ReactNode> = {
  keychains: <Key className="w-5 h-5 text-[#D4AF37]" />,
  'photo-frames': <Frame className="w-5 h-5 text-[#D4AF37]" />,
  'custom-gifts': <Heart className="w-5 h-5 text-[#D4AF37]" />,
};

export const ResinProductsSection: React.FC<ResinProductsSectionProps> = ({ onSelectProductForInquiry }) => {
  const handleInquire = (productTitle: string) => {
    if (onSelectProductForInquiry) {
      onSelectProductForInquiry(`Custom Resin Order: ${productTitle}`);
    } else {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="resin-products" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-[#B89628] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Handcrafted Studio Creations</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A192F] tracking-tight">
            Resin Products
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Explore our signature handcrafted epoxy resin collections. Each piece is poured by hand with crystal-clear non-yellowing resin, natural preserved flowers, and 24K gold foil.
          </p>

          {/* Mandatory Display-Only Disclaimer Banner */}
          <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 inline-flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-[#B89628] shrink-0" />
            <span>
              <strong className="text-slate-800">Display Only: </strong>
              No online cart or checkout. All custom pieces are made to order and finalized offline at our Odisha workshop.
            </span>
          </div>
        </div>

        {/* 3 Core Items Grid: Keychains, Photo Frames, Custom Gifts */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {RESIN_PRODUCTS.map((item: ResinProductItem) => (
            <div
              key={item.id}
              className="group bg-white rounded-2xl border border-slate-200 hover:border-[#D4AF37] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              <div>
                {/* Image Showcase */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Icon & Category Tag */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <div className="w-9 h-9 rounded-lg bg-[#0A192F]/90 backdrop-blur-xs flex items-center justify-center shadow-xs">
                      {categoryIcons[item.category] || <Sparkles className="w-5 h-5 text-[#D4AF37]" />}
                    </div>
                    <span className="px-2.5 py-1 rounded-md bg-[#0A192F]/80 text-[#D4AF37] text-xs font-bold backdrop-blur-xs">
                      {item.categoryLabel}
                    </span>
                  </div>

                  {/* Display Only badge */}
                  <div className="absolute top-3 right-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#D4AF37] text-[#0A192F] shadow-xs uppercase tracking-wide">
                      Display Only
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white text-xs font-medium">
                    <span className="bg-black/60 px-2 py-0.5 rounded text-[11px] backdrop-blur-xs">
                      {item.dimensions}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-heading text-xl font-bold text-[#0A192F] group-hover:text-[#B89628] transition-colors">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-xs font-medium text-slate-700 leading-snug">
                    {item.shortDesc}
                  </p>

                  <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Customization Options */}
                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Customization Available:
                    </div>
                    <ul className="space-y-1 text-xs text-slate-600">
                      {item.customizationOptions.map((opt, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#B89628] shrink-0 mt-0.5" />
                          <span>{opt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Workshop Note */}
                  <div className="mt-4 p-2.5 bg-amber-50/60 rounded-lg border border-amber-100 text-[11px] text-slate-600 flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#B89628] shrink-0 mt-0.5" />
                    <span>{item.offlineNote}</span>
                  </div>
                </div>
              </div>

              {/* Actions: Direct Offline Inquire */}
              <div className="p-6 pt-0 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleInquire(item.title)}
                  className="flex-1 py-2.5 px-3 rounded-lg bg-[#0A192F] hover:bg-[#112240] text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer active:scale-98"
                >
                  <span>Inquire for Custom Order</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                </button>

                <a
                  href={`https://wa.me/917381522808?text=${encodeURIComponent(
                    `Hi Sangram Resin Art, I want to inquire about custom ${item.title}. Can you share designs and visiting time?`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-white transition-colors"
                  title="WhatsApp Inquire"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                </a>
              </div>

            </div>
          ))}
        </div>

        {/* Studio Consultation Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-[#0A192F] text-white border border-[#1E3A5F] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#112240] border border-[#2A4D78] flex items-center justify-center text-[#D4AF37] shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Have a unique wedding garland, dried flower, or photo memory?</div>
              <div className="text-xs text-slate-400">Bring it directly to our studio in Odisha for custom resin encapsulation design.</div>
            </div>
          </div>

          <a
            href="https://www.google.com/maps?q=20.769753,86.468659"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#D4AF37] hover:bg-[#B89628] text-[#0A192F] text-xs font-bold transition-all shadow-xs shrink-0 whitespace-nowrap"
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Visit Odisha Studio</span>
          </a>
        </div>

      </div>
    </section>
  );
};
