import React, { useState } from 'react';
import { Button } from './componentes-ui/Button';
import useStaggeredFadeIn from '../../hooks/useAnimation';

function ProjectCard({ title, description, image, onOpen }) {
  const isVideo = image.endsWith('.mp4');

  return (
    <div
      className="project-card relative overflow-hidden rounded-lg bg-white h-64 shadow-md group border border-gray-200 transform transition-transform duration-300 hover:scale-105 opacity-0"
      onClick={onOpen}
    >
      {isVideo ? (
        <video
          src={image}
          className="object-cover w-full h-full rounded-lg"
          muted
          autoPlay
          loop
          playsInline
        />
      ) : (
        <img
          src={image}
          alt={title}
          className="object-cover w-full h-full opacity-90 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
        <div className="text-left">
          <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
          <p className="text-sm text-gray-300">{description.slice(0, 60)}...</p>
        </div>
      </div>
    </div>
  );
}

function ProjectModal({ project, onClose }) {
  const isVideo = project.image.endsWith('.mp4');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div
        className="bg-white rounded-lg p-6 max-w-lg md:max-w-2xl mx-auto shadow-lg relative overflow-auto"
        style={{ maxHeight: '90vh' }}
      >
        <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-800" onClick={onClose}>
          &times;
        </button>

        {isVideo ? (
          <video
            src={project.image}
            className="w-full h-auto max-h-64 object-contain rounded-md mb-4"
            controls
          />
        ) : (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-auto max-h-64 object-contain rounded-md mb-4"
          />
        )}

        <h3 className="text-2xl font-semibold text-center mb-2">{project.title}</h3>
        <p className="text-gray-600 text-center mb-4">{project.description}</p>
        <div className="text-center mt-6">
          <Button onClick={onClose} className="bg-gray-800 text-white px-4 py-2 rounded-full hover:bg-gray-900">
            Cerrar
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function PortfolioSection() {
  const [selectedProject, setSelectedProject] = useState(null);

  useStaggeredFadeIn('.project-card');

  const projects = [
    {
      title: "Mueble Switch Mario",
      description: "Diseño gamer con estilo: mueble inspirado en Nintendo Switch con iluminación LED y detalles de Mario Bros. Ideal para fans que quieren destacar su setup.",
      image: "https://res.cloudinary.com/dyqcjrmmt/video/upload/v1747867104/Nintendo_v7jwss.mp4"
    },
    {
      title: "Cocina Industrial a Gas",
      description: "Eficiencia para tu cocina profesional: 6 quemadores, acero inoxidable resistente, sistema de seguridad avanzado y fácil limpieza.",
      image: "https://res.cloudinary.com/dyqcjrmmt/image/upload/v1745347107/cocina_industrial_r8jzdu.jpg"
    },
    {
      title: "Freidora Industrial",
      description: "Resultados crujientes con menor consumo de aceite: freidora de 25L con zona fría, control de temperatura y diseño para alto rendimiento.",
      image: "https://res.cloudinary.com/dyqcjrmmt/image/upload/v1745347107/freidora_industrial_lgajm4.jpg"
    },
    {
      title: "Carrito de Pollo Asado",
      description: "Carrito profesional para 12 pollos, vitrina térmica iluminada, sistema rotatorio eficiente. Tu emprendimiento de comida móvil, listo para despegar.",
      image: "https://res.cloudinary.com/dyqcjrmmt/image/upload/v1745347106/carrito_pollo_j4zkjs.jpg"
    },
    {
      title: "Carrito Salchipapas",
      description: "Emprende con estilo: carrito completo en acero inoxidable, plancha de 80x50cm, freidora de 10L y espacio personalizado. Ideal para ferias y plazas.",
      image: "https://res.cloudinary.com/dyqcjrmmt/image/upload/v1745347107/carrito_salchipapas_swymym.jpg"
    },
    {
      title: "Estructura Escenario",
      description: "Escenarios seguros y funcionales: estructura galvanizada, carga de 750kg/m², nivelación adaptable a terrenos irregulares. Perfecto para eventos profesionales.",
      image: "https://res.cloudinary.com/dyqcjrmmt/image/upload/v1745347107/estructura_escenario_avymqy.jpg"
    }
  ];

  return (
    <section id="portafolio" className="w-full py-16 bg-gray-100 text-black">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Proyectos Destacados</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} onOpen={() => setSelectedProject(project)} />
          ))}
        </div>
      </div>
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </section>
  );
}
