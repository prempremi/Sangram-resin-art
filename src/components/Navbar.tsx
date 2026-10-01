import React, { useState } from 'react';
import { Menu, X, Phone, MapPin, Printer, ShieldCheck, User as UserIcon, LogOut, LayoutDashboard, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  onNavigateToAdmin?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigateToAdmin }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const { user, isAdmin, openAuthModal, logout } = useAuth();

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAdminClick = () => {
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
    if (onNavigateToAdmin) {
      onNavigateToAdmin();
    } else {
      window.history.pushState({}, '', '/admin-dashboard');
      window.dispatchEvent(new PopStateEvent('popstate'));
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
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#CBD5E1]">
            <button
              onClick={() => scrollTo('services')}
              className="hover:text-[#D4AF37] transition-colors cursor-pointer py-1"
            >
              Services Catalog
            </button>
            <button
              onClick={() => scrollTo('resin-products')}
              className="hover:text-[#D4AF37] transition-colors cursor-pointer py-1 flex items-center gap-1 text-[#F1F5F9]"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Resin Products</span>
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

          {/* Zone 3: Primary Actions + Authentication Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Direct Call Link */}
            <a
              href="tel:+917381522808"
              className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#112240] hover:bg-[#1E3A5F] rounded-lg transition-colors border border-[#1E3A5F] whitespace-nowrap"
              title="Call Sangram Resin Art"
            >
              <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>+91 73815 22808</span>
            </a>

            {/* Visit Shop Button */}
            <button
              onClick={() => scrollTo('location')}
              className="hidden sm:inline-flex px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold text-[#0A192F] bg-[#D4AF37] hover:bg-[#B89628] rounded-lg transition-all shadow-xs cursor-pointer items-center gap-1.5 whitespace-nowrap"
            >
              <MapPin className="w-3.5 h-3.5 text-[#0A192F]" />
              <span>Visit Shop</span>
            </button>

            {/* Authentication Buttons (User / Admin) */}
            {user ? (
              <div className="relative">
                {isAdmin ? (
                  <button
                    onClick={handleAdminClick}
                    className="px-3 py-1.5 sm:py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                    title="Access Admin Dashboard"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Dashboard</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="px-3 py-1.5 sm:py-2 rounded-lg bg-[#112240] hover:bg-[#1E3A5F] text-slate-200 border border-[#2A4D78] font-medium text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <UserIcon className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span className="max-w-[80px] truncate">{user.name.split(' ')[0]}</span>
                  </button>
                )}

                {/* Dropdown for User */}
                {userDropdownOpen && !isAdmin && (
                  <div className="absolute right-0 mt-2 w-48 bg-[#0A192F] border border-[#1E3A5F] rounded-xl shadow-xl p-2 z-50 animate-in fade-in duration-150">
                    <div className="px-3 py-2 border-b border-[#1E3A5F] text-xs">
                      <div className="font-bold text-white truncate">{user.name}</div>
                      <div className="text-[10px] text-slate-400 truncate">{user.email}</div>
                      <div className="text-[10px] text-[#D4AF37] mt-0.5">Role: Customer</div>
                    </div>
                    <button
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs text-red-400 hover:bg-[#112240] rounded-lg mt-1 flex items-center gap-2 cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => openAuthModal('login')}
                className="px-3 py-1.5 sm:py-2 rounded-lg bg-[#112240] hover:bg-[#1E3A5F] text-slate-200 hover:text-white border border-[#2A4D78] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Account Login / Sign Up"
              >
                <UserIcon className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="hidden sm:inline">Sign In</span>
              </button>
            )}

            {/* Mobile menu trigger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-200 hover:bg-[#112240] transition-colors cursor-pointer"
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
              Services Catalog
            </button>
            <button
              onClick={() => scrollTo('resin-products')}
              className="text-left py-2.5 px-3 rounded-lg text-base font-bold text-[#D4AF37] hover:bg-[#112240] flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Resin Products (Keychains, Frames &amp; Gifts)</span>
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

            {/* If Admin, Mobile Drawer shortcut */}
            {isAdmin && (
              <button
                onClick={handleAdminClick}
                className="text-left py-2.5 px-3 rounded-lg text-base font-bold text-amber-300 bg-[#112240] hover:bg-[#1E3A5F] flex items-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Open Admin Dashboard</span>
              </button>
            )}
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

            {!user ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openAuthModal('login');
                }}
                className="w-full py-2.5 px-4 rounded-lg bg-slate-800 text-slate-300 text-xs font-semibold flex items-center justify-center gap-2"
              >
                <UserIcon className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Sign In / Create Account</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 px-4 rounded-lg bg-red-500/10 text-red-400 text-xs font-semibold flex items-center justify-center gap-2"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out ({user.email})</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
