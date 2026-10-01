import React, { useState } from 'react';
import { 
  Printer, 
  Layers, 
  FileText, 
  CreditCard, 
  HeartHandshake, 
  Camera, 
  Palette, 
  Signpost, 
  ShieldCheck,
  Clock,
  Sparkles,
  MapPin,
  Phone,
  ArrowRight,
  Info
} from 'lucide-react';
import { SERVICES_DATA, ServiceItem } from '../data/services';

const iconMap: Record<string, React.ReactNode> = {
  Sparkles: <Sparkles className="w-6 h-6" />,
  Clock: <Clock className="w-6 h-6" />,
  Printer: <Printer className="w-6 h-6" />,
  Layers: <Layers className="w-6 h-6" />,
  FileText: <FileText className="w-6 h-6" />,
  CreditCard: <CreditCard className="w-6 h-6" />,
  HeartHandshake: <HeartHandshake className="w-6 h-6" />,
  Camera: <Camera className="w-6 h-6" />,
  Palette: <Palette className="w-6 h-6" />,
  Signpost: <Signpost className="w-6 h-6" />,
  ShieldCheck: <ShieldCheck className="w-6 h-6" />,
};

interface ServicesProps {
  onSelectServiceForInquiry?: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesProps> = ({ onSelectServiceForInquiry }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'resin-art' | 'printing-banner'>('all');

  const handleInquire = (serviceTitle: string) => {
    if (onSelectServiceForInquiry) {
      onSelectServiceForInquiry(serviceTitle);
    }
  };

  const filteredServices = activeFilter === 'all'
    ? SERVICES_DATA
    : SERVICES_DATA.filter((s) => s.category === activeFilter);

  return (
    <section id="services" className="py-16 sm:py-24 bg-[#F8FAFC] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-3xl">
            <div className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#B89628] mb-2 flex items-center gap-2">
              <span className="w-5 h-[2px] bg-[#D4AF37]" />
              <span>Bespoke Resin Art &amp; Full Printing Services</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A192F] tracking-tight">
              Our Core Services &amp; Resin Art Catalog
            </h2>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              Explore custom handcrafted resin art designs, personalized nameboards, statement geode clocks, along with high-speed digital flex banners and offset stationery.
            </p>
          </div>

          {/* Category Filter Controls */}
          <div className="flex items-center gap-1.5 p-1 bg-white rounded-xl border border-slate-200 shadow-2xs overflow-x-auto max-w-full">
            <button
              type="button"
              onClick={() => setActiveFilter('all')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeFilter === 'all' ? 'bg-[#0A192F] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Services
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('resin-art')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                activeFilter === 'resin-art' ? 'bg-[#D4AF37] text-[#0A192F] font-bold shadow-xs' : 'text-slate-600 hover:text-[#0A192F]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#B89628]" />
              <span>Resin Art (Featured)</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('printing-banner')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeFilter === 'printing-banner' ? 'bg-[#0A192F] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Printing &amp; Banners
            </button>
          </div>
        </div>

        {/* Services Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className={`group bg-white rounded-xl border transition-all duration-300 shadow-xs hover:shadow-md flex flex-col justify-between overflow-hidden ${
                service.category === 'resin-art' 
                  ? 'border-[#D4AF37] ring-1 ring-[#D4AF37]/30' 
                  : 'border-slate-200 hover:border-[#D4AF37]'
              }`}
            >
              <div>
                {/* Visual Thumbnail */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100">
                  <img
                    src={service.image}
                    alt={service.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transform group-hover:scale-104 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Floating Icon Badge */}
                  <div className="absolute top-3 left-3 w-10 h-10 rounded-lg bg-[#0A192F]/90 text-[#D4AF37] backdrop-blur-xs flex items-center justify-center shadow-sm">
                    {iconMap[service.iconName] || <Printer className="w-5 h-5" />}
                  </div>

                  {/* Category Pill Tag */}
                  <div className="absolute top-3 right-3">
                    <span className={`px-2.5 py-1 rounded text-[11px] font-bold shadow-xs ${
                      service.category === 'resin-art'
                        ? 'bg-[#D4AF37] text-[#0A192F]'
                        : 'bg-[#0A192F]/80 text-white backdrop-blur-xs'
                    }`}>
                      {service.categoryLabel}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white text-xs font-medium flex items-center justify-between">
                    <span className="bg-black/60 px-2 py-0.5 rounded text-[11px] backdrop-blur-xs">
                      {service.popularSizes.split(',')[0]}
                    </span>
                    <span className="flex items-center gap-1 text-[#FCD34D] text-[11px]">
                      <Clock className="w-3 h-3" />
                      <span>{service.turnaroundTime.split(' ')[0]}</span>
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <h3 className="font-heading text-lg sm:text-xl font-bold text-[#0A192F] group-hover:text-[#B89628] transition-colors">
                    {service.title}
                  </h3>

                  {/* Short 1-line description */}
                  <p className="mt-2 text-sm text-slate-600 font-medium leading-snug">
                    {service.shortDesc}
                  </p>

                  {/* Extended details & popular sizing */}
                  <p className="mt-3 text-xs text-slate-500 leading-relaxed">
                    {service.details}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                    <span className="font-semibold text-slate-800">Popular:</span>
                    <span className="text-slate-500 text-right truncate max-w-[200px]">{service.popularSizes}</span>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="px-6 pb-6 pt-1 flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => handleInquire(service.title)}
                  className="flex-1 py-2.5 px-3 rounded-lg bg-[#0A192F] hover:bg-[#112240] text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Inquire Design / Quote</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                </button>

                <a
                  href="https://www.google.com/maps?q=20.769753,86.468659"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                  title="Visit shop for this service"
                >
                  <MapPin className="w-4 h-4 text-[#0A192F]" />
                </a>
              </div>

            </div>
          ))}
        </div>

        {/* Offline Process Reminder Callout */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-[#0A192F] text-white border border-[#1E3A5F] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#112240] border border-[#2A4D78] flex items-center justify-center text-[#D4AF37] shrink-0">
              <Info className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-heading text-lg sm:text-xl font-bold text-white">
                How Offline Ordering Works at Sangram Resin Art
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
                1. Visit our shop or call ahead (+91 73815 22808). 2. View resin color pigments, teakwood slabs, or banner media. 3. Approve live concept sketches. 4. Collect completed orders directly at our studio in Odisha!
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
            <a
              href="tel:+917381522808"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#D4AF37] hover:bg-[#B89628] text-[#0A192F] text-xs font-bold transition-all shadow-xs whitespace-nowrap"
            >
              <Phone className="w-4 h-4 text-[#0A192F]" />
              <span>Call: +91 73815 22808</span>
            </a>

            <a
              href="https://www.google.com/maps?q=20.769753,86.468659"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#112240] hover:bg-[#1E3A5F] text-white text-xs font-semibold border border-[#2A4D78] transition-colors whitespace-nowrap"
            >
              <MapPin className="w-4 h-4 text-[#D4AF37]" />
              <span>Get Directions</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
