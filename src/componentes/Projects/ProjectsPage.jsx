import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import perfil from '../images/logoM.png';

// Mover los proyectos a un archivo separado sería ideal para mejor organización
const projects = [
  {
    title: "Horno Industrial de Alta Producción",
    description: "Cocción uniforme para grandes cantidades.",
    fullDescription:
      "Equipo profesional diseñado especialmente para panaderías y restaurantes que requieren cocciones rápidas, uniformes y consistentes en grandes volúmenes.",
    imageUrl:
      "https://res.cloudinary.com/dyqcjrmmt/image/upload/v1745349630/horno_industria_lit7u5.jpg",
    category: "equipos-cocina"
  },
  {
    title: "Carritos Rostizadores Profesionales",
    description: "Asado eficiente para pollos y carnes.",
    fullDescription:
      "Carritos móviles con asadores giratorios ideales para preparar pollos y carnes de forma uniforme y eficiente, perfectos para negocios gastronómicos móviles y restaurantes.",
    imageUrl:
      "https://res.cloudinary.com/dyqcjrmmt/image/upload/v1745349632/spiaderas_ijqans.jpg",
    category: "equipos-cocina"
  },
  {
    title: "Cocina Combinada Profesional",
    description: "Quemadores y parrilla integrados.",
    fullDescription:
      "Equipo versátil para cocinar diversos platos simultáneamente, perfecto para establecimientos que ofrecen una variedad gastronómica.",
    imageUrl:
      "https://res.cloudinary.com/dyqcjrmmt/image/upload/v1745349633/cocina_industrial_combinada_x9bbpc.jpg",
    category: "equipos-cocina"
  },
  {
    title: "Cocina Industrial de Alto Rendimiento",
    description: "Alta potencia con múltiples quemadores.",
    fullDescription:
      "Diseñada especialmente para restaurantes y negocios gastronómicos que necesitan eficiencia y rapidez al cocinar grandes cantidades.",
    imageUrl:
      "https://res.cloudinary.com/dyqcjrmmt/image/upload/v1745349631/Cocina_industrial_a0l96f.jpg",
    category: "equipos-cocina"
  },
  {
    title: "Bandejas Transportadoras Profesionales",
    description: "Facilita la manipulación de alimentos.",
    fullDescription:
      "Bandejas metálicas resistentes y prácticas, perfectas para transportar y almacenar productos horneados o alimentos preparados.",
    imageUrl:
      "https://res.cloudinary.com/dyqcjrmmt/image/upload/v1745349697/Transportador_qxalnv.jpg",
    category: "accesorios"
  },
  {
    title: "Freidoras Broaster Multicapacidad",
    description: "Cocción rápida y crujiente bajo presión.",
    fullDescription:
      "Equipos especializados para preparar pollo estilo broaster con diferentes capacidades, garantizando textura y sabor excepcionales.",
    imageUrl:
      "https://res.cloudinary.com/dyqcjrmmt/image/upload/v1745349631/Brosteras_capacidades_c4t0fm.jpg",
    category: "equipos-cocina"
  },
  {
    title: "Carrito Rostizador de Pollos",
    description: "Asado uniforme y práctico transporte.",
    fullDescription:
      "Carrito móvil equipado con asadores giratorios ideales para preparar pollo a la brasa uniformemente, óptimo para negocios ambulantes.",
    imageUrl:
      "https://res.cloudinary.com/dyqcjrmmt/image/upload/v1745349634/carrito_asador_de_pollos_m6wr5t.jpg",
    category: "equipos-cocina"
  },
  {
    title: "Horno Especializado para Pizza",
    description: "Base crujiente y rápida preparación.",
    fullDescription:
      "Horno diseñado específicamente para pizzerías, ofreciendo altas temperaturas para lograr pizzas perfectas en poco tiempo.",
    imageUrl:
      "https://res.cloudinary.com/dyqcjrmmt/image/upload/v1745349630/Horno_para_pizza_ojlpwz.jpg",
    category: "equipos-cocina"
  },
  {
    title: "Parrilla Profesional en Acero Inoxidable",
    description: "Ideal para eventos y restaurantes.",
    fullDescription:
      "Parrillero robusto fabricado en acero inoxidable, resistente, higiénico y fácil de limpiar, perfecto para cualquier tipo de evento gastronómico.",
    imageUrl:
      "https://res.cloudinary.com/dyqcjrmmt/image/upload/v1745349631/Parrillero_en_acero_inoxidable_tv0lwz.jpg",
    category: "equipos-cocina"
  },
  {
    title: "Horno Artesanal para Pizza en Acero Inoxidable",
    description:
      "Cocción perfecta para pizzas artesanales con estilo y eficiencia.",
    fullDescription:
      "Este horno artesanal especializado en pizzas combina diseño moderno y funcionalidad excepcional. Fabricado en acero inoxidable, garantiza una distribución uniforme del calor para lograr una cocción rápida, base crujiente y sabores auténticos. Ideal para espacios exteriores, terrazas o negocios gastronómicos que buscan destacar ofreciendo pizzas con calidad profesional y un toque artesanal único.",
    imageUrl:
      "https://res.cloudinary.com/dyqcjrmmt/image/upload/v1745350515/Horno_a_gas_piza_znbtrz.webp",
    category: "equipos-cocina"
  },
  {
    title: "Escritorio Minimalista de Madera y Metal",
    description: "Práctico, elegante y perfecto para espacios reducidos.",
    fullDescription:
      "Este escritorio combina la calidez de la madera natural con la resistencia de una estructura metálica, ofreciendo un diseño moderno y funcional. Ideal para oficinas en casa, estudios o espacios pequeños donde se necesita optimizar el área sin sacrificar estilo.",
    imageUrl:
      "https://res.cloudinary.com/dyqcjrmmt/image/upload/v1745351091/mesa_fz3pfx.png",
    category: "mobiliario"
  },
  {
    title: "Ropero Industrial de Madera y Metal",
    description: "Amplio, resistente y de diseño moderno.",
    fullDescription:
      "Este ropero combina la robustez de una estructura metálica con la elegancia de la madera natural. Ofrece gran capacidad de almacenamiento con compartimentos y cajones bien distribuidos, ideal para hogares, lofts o espacios que buscan un estilo industrial contemporáneo.",
    imageUrl:
      "https://res.cloudinary.com/dyqcjrmmt/image/upload/v1747849290/Ropero_Industrial_de_Madera_y_Metal_nmagwb.jpg",
    category: "mobiliario"
  },
];

