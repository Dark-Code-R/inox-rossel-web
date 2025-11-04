import React from 'react';
import { Button } from './componentes-ui/Button';
import perfilPersonal from '../images/FotoPerfil.png';
import useFadeInAnimation from '../../hooks/useAnimation';

export default function AboutModal({ closeModal }) {
  useFadeInAnimation();
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-8 max-w-lg mx-auto shadow-lg relative animate-fade-in-up">
        <button 
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          onClick={closeModal}
        >
          &times;
        </button>
        <img
          src={perfilPersonal}
          alt="Perfil Personal"
          className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-gray-300"
        />
        <h2 className="text-2xl font-bold text-center mb-4">Jimmy Rodolfo Rocha Rossel</h2>
        <p className="text-gray-700 text-center mb-4">
          Con más de 20 años de experiencia en metal mecánica y trabajos en madera, me especializo en crear soluciones personalizadas y de alta calidad.
        </p>
        <p className="text-gray-700 text-center mb-4">
          Cada proyecto refleja precisión, creatividad y resistencia, diseñado para satisfacer las necesidades y aspiraciones de cada cliente.
        </p>
        <p className="text-gray-700 text-center">
          También realizo otros tipos de proyectos personalizados. Mi compromiso es brindar resultados únicos, funcionales y visualmente impresionantes.
        </p>
        <div className="text-center mt-6">
          <Button onClick={closeModal} className="bg-black text-white px-4 py-2 rounded-full">
            Cerrar
          </Button>
        </div>
      </div>
    </div>
  );
}
