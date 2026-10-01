/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { GallerySection } from './components/GallerySection';
import { LocationSection } from './components/LocationSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';

export default function App() {
  const [selectedServiceTitle, setSelectedServiceTitle] = useState<string>('');

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

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] font-body flex flex-col pb-16 sm:pb-0">
      {/* Top Bar Navigation */}
      <Navbar />

      {/* Main Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero
          onLocationClick={handleLocationClick}
          onServicesClick={handleServicesClick}
        />

        {/* 2. Services Section (Main Focus - 9 Services) */}
        <ServicesSection
          onSelectServiceForInquiry={handleServiceSelectForInquiry}
        />

        {/* 3. Why Choose Us (5 Key Points) */}
        <WhyChooseUs />

        {/* 4. Gallery Section (Sample Works) */}
        <GallerySection />

        {/* 5. Location Section with Map (Coordinates: 20.769753, 86.468659) */}
        <LocationSection />

        {/* 6. Contact Section (Form + Phone + WhatsApp) */}
        <ContactSection
          initialService={selectedServiceTitle}
        />
      </main>

      {/* 7. Footer */}
      <Footer />

      {/* 8. Floating Action Buttons (Call, WhatsApp, Directions) */}
      <FloatingActions />
    </div>
  );
}
