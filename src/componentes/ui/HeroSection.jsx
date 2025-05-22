import React from 'react';
import { Button } from './componentes-ui/Button';
import { Link } from 'react-router-dom';
import useFadeInAnimation from '../../hooks/useAnimation'; // asegúrate del path correcto

export default function HeroSection({ openModal }) {
  useFadeInAnimation('.hero-animate'); // 👈 animamos esta clase

  return (
    <section className="hero-animate w-full py-16 md:py-24 bg-black text-center text-white">
      <div className="container mx-auto px-4 md:px-6">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Excelencia en Metal Mecánica y Creaciones en Madera
        </h1>
        <p className="mt-4 max-w-xl mx-auto text-lg text-gray-400 leading-relaxed md:text-xl">
          Más de 20 años perfeccionando el arte de transformar metal y madera en piezas únicas y funcionales. Cada proyecto es una obra de precisión, calidad y pasión artesanal.
        </p>
        <div className="mt-8 flex flex-col md:flex-row gap-4 justify-center">
          <Button 
            className="bg-white text-black hover:bg-gray-200 shadow-lg px-6 py-3 text-lg font-medium transform transition-transform duration-200 hover:scale-105"
            onClick={openModal}
          >
            Descripción Personal
          </Button>
          <Link to="/projects">
            <Button
              className="bg-yellow-400 text-white hover:bg-yellow-500 shadow-lg px-6 py-3 text-lg font-medium transform transition-transform duration-200 hover:scale-105"
            >
              Ver Proyectos
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
