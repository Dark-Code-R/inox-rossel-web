import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import perfil from '../images/logoM.png'; // Ajusta esta ruta según tu estructura

// Importar componentes
import ProjectCard from "./ProjectCard";
import CategoryFilter from "./CategoryFilter";

// Importar datos
import { projects } from "./data/projects";
import { categories } from "./data/categories";

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("todos");
  const [filteredProjects, setFilteredProjects] = useState(projects);

  // Filtrar proyectos cuando cambia la categoría seleccionada
  useEffect(() => {
    if (selectedCategory === "todos") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => project.category === selectedCategory));
    }
  }, [selectedCategory]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 text-black">
      <header className="sticky top-0 z-50 w-full border-b border-gray-300 bg-white shadow-md animate-fade-in">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img
              src={perfil}
              alt="Logo Inox Rossel"
              className="h-10 w-10 rounded-full border-2 border-gray-300 object-cover"
            />
            <h1 className="text-2xl font-bold">
              Proyectos Realizados
            </h1>
          </div>
          <Link to="/home">
            <button className="bg-gray-200 text-black px-4 py-2 rounded-md hover:bg-gray-300 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Volver al Inicio
            </button>
          </Link>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-6 py-8">
        <section className="text-center my-8 px-6">
          <h2 className="text-3xl font-bold mb-4">Nuestros Proyectos</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Cada proyecto es un reflejo de nuestra pasión por la artesanía y el
            diseño personalizado. Desde estructuras metálicas hasta mobiliario
            en madera, nuestros proyectos están hechos a la medida para cumplir
            con los más altos estándares de calidad.
          </p>
        </section>

        {/* Filtro de categorías */}
        <CategoryFilter 
          categories={categories} 
          selectedCategory={selectedCategory} 
          onSelectCategory={setSelectedCategory} 
        />

        {/* Galería de Proyectos */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <ProjectCard
                key={index}
                title={project.title}
                description={project.description}
                imageUrl={project.imageUrl}
                fullDescription={project.fullDescription}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">No hay proyectos disponibles en esta categoría.</p>
            </div>
          )}
        </section>

        {/* Navegación rápida */}
        <div className="flex justify-center mt-12">
          <Link to="/home#contacto" className="inline-flex items-center text-blue-600 hover:text-blue-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            Ir a la sección de contacto
          </Link>
        </div>
      </main>

      <footer className="w-full py-8 bg-gray-200 text-center text-gray-600 mt-12">
        <p>
          Gracias por explorar nuestros proyectos realizados. Si deseas conocer
          más o iniciar tu propio proyecto, no dudes en contactarnos.
        </p>
        <a
          href="https://wa.me/59170416434"
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-600 hover:text-green-800 font-bold mt-4 block"
        >
          Contactar por WhatsApp
        </a>
      </footer>
    </div>
  );
}