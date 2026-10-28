import { useState } from "react";
import { ArrowUpRight, MoveRight, Play } from "lucide-react";
import { Link } from "react-router-dom";
import Modal from "./Modal";

const projects = [
  {
    title: "Cocina industrial a gas",
    category: "EQUIPAMIENTO GASTRONÓMICO",
    description:
      "Cocina de seis quemadores en acero inoxidable, pensada para el trabajo diario de restaurantes y emprendimientos gastronómicos.",
    image: "/images/cocina-industrial.jpg",
  },
  {
    title: "Mueble Switch Mario",
    category: "DISEÑO PERSONALIZADO",
    description:
      "Un mueble inspirado en Nintendo Switch, con iluminación LED y detalles de Mario Bros. Una idea diferente, hecha realidad en nuestro taller.",
    image: "/images/mueble-switch.jpg",
    video:
      "https://res.cloudinary.com/dyqcjrmmt/video/upload/v1747867104/Nintendo_v7jwss.mp4",
  },
  {
    title: "Carrito de pollo asado",
    category: "EQUIPAMIENTO GASTRONÓMICO",
    description:
      "Carrito profesional con sistema rotatorio y vitrina para exhibir tus preparaciones. Fabricado para acompañar tu emprendimiento.",
    image: "/images/carrito-pollo.jpg",
  },
  {
    title: "Freidora industrial",
    category: "ACERO INOXIDABLE",
    description:
      "Equipo de acero inoxidable diseñado para facilitar la limpieza y responder al ritmo de una cocina profesional.",
    image: "/images/freidora-industrial.jpg",
  },
  {
    title: "Estructura para escenario",
    category: "METAL MECÁNICA",
    description:
      "Estructura metálica para eventos, fabricada con atención a cada unión y a las necesidades de montaje del proyecto.",
    image: "/images/estructura-escenario.jpg",
  },
  {
    title: "Carrito de salchipapas",
    category: "EQUIPAMIENTO GASTRONÓMICO",
    description:
      "Carrito de acero inoxidable con plancha, freidora y espacio de trabajo personalizado para tu emprendimiento.",
    image: "/images/carrito-salchipapas.jpg",
  },
];

export default function PortfolioSection() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section
      id="portafolio"
      className="portfolio-section section-space"
      aria-labelledby="portfolio-title"
    >
      <div className="site-container">
        <div className="section-heading">
          <div>
            <span className="eyebrow">02 / DEL TALLER AL MUNDO</span>
            <h2 id="portfolio-title">
              MENOS PALABRAS.
              <br />
              <span>MÁS HECHOS.</span>
            </h2>
          </div>
          <div className="section-heading-aside">
            <p>
              Cada pieza tiene una historia.
              <br />
              Estos son algunos de nuestros trabajos.
            </p>
            <Link className="text-link" to="/projects">
              Ver todos los proyectos <MoveRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
        <div className="portfolio-grid">
          {projects.map((project, index) => (
            <button
              className="portfolio-card"
              key={project.title}
              onClick={() => setSelectedProject(project)}
              aria-label={"Ver proyecto: " + project.title}
            >
              <div className="portfolio-image">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  decoding="async"
                  width="900"
                  height="700"
                />
                <span className="project-index">0{index + 1}</span>
                {project.video && (
                  <span className="project-play">
                    <Play size={21} fill="currentColor" aria-hidden="true" />
                    <span>Ver video</span>
                  </span>
                )}
                <span className="project-open">
                  <ArrowUpRight size={22} aria-hidden="true" />
                </span>
              </div>
              <div className="portfolio-caption">
                <span>{project.category}</span>
                <h3>{project.title}</h3>
              </div>
            </button>
          ))}
        </div>
        <div className="portfolio-footer">
          <p>¿El próximo proyecto? Podría ser el tuyo.</p>
          <a href="#contacto" className="text-link">
            Empecemos a crearlo <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        </div>
      </div>
      {selectedProject && (
        <Modal
          title={selectedProject.title}
          onClose={() => setSelectedProject(null)}
        >
          {selectedProject.video ? (
            <video
              src={selectedProject.video}
              poster={selectedProject.image}
              className="project-modal-media"
              controls
              playsInline
              preload="metadata"
            />
          ) : (
            <img
              className="project-modal-media"
              src={selectedProject.image}
              alt={selectedProject.title}
            />
          )}
          <span className="eyebrow modal-category">
            {selectedProject.category}
          </span>
          <p className="modal-description">{selectedProject.description}</p>
          <a
            className="site-button button-primary"
            href="#contacto"
            onClick={() => setSelectedProject(null)}
          >
            Quiero un proyecto así <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        </Modal>
      )}
    </section>
  );
}
