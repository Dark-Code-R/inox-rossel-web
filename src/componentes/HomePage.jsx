import React, { useState } from 'react';
import Header from './ui/Header';
import HeroSection from './ui/HeroSection';
import AboutModal from './ui/AboutModal';
import ServicesSection from './ui/ServicesSection';
import PortfolioSection from './ui/PortfolioSection';
import ContactSection from './ui/ContactSection';
import Footer from './ui/Footer';
import TestimonialsSection from './ui/componentes-ui/Testimonio/TestimonialsSection';

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  if (typeof window !== 'undefined') {
    document.documentElement.style.scrollBehavior = 'smooth';
  }

  return (
    <div className="flex flex-col min-h-screen bg-white text-black">
      <Header />
      <main className="flex-1">
        <HeroSection openModal={openModal} />
        <ServicesSection />
        <PortfolioSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
      {isModalOpen && <AboutModal closeModal={closeModal} />}
    </div>
  );
}