// Categorías disponibles
const categories = [
  { id: "todos", name: "Todos los Proyectos" },
  { id: "equipos-cocina", name: "Equipos de Cocina" },
  { id: "mobiliario", name: "Mobiliario" },
  { id: "accesorios", name: "Accesorios" }
];

export default function ProjectsPage() {
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
            <h1 className="text-2xl font-bold">Proyectos Realizados</h1>
          </div>
          <Link to="/home">
            <button className="bg-gray-200 text-black px-4 py-2 rounded-md hover:bg-gray-300 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
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
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full transition-all ${
                selectedCategory === category.id
                  ? "bg-black text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

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
              <p className="text-gray-500 text-lg">
                No hay proyectos disponibles en esta categoría.
              </p>
            </div>
          )}
        </section>

        {/* Navegación rápida */}
        <div className="flex justify-center mt-12">
          <Link
            to="/home#contacto"
            className="inline-flex items-center bg-black text-white px-5 py-3 rounded-full shadow-lg hover:bg-gray-800 transition duration-300 font-medium"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            Contactar ahora
          </Link>
        </div>
      </main>

      <footer className="w-full py-8 bg-gray-200 text-center text-gray-600 mt-12">
        <p>
          Gracias por explorar nuestros proyectos realizados. Si deseas conocer
          más o iniciar tu propio proyecto, no dudes en contactarnos.
        </p>
      </footer>
    </div>
  );
}

function ProjectCard({ title, description, imageUrl, fullDescription }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <>
      <div
        className="group bg-white rounded-lg shadow-lg overflow-hidden border border-gray-300 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        {imageError ? (
          <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">Imagen no disponible</span>
          </div>
        ) : (
          <div className="relative w-full h-48">
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-800"></div>
              </div>
            )}
            <img
              src={imageUrl}
              alt={title}
              className={`w-full h-48 object-cover transition-transform duration-300 hover:scale-105 hover:opacity-90 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
          </div>
        )}
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>

      {isModalOpen && (
        <Modal
          onClose={() => setIsModalOpen(false)}
          title={title}
          description={fullDescription}
          imageUrl={imageUrl}
        />
      )}
    </>
  );
}

function Modal({ onClose, title, description, imageUrl }) {
  // Cerrar modal al hacer clic fuera
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Cerrar modal con tecla Escape
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  }, [onClose]);

  // Prevenir scroll del body cuando el modal está abierto
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg p-6 max-w-lg mx-auto shadow-lg relative animate-fade-in-up overflow-auto max-h-[90vh]">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl font-bold"
          onClick={onClose}
        >
          &times;
        </button>
        
        {imageError ? (
          <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded-md mb-4">
            <span className="text-gray-500">Imagen no disponible</span>
          </div>
        ) : (
          <div className="relative w-full max-h-64 mb-4">
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-md">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-800"></div>
              </div>
            )}
            <img
              src={imageUrl}
              alt={title}
              className={`w-full h-auto max-h-64 object-contain rounded-md ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
          </div>
        )}
        
        <h3 className="text-2xl font-bold text-center mb-4">{title}</h3>
        <p className="text-gray-700 text-center">{description}</p>
      </div>
    </div>
  );
}