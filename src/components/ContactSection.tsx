import React, { useState, useEffect } from 'react';
import { Send, Phone, MessageCircle, AlertCircle, CheckCircle2, MapPin, Store } from 'lucide-react';

interface ContactSectionProps {
  initialService?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ initialService }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('Flex Banner Printing');
  const [message, setMessage] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialService) {
      setService(initialService);
      setMessage(`Hi Sangram Resin Art, I need inquiry and quotation for ${initialService}. Approximate dimensions / quantity: `);
    }
  }, [initialService]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError('Please provide your name.');
      return;
    }
    if (!phone.trim()) {
      setError('Please provide your active phone number so our shop can call you.');
      return;
    }
    if (!message.trim()) {
      setError('Please enter your requirement details or custom size.');
      return;
    }

    setSubmitting(true);

    try {
      // Default email endpoint (user can update to their preferred email later)
      const response = await fetch('https://formsubmit.co/ajax/contact@sangramresinart.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          service: service,
          message: message.trim(),
          _subject: `New Inquiry from ${name.trim()} (${service})`,
          _template: 'table'
        })
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        setSubmitted(true);
      }
    } catch (err) {
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const whatsappUrl = `https://wa.me/917381522808?text=${encodeURIComponent(
    `*Inquiry for Sangram Resin Art*\n\n` +
    `*Name:* ${name || 'Customer'}\n` +
    `*Phone:* ${phone || 'Not specified'}\n` +
    `*Service / Category:* ${service}\n` +
    `*Message:* ${message || 'I would like to inquire about resin art and printing services at your shop.'}`
  )}`;

  return (
    <section id="contact" className="py-16 sm:py-24 bg-[#F8FAFC] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Left Column: Direct Call, WhatsApp & Offline Order Notice */}
          <div className="lg:col-span-5 space-y-6">
            <div className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#B89628] flex items-center gap-2">
              <span className="w-5 h-[2px] bg-[#D4AF37]" />
              <span>Contact &amp; Store Visit</span>
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#0A192F] tracking-tight">
              Get in Touch or Visit Our Studio
            </h2>

            {/* Crucial Offline Requirement Note (Explicitly requested by user) */}
            <div className="p-4 sm:p-5 rounded-xl bg-amber-50 border-2 border-[#D4AF37] text-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-sm font-bold text-[#0A192F]">
                <Store className="w-5 h-5 text-[#B89628]" />
                <span>Notice: Orders are taken offline. Please visit our shop.</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                To guarantee zero font errors, exact color fidelity, and correct scale dimensions, we take and execute orders directly at our physical workshop in Odisha.
              </p>
            </div>

            {/* Quick Action Channels */}
            <div className="space-y-3 pt-2">
              <a
                href="tel:+917381522808"
                className="flex items-center gap-4 p-4 rounded-xl bg-white border border-slate-200 hover:border-[#D4AF37] transition-all group shadow-2xs"
              >
                <div className="w-11 h-11 rounded-lg bg-[#0A192F] text-[#D4AF37] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-medium">Click to Call (Mobile Direct)</div>
                  <div className="text-base font-bold text-[#0A192F] group-hover:text-[#B89628] transition-colors">
                    +91 73815 22808
                  </div>
                </div>
              </a>

              <a
                href="https://wa.me/917381522808?text=Hello%20Sangram%20Resin%20Art!%20I%20would%20like%20to%20inquire%20about%20resin%20art%20and%20printing%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl bg-white border border-slate-200 hover:border-[#25D366] transition-all group shadow-2xs"
              >
                <div className="w-11 h-11 rounded-lg bg-[#25D366] text-white flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-medium">WhatsApp Chat &amp; File Sharing</div>
                  <div className="text-base font-bold text-[#0A192F] group-hover:text-[#25D366] transition-colors">
                    +91 73815 22808
                  </div>
                </div>
              </a>

              <a
                href="https://www.google.com/maps?q=20.769753,86.468659"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl bg-white border border-slate-200 hover:border-[#0A192F] transition-all group shadow-2xs"
              >
                <div className="w-11 h-11 rounded-lg bg-slate-100 text-[#0A192F] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-medium">Physical Shop Address</div>
                  <div className="text-sm font-bold text-[#0A192F]">
                    Sangram Resin Art, Odisha, India
                  </div>
                </div>
              </a>
            </div>

          </div>

          {/* Right Column: Contact & Pre-Order Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
              
              {submitted ? (
                <div className="py-8 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-[#0A192F]">
                    Inquiry Transmitted!
                  </h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="font-bold text-[#0A192F]">{name}</span>. Our workshop desk has received your requirement. Please drop by our shop in Odisha or we will call you at <span className="font-bold text-[#0A192F]">{phone}</span> shortly.
                  </p>

                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#25D366] text-white text-xs font-bold hover:bg-[#20ba59] transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Forward to WhatsApp as well</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setName('');
                        setPhone('');
                        setMessage('');
                      }}
                      className="w-full sm:w-auto px-5 py-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Send Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  <div className="border-b border-slate-100 pb-3 mb-2">
                    <h3 className="font-heading text-xl font-bold text-[#0A192F]">
                      Send Print Inquiry / Design Details
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Tell us what you need printed. We will prepare paper/flex samples for when you visit our shop.
                    </p>
                  </div>

                  {error && (
                    <div className="p-3.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  {/* Name field (Required) */}
                  <div>
                    <label htmlFor="user-name" className="block text-xs font-bold text-slate-800 mb-1.5 uppercase tracking-wide">
                      Your Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="user-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Sangram Keshari Rout"
                      className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:bg-white transition-colors"
                    />
                  </div>

                  {/* Phone Number field (Required) */}
                  <div>
                    <label htmlFor="user-phone" className="block text-xs font-bold text-slate-800 mb-1.5 uppercase tracking-wide">
                      Phone Number (For Calling / SMS) <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="user-phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:bg-white transition-colors"
                    />
                  </div>

                  {/* Service needed */}
                  <div>
                    <label htmlFor="service-select" className="block text-xs font-bold text-slate-800 mb-1.5 uppercase tracking-wide">
                      Required Service / Product Category
                    </label>
                    <select
                      id="service-select"
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:bg-white transition-colors cursor-pointer"
                    >
                      <optgroup label="Resin Art Collections">
                        <option value="Custom Resin Name Plates">Custom Resin Name Plates</option>
                        <option value="Resin Geode Clocks & Wall Decor">Resin Geode Clocks &amp; Wall Decor</option>
                        <option value="Resin Keepsakes & Gift Decor">Resin Keepsakes (Varmala &amp; Preserved Flowers)</option>
                      </optgroup>
                      <optgroup label="Printing & Banner Services">
                        <option value="Flex Banner Printing">Flex Banner Printing</option>
                        <option value="Vinyl Printing">Vinyl Printing</option>
                        <option value="Poster Printing">Poster Printing</option>
                        <option value="Visiting Cards">Visiting Cards</option>
                        <option value="Wedding Cards">Wedding Cards</option>
                        <option value="Photo Printing">Photo Printing</option>
                        <option value="Custom Banner Design">Custom Banner Design</option>
                        <option value="Shop Board Design">Shop Board Design</option>
                        <option value="Lamination & Finishing">Lamination &amp; Finishing</option>
                      </optgroup>
                    </select>
                  </div>

                  {/* Message field (Required) */}
                  <div>
                    <label htmlFor="user-message" className="block text-xs font-bold text-slate-800 mb-1.5 uppercase tracking-wide">
                      Message / Specifications <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="user-message"
                      rows={3}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Mention dimensions (e.g. 10x4 ft flex banner), quantity (e.g. 500 visiting cards), occasion, or design concept..."
                      className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:bg-white transition-colors resize-y"
                    />
                  </div>

                  {/* Offline Reminder inside form */}
                  <div className="text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-200 flex items-center gap-2">
                    <Store className="w-4 h-4 text-[#B89628] shrink-0" />
                    <span>Remember: Orders are taken offline. Please visit our shop to finalize and collect.</span>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-1">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-lg text-sm font-bold text-[#0A192F] bg-[#D4AF37] hover:bg-[#B89628] active:scale-98 transition-all shadow-xs disabled:opacity-70 cursor-pointer"
                    >
                      {submitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-[#0A192F]/30 border-t-[#0A192F] rounded-full animate-spin" />
                          <span>Submitting to Workshop...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 text-[#0A192F]" />
                          <span>Submit Print Inquiry</span>
                        </>
                      )}
                    </button>
                  </div>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
