import React, { useState } from 'react';
import { Eye, MapPin, Sparkles } from 'lucide-react';
import { GALLERY_ITEMS, GalleryItem } from '../data/services';

export const GallerySection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [previewItem, setPreviewItem] = useState<GalleryItem | null>(null);

  const filteredItems = activeFilter === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeFilter);

  const filters = [
    { id: 'all', label: 'All Works' },
    { id: 'resin', label: 'Resin Art' },
    { id: 'banners', label: 'Flex Banners' },
    { id: 'boards', label: 'Shop Boards' },
    { id: 'stationery', label: 'Cards & Invites' },
    { id: 'vinyl', label: 'Vinyl & Posters' },
  ];

  return (
    <section id="gallery" className="py-16 sm:py-24 bg-[#F8FAFC] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#B89628] mb-2 flex items-center gap-2">
              <span className="w-5 h-[2px] bg-[#D4AF37]" />
              <span>Portfolio Showcase</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#0A192F] tracking-tight">
              Sample Works &amp; Real Prints
            </h2>
            <p className="mt-3 text-base text-slate-600">
              Browse samples of completed flex banners, luminous storefront signs, wedding invitation cards, and custom vinyl jobs.
            </p>
          </div>

          {/* Filter Bar */}
          <div className="flex items-center gap-1.5 p-1 bg-white rounded-lg border border-slate-200 shadow-2xs overflow-x-auto max-w-full">
            {filters.map((filter) => (
              <button
                key={filter.id}
                type="button"
                onClick={() => setActiveFilter(filter.id)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  activeFilter === filter.id
                    ? 'bg-[#0A192F] text-white'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />

                {/* Category chip on top */}
                <div className="absolute top-3 left-3 bg-[#0A192F]/85 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-1 rounded">
                  {item.categoryLabel}
                </div>

                {/* Hover overlay with zoom button */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                  <button
                    type="button"
                    onClick={() => setPreviewItem(item)}
                    className="px-3.5 py-1.5 rounded-lg bg-white text-[#0A192F] text-xs font-bold shadow-md flex items-center gap-1.5 cursor-pointer hover:bg-slate-100"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>View Sample</span>
                  </button>
                </div>
              </div>

              <div className="p-4 sm:p-5">
                <h3 className="font-heading text-base font-bold text-[#0A192F]">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-xs text-slate-500 leading-relaxed">
                  {item.caption}
                </p>
              </div>

              <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0">
                <div className="text-[11px] font-medium text-[#B89628] flex items-center gap-1">
                  <span>Available for offline order at shop</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for previewing sample work */}
        {previewItem && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="relative bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200">
              <div className="relative aspect-[16/10] w-full bg-slate-900">
                <img
                  src={previewItem.image}
                  alt={previewItem.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => setPreviewItem(null)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-black/60 text-white hover:bg-black transition-colors"
                >
                  ✕
                </button>
              </div>
              <div className="p-6">
                <span className="text-xs font-bold uppercase tracking-wider text-[#B89628]">
                  {previewItem.categoryLabel}
                </span>
                <h3 className="text-xl font-bold font-heading text-[#0A192F] mt-1">
                  {previewItem.title}
                </h3>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  {previewItem.caption}
                </p>
                <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="text-xs text-slate-500">
                    Visit shop with your text or design concept for immediate production.
                  </div>
                  <a
                    href="https://www.google.com/maps?q=20.769753,86.468659"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#D4AF37] text-[#0A192F] text-xs font-bold hover:bg-[#B89628]"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Get Directions to Store</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
