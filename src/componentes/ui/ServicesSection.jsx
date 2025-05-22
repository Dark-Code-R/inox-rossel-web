import React from 'react';
import { Wrench, Hammer, Cog, MapPin, Phone } from 'lucide-react';



function ServiceCard({ icon, title, description }) {
  return (
    <div className="flex flex-col p-8 bg-white rounded-lg shadow-lg border border-gray-300 hover:border-gray-400 transition-all duration-300 ease-in-out transform hover:scale-105 animate-fade-in-up">
      <div className="h-12 w-12 mb-4 text-black">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export default function ServicesSection() {
  return (
    <section id="servicios" className="w-full py-16 bg-gray-100 text-black animate-fade-in">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Nuestros Servicios</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <ServiceCard icon={<Wrench />} title="Metal Mecánica Especializada" description="Fabricación de estructuras metálicas de alta resistencia..." />
          <ServiceCard icon={<Hammer />} title="Muebles y Creaciones en Madera" description="Diseño y construcción de muebles únicos en madera de alta calidad..." />
          <ServiceCard icon={<Cog />} title="Soldadura y Ensamblaje de Estructuras" description="Soluciones de soldadura especializada para proyectos personalizados..." />
          <ServiceCard icon={<MapPin />} title="Construcción de Asadores y Hornos" description="Desarrollo de asadores y hornos a medida, diseñados para resistir..." />
          <ServiceCard icon={<Phone />} title="Consultoría y Proyectos a Medida" description="Ofrecemos asesoría personalizada para transformar tus ideas..." />
          <ServiceCard icon={<Wrench />} title="Diseño de Espacios Exteriores" description="Creación de estructuras y mobiliario adaptados para exteriores..." />
        </div>
      </div>
    </section>
  );
}
