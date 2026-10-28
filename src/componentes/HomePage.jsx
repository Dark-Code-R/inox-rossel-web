import { useEffect, useState } from "react";
import Header from "./ui/Header";
import HeroSection from "./ui/HeroSection";
import AboutModal from "./ui/AboutModal";
import AboutSection from "./ui/AboutSection";
import ServicesSection from "./ui/ServicesSection";
import PortfolioSection from "./ui/PortfolioSection";
import ContactSection from "./ui/ContactSection";
import Footer from "./ui/Footer";
import TestimonialsSection from "./ui/componentes-ui/Testimonio/TestimonialsSection";
import "./landing.css";

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    // Support links back from the projects page, such as /home#contacto.
    if (window.location.hash) {
      document.getElementById(window.location.hash.slice(1))?.scrollIntoView();
    }
  }, []);

  return (
    <div className="inox-site">
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <Header />
      <main id="contenido">
        <HeroSection openModal={openModal} />
        <ServicesSection />
        <PortfolioSection />
        <AboutSection openModal={openModal} />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
      {isModalOpen && <AboutModal closeModal={closeModal} />}
    </div>
  );
}
