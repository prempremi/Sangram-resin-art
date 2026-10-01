import React from 'react';
import { X, Check, Clock, Layers, Sparkles, MessageCircle, ArrowRight } from 'lucide-react';
import { ProductItem } from '../data/products';

interface ProductModalProps {
  product: ProductItem | null;
  onClose: () => void;
  onInquire: (product: ProductItem) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onInquire
}) => {
  if (!product) return null;

  const whatsappMessage = encodeURIComponent(
    `Hello Sangram Resin Art! I am interested in custom designing "${product.title}" (${product.categoryLabel}). Please share details and pricing.`
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div 
        className="relative bg-[#FAF7F2] rounded-2xl max-w-3xl w-full overflow-hidden border border-[#E0D5BE] shadow-2xl animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-[#FAF7F2]/90 hover:bg-[#F4EFE6] text-[#2B2118] border border-[#E0D5BE] transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image Showcase */}
          <div className="relative aspect-[4/3] md:aspect-auto md:h-full bg-[#F4EFE6] overflow-hidden">
            <img
              src={product.image}
              alt={product.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 bg-[#2B2118]/85 text-[#E6C687] text-xs font-medium px-3 py-1 rounded-md backdrop-blur-xs">
              {product.categoryLabel}
            </div>
          </div>

          {/* Details Content */}
          <div className="p-6 md:p-8 flex flex-col justify-between">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-[#A47E3B]">
                Handcrafted Spec Sheet
              </div>
              <h3 className="font-serif-brand text-2xl font-bold text-[#2B2118] mt-1 leading-snug">
                {product.title}
              </h3>
              <p className="text-xs text-[#7A6553] mt-1 italic">
                {product.subtitle}
              </p>

              <p className="mt-4 text-sm text-[#5A483B] leading-relaxed">
                {product.description}
              </p>

              {/* Key Features */}
              <div className="mt-5 space-y-2">
                <div className="text-xs font-semibold text-[#2B2118] uppercase tracking-wide">
                  Highlights &amp; Specifications:
                </div>
                {product.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-[#5A483B]">
                    <Check className="w-3.5 h-3.5 text-[#A47E3B] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Materials & Turnaround info */}
              <div className="mt-5 pt-4 border-t border-[#E8DFC8] space-y-2 text-xs text-[#6B5746]">
                <div>
                  <span className="font-semibold text-[#2B2118]">Materials: </span>
                  {product.materials}
                </div>
                <div>
                  <span className="font-semibold text-[#2B2118]">Standard Dimensions: </span>
                  {product.dimensions}
                </div>
                <div className="flex items-center gap-1.5 text-[#8C6D37]">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Artisan Lead Time: {product.turnaround}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 pt-4 border-t border-[#E8DFC8] flex flex-col sm:flex-row gap-2.5">
              <a
                href={`https://wa.me/918646865900?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold transition-colors shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Order Inquiry</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onInquire(product);
                }}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#2B2118] hover:bg-[#433427] text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                <span>Request Custom Quote</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#E6C687]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
