import React from 'react';
import { MapPin, Navigation, Clock, Phone, ExternalLink, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const LocationSection: React.FC = () => {
  const latitude = 20.769753;
  const longitude = 86.468659;
  const directionsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
  const mapEmbedUrl = `https://maps.google.com/maps?q=${latitude},${longitude}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <section id="location" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#B89628] mb-2 flex items-center gap-2">
            <span className="w-5 h-[2px] bg-[#D4AF37]" />
            <span>Store Location &amp; Visit Guide</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A192F] tracking-tight">
            Visit Our Printing &amp; Design Studio
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            As an offline service studio, we invite you to visit our shop to discuss dimensions, select materials, approve live proofs, and collect finished orders.
          </p>
        </div>

        {/* Location Content Grid */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Studio Address Card */}
          <div className="lg:col-span-5 bg-[#0A192F] text-white rounded-2xl p-6 sm:p-8 border border-[#1E3A5F] shadow-sm flex flex-col justify-between">
            <div className="space-y-6">
              
              <div>
                <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
                  Store Address
                </span>
                
                {/* User specified address text with store name */}
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-white mt-1.5 leading-snug">
                  Sangram Resin Art, Odisha, India
                </h3>

                <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Near Main Market / Commercial Hub, Odisha 755019, India.
                </p>
                <div className="mt-2 text-xs text-[#D4AF37] font-mono tabular-nums">
                  GPS: {latitude}° N, {longitude}° E
                </div>
              </div>

              {/* Offline Order Notice Callout */}
              <div className="p-4 rounded-xl bg-[#112240] border-l-4 border-[#D4AF37] text-xs text-slate-200 space-y-1.5">
                <div className="font-bold text-[#D4AF37] flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Offline Orders &amp; Direct Pick-up Only</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  We do not ship through generic automated e-commerce. Every customer is attended to in-person at our shop to select resin pigments, teakwood slabs, banner media, and proof designs.
                </p>
              </div>

              {/* Shop Timings & Contact */}
              <div className="pt-4 border-t border-[#1E3A5F] space-y-3.5 text-xs text-slate-300">
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-white">Shop Working Hours</div>
                    <div>Monday – Saturday: 8:30 AM – 9:00 PM</div>
                    <div>Sunday: 9:00 AM – 2:00 PM (Emergency Orders &amp; Visits)</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-white">Call Shop Directly</div>
                    <a href="tel:+917381522808" className="text-[#D4AF37] hover:underline text-sm font-semibold">
                      +91 73815 22808
                    </a>
                  </div>
                </div>
              </div>

            </div>

            {/* Get Directions Button (Specified by user) */}
            <div className="pt-6 border-t border-[#1E3A5F] mt-6">
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-[#0A192F] bg-[#D4AF37] hover:bg-[#B89628] rounded-lg transition-all shadow-xs cursor-pointer active:scale-98"
              >
                <Navigation className="w-4 h-4 text-[#0A192F]" />
                <span>Get Directions</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#0A192F]" />
              </a>
            </div>

          </div>

          {/* Right Column: Embedded Google Map */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs relative min-h-[380px] lg:min-h-full flex flex-col">
            
            {/* Map Header Bar */}
            <div className="p-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#0A192F]" />
                <span className="font-semibold text-slate-800">
                  Sangram Resin Art, Odisha, India
                </span>
              </div>
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#B89628] hover:text-[#0A192F] font-semibold flex items-center gap-1"
              >
                <span>Open Map</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Embedded Google Map iframe using coordinates: 20.769753, 86.468659 */}
            <div className="relative flex-1 w-full min-h-[340px] bg-slate-100">
              <iframe
                title="Sangram Resin Art Location Map"
                src={mapEmbedUrl}
                className="w-full h-full border-0 absolute inset-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>

            {/* Bottom info bar */}
            <div className="p-3 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs text-slate-500">
              <span>Latitude: 20.769753 · Longitude: 86.468659</span>
              <span className="font-medium text-[#0A192F]">Free Customer Parking &amp; Loading Zone Available</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
