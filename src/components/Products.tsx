import React, { useState } from 'react';
import { ArrowRight, Eye, Sparkles, Check, Clock } from 'lucide-react';
import { PRODUCTS_DATA, ProductItem } from '../data/products';
import { ProductModal } from './ProductModal';

interface ProductsProps {
  onSelectProductForInquiry: (product: ProductItem) => void;
}

export const Products: React.FC<ProductsProps> = ({ onSelectProductForInquiry }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

  const filteredProducts = activeCategory === 'all'
    ? PRODUCTS_DATA
    : PRODUCTS_DATA.filter((item) => item.category === activeCategory);

  const categories = [
    { id: 'all', label: 'All Collections' },
    { id: 'name-plates', label: 'Name Plates' },
    { id: 'wall-art', label: 'Wall Art' },
    { id: 'custom-gifts', label: 'Customized Gifts' },
    { id: 'decorative-items', label: 'Decorative Items' },
  ];

  return (
    <section id="products" className="py-16 sm:py-24 bg-[#FAF7F2] border-b border-[#E8DFC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#8C6D37] mb-2 flex items-center gap-2">
              <span className="w-5 h-[1.5px] bg-[#C5A059]" />
              <span>Artisan Catalog</span>
            </div>
            <h2 className="font-serif-brand text-3xl sm:text-4xl font-bold text-[#2B2118] tracking-tight">
              Featured Resin Art Collections
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#5A483B]">
              Hand-poured with artistic flair. Every piece is customizable by size, color tone, embedded botanicals, and personalized lettering.
            </p>
          </div>

          {/* Interactive Category Filter Control (Buttons with active states) */}
          <div className="flex items-center gap-1.5 p-1.5 bg-[#F4EFE6] rounded-xl border border-[#E0D5BE] overflow-x-auto max-w-full">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#2B2118] text-white shadow-xs'
                    : 'text-[#5A483B] hover:text-[#2B2118] hover:bg-[#EAE2D2]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-[#FAF7F2] rounded-2xl border border-[#E0D5BE] overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Visual Asset Slot with Image Ratio & Scrim */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F4EFE6]">
                  <img
                    src={product.image}
                    alt={product.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transform group-hover:scale-103 transition-transform duration-500"
                  />
                  
                  {/* Category Indicator Tag */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#FAF7F2]/95 backdrop-blur-sm text-[#2B2118] text-xs font-semibold px-3 py-1 rounded-md border border-[#E0D5BE] shadow-xs">
                      {product.categoryLabel}
                    </span>
                  </div>

                  {/* Quick View Button on Hover */}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 p-4">
                    <button
                      type="button"
                      onClick={() => setSelectedProduct(product)}
                      className="px-4 py-2 bg-white/95 text-[#2B2118] text-xs font-semibold rounded-lg shadow-md flex items-center gap-1.5 hover:bg-white transition-colors cursor-pointer"
                    >
                      <Eye className="w-4 h-4 text-[#A47E3B]" />
                      <span>View Specifications</span>
                    </button>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 sm:p-7">
                  {/* Clean unboxed metadata separator */}
                  <div className="flex items-center gap-2 text-xs text-[#8C6D37] mb-2 font-medium">
                    <span>Handmade in Odisha</span>
                    <span aria-hidden="true">·</span>
                    <span>{product.turnaround}</span>
                    <span aria-hidden="true">·</span>
                    <span>Customizable</span>
                  </div>

                  <h3 className="font-serif-brand text-xl sm:text-2xl font-bold text-[#2B2118] group-hover:text-[#A47E3B] transition-colors">
                    {product.title}
                  </h3>

                  <p className="mt-2 text-sm text-[#5A483B] leading-relaxed line-clamp-2">
                    {product.description}
                  </p>

                  {/* Feature bullet list */}
                  <div className="mt-4 pt-4 border-t border-[#E8DFC8] space-y-1.5">
                    {product.features.slice(0, 3).map((f, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-[#6B5746]">
                        <Check className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
                        <span className="truncate">{f}</span>
                      </div>
                    ))}
                  </div>

                  {/* Materials brief */}
                  <div className="mt-3 text-xs text-[#7A6553]">
                    <span className="font-semibold text-[#2B2118]">Materials: </span>
                    <span className="italic">{product.materials}</span>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="px-6 pb-6 pt-2 sm:px-7 sm:pb-7 flex items-center gap-3 border-t border-[#E8DFC8]/60 mt-auto">
                <button
                  type="button"
                  onClick={() => setSelectedProduct(product)}
                  className="flex-1 py-2.5 px-4 text-xs font-semibold text-[#2B2118] bg-[#F4EFE6] hover:bg-[#EAE2D2] rounded-lg transition-colors border border-[#E0D5BE] cursor-pointer text-center"
                >
                  View Details
                </button>

                <button
                  type="button"
                  onClick={() => onSelectProductForInquiry(product)}
                  className="flex-1 py-2.5 px-4 text-xs font-semibold text-white bg-[#2B2118] hover:bg-[#433427] rounded-lg transition-colors border border-[#3E2E20] flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Inquire Design</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#E6C687]" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Bottom Banner for Custom Orders */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-[#F4EFE6] border border-[#E0D5BE] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#FAF7F2] border border-[#E0D5BE] flex items-center justify-center text-[#A47E3B] shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif-brand text-lg sm:text-xl font-bold text-[#2B2118]">
                Have a unique design or concept in mind?
              </h4>
              <p className="text-xs sm:text-sm text-[#5A483B] mt-0.5">
                We craft custom resin tables, wedding garlands preservation blocks, spiritual mantras, and resin clocks according to your exact room palette.
              </p>
            </div>
          </div>

          <a
            href="https://wa.me/918646865900?text=Hello%20Sangram%20Resin%20Art!%20I%20have%20a%20custom%20resin%20art%20idea%20I%20would%20like%20to%20discuss."
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 text-xs sm:text-sm font-semibold text-white bg-[#25D366] hover:bg-[#20ba59] rounded-lg transition-colors whitespace-nowrap shadow-xs flex items-center gap-2"
          >
            <span>Discuss on WhatsApp</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>

      {/* Product Detail Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onInquire={(prod) => {
          setSelectedProduct(null);
          onSelectProductForInquiry(prod);
        }}
      />
    </section>
  );
};
