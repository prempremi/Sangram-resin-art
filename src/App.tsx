/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ResinProductsSection } from './components/ResinProductsSection';
import { ServicesSection } from './components/ServicesSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { GallerySection } from './components/GallerySection';
import { LocationSection } from './components/LocationSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';
import { AuthModal } from './components/AuthModal';
import { AdminDashboard } from './components/AdminDashboard';
import { trackPageView } from './services/analyticsService';

function MainAppContent() {
  const { isAdmin, openAuthModal } = useAuth();
  const [currentPath, setCurrentPath] = useState<string>(window.location.pathname);
  const [selectedServiceTitle, setSelectedServiceTitle] = useState<string>('');

  // Handle client-side routing for /admin-dashboard and back
  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname;
      setCurrentPath(path);
      trackPageView(path);
    };

    // Initial page track
    trackPageView(window.location.pathname);

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  const navigateTo = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    trackPageView(path);
  };

  const handleServicesClick = () => {
    const el = document.getElementById('services');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLocationClick = () => {
    const el = document.getElementById('location');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleServiceSelectForInquiry = (serviceTitle: string) => {
    setSelectedServiceTitle(serviceTitle);
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Route Guard: /admin-dashboard
  const isAdminRoute = currentPath === '/admin-dashboard' || window.location.hash === '#admin-dashboard';

  if (isAdminRoute) {
    if (!isAdmin) {
      // Non-admin trying to access admin dashboard -> redirect to homepage
      return (
        <div className="min-h-screen bg-[#0A192F] text-white flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-[#112240] p-8 rounded-2xl border border-red-500/30 text-center space-y-4 shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-red-500/10 text-red-400 mx-auto flex items-center justify-center">
              🔒
            </div>
            <h2 className="text-2xl font-bold font-heading text-white">Administrator Access Required</h2>
            <p className="text-sm text-slate-300">
              Only authenticated administrators can access <code className="bg-slate-800 px-1 py-0.5 rounded text-amber-300">/admin-dashboard</code>.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => openAuthModal('login')}
                className="px-5 py-2.5 rounded-lg bg-[#D4AF37] hover:bg-[#B89628] text-[#0A192F] font-bold text-xs transition-colors cursor-pointer"
              >
                Sign In as Admin
              </button>
              <button
                onClick={() => navigateTo('/')}
                className="px-5 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
              >
                Return to Website
              </button>
            </div>
          </div>
          <AuthModal />
        </div>
      );
    }

    return (
      <>
        <AdminDashboard onBackToSite={() => navigateTo('/')} />
        <AuthModal />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] font-body flex flex-col pb-16 sm:pb-0">
      {/* Top Bar Navigation */}
      <Navbar onNavigateToAdmin={() => navigateTo('/admin-dashboard')} />

      {/* Main Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero
          onLocationClick={handleLocationClick}
          onServicesClick={handleServicesClick}
        />

        {/* 2. Resin Products Section (Display Only: Keychains, Photo Frames, Custom Gifts) */}
        <ResinProductsSection
          onSelectProductForInquiry={handleServiceSelectForInquiry}
        />

        {/* 3. Core Printing & Banner Services Section (9 Categories) */}
        <ServicesSection
          onSelectServiceForInquiry={handleServiceSelectForInquiry}
        />

        {/* 4. Why Choose Us (5 Key Points) */}
        <WhyChooseUs />

        {/* 5. Gallery Section (Dynamic with Public Custom Photos) */}
        <GallerySection />

        {/* 6. Location Section with Map (Coordinates: 20.769753, 86.468659) */}
        <LocationSection />

        {/* 7. Contact Section (Form + Phone + WhatsApp) */}
        <ContactSection
          initialService={selectedServiceTitle}
        />
      </main>

      {/* 8. Footer with discrete Admin Portal link */}
      <Footer onNavigateToAdmin={() => navigateTo('/admin-dashboard')} />

      {/* 9. Floating Action Buttons (Call, WhatsApp, Directions, Back to Top) */}
      <FloatingActions />

      {/* 10. Global Authentication Modal (Login / Signup) */}
      <AuthModal />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainAppContent />
    </AuthProvider>
  );
}
