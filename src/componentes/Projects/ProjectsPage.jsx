import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowDown,
  ArrowLeft,
  ArrowUpRight,
  Check,
  Search,
  SearchX,
  X,
} from "lucide-react";
import Header from "../ui/Header";
import Footer from "../ui/Footer";
import Modal from "../ui/Modal";
import ProjectCard from "./ProjectCard";
import ProjectImage from "./ProjectImage";
import CategoryFilter from "./CategoryFilter";
import { projects } from "./data/projects";
import { categories } from "./data/categories";
import "../landing.css";
import "./projects.css";

const normalize = (value) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
const counts = Object.fromEntries(
  categories.map((category) => [
    category.id,
    category.id === "todos"
      ? projects.length
      : projects.filter((project) => project.category === category.id).length,
  ]),
);

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState("todos");
  const [search, setSearch] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);
  const filteredProjects = projects.filter(
    (project) =>
      (selectedCategory === "todos" || project.category === selectedCategory) &&
      normalize(project.title + " " + project.description).includes(
        normalize(search.trim()),
      ),
  );
  const categoryName = (category) =>
    categories.find((item) => item.id === category)?.name || category;

  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Proyectos realizados | Inox Rossel";
    window.scrollTo(0, 0);
    return () => {
      document.title = previousTitle;
    };
  }, []);

  const resetFilters = () => {
    setSelectedCategory("todos");
    setSearch("");
  };

  return (
    <div className="inox-site projects-page">
      <a className="skip-link" href="#catalogo">
        Saltar a los proyectos
      </a>
      <Header />
      <main>
        <section className="catalog-hero" aria-labelledby="projects-title">
          <div className="site-container">
            <Link to="/" className="catalog-back">
              <ArrowLeft size={16} aria-hidden="true" /> Volver al inicio
            </Link>
            <div className="catalog-hero-grid">
              <div className="catalog-hero-copy">
                <span className="eyebrow">
                  <span className="status-dot" /> PORTAFOLIO / INOX ROSSEL
                </span>
                <h1 id="projects-title">
                  IDEAS HECHAS.
                  <br />
                  <span>PROYECTOS REALES.</span>
                </h1>
                <p>
                  Del primer trazo al último acabado. Explora las piezas que
                  hemos creado para hogares, negocios y nuevas formas de
                  emprender.
                </p>
                <a href="#catalogo" className="catalog-explore">
                  Encuentra tu próxima inspiración{" "}
                  <ArrowDown size={17} aria-hidden="true" />
                </a>
              </div>
              <div className="catalog-hero-art">
                <img
                  className="catalog-hero-photo"
                  src="/images/mostrador-industrial.jpg"
                  alt="Mostrador de metal y madera fabricado por Inox Rossel"
                  width="900"
                  height="437"
                  loading="eager"
                />
                <span className="catalog-photo-label">
                  <span className="status-dot" /> HECHO A MEDIDA, HECHO PARA
                  DURAR
                </span>
                <span className="catalog-photo-corner" aria-hidden="true">
                  <ArrowUpRight size={35} />
                </span>
                <div className="catalog-material-tag">
                  <span>01 / MADERA & METAL</span>
                  <strong>
                    El oficio está
                    <br />
                    en los detalles.
                  </strong>
                </div>
              </div>
            </div>
            <div className="catalog-hero-bottom">
              <div className="catalog-metrics">
                <span>
                  <strong>
                    {projects.length}
                    <i> /</i>
                  </strong>{" "}
                  PROYECTOS PARA EXPLORAR
                </span>
                <span>
                  <strong>
                    20<i>+</i>
                  </strong>{" "}
                  AÑOS DE EXPERIENCIA
                </span>
              </div>
              <span className="catalog-handmade">
                <Check size={16} aria-hidden="true" /> Diseño propio.
                Fabricación a medida.
              </span>
            </div>
          </div>
        </section>
        <section
          id="catalogo"
          className="catalog-section section-space"
          aria-labelledby="catalog-title"
        >
          <div className="site-container">
            <div className="catalog-section-heading">
              <div>
                <span className="eyebrow">DEL TALLER A TU ESPACIO</span>
                <h2 id="catalog-title">
                  PROYECTOS REALIZADOS<span>.</span>
                </h2>
              </div>
              <p>
                Materiales con fuerza.
                <br />
                Soluciones con personalidad.
              </p>
            </div>
            <div className="catalog-toolbar">
              <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                counts={counts}
              />
              <div className="catalog-search">
                <Search size={17} aria-hidden="true" />
                <label className="sr-only" htmlFor="project-search">
                  Buscar proyectos
                </label>
                <input
                  id="project-search"
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Busca tu inspiración..."
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    aria-label="Limpiar búsqueda"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </div>
            <div
              className="catalog-results"
              role="status"
              aria-live="polite"
              aria-atomic="true"
            >
              <span>
                {filteredProjects.length}{" "}
                {filteredProjects.length === 1 ? "proyecto" : "proyectos"}{" "}
                {selectedCategory === "todos"
                  ? "para descubrir"
                  : "en " + categoryName(selectedCategory).toLowerCase()}
              </span>
              <span>
                CREADOS EN ORURO, BOLIVIA <span className="status-dot" />
              </span>
            </div>
            <div className="catalog-grid">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.title}
                  project={project}
                  index={projects.indexOf(project)}
                  categoryName={categoryName(project.category)}
                  onOpen={() => setSelectedProject(project)}
                />
              ))}
            </div>
            {filteredProjects.length === 0 && (
              <div className="catalog-empty">
                <SearchX size={40} strokeWidth={1.3} aria-hidden="true" />
                <h3>Todavía no hay una pieza con ese nombre.</h3>
                <p>
                  Prueba otra búsqueda o explora todos los proyectos. Quizá lo
                  que imaginas sea lo próximo que creemos.
                </p>
                <button
                  className="site-button button-dark"
                  onClick={resetFilters}
                >
                  Ver todos los proyectos{" "}
                  <ArrowUpRight size={18} aria-hidden="true" />
                </button>
              </div>
            )}
            <div className="catalog-endnote">
              <span className="status-dot" />
              <p>
                Estas piezas ya tienen una historia. La tuya puede ser la
                siguiente.
              </p>
            </div>
          </div>
        </section>
        <section className="catalog-cta" aria-labelledby="catalog-cta-title">
          <div className="site-container catalog-cta-inner">
            <div>
              <span className="eyebrow">
                TU IDEA TIENE LUGAR EN NUESTRO TALLER
              </span>
              <h2 id="catalog-cta-title">
                ¿HACEMOS REALIDAD
                <br />
                <span>TU PRÓXIMO PROYECTO?</span>
              </h2>
            </div>
            <div>
              <p>
                Cuéntanos qué tienes en mente.
                <br />
                Nosotros te ayudamos a darle forma.
              </p>
              <Link className="site-button button-primary" to="/#contacto">
                Hablemos de tu idea{" "}
                <ArrowUpRight size={19} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      {selectedProject && (
        <Modal
          title={selectedProject.title}
          onClose={() => setSelectedProject(null)}
        >
          <ProjectImage
            key={selectedProject.imageUrl}
            src={selectedProject.imageUrl}
            alt={selectedProject.title}
            eager
            className="catalog-modal-image"
          />
          <div className="catalog-modal-meta">
            <span>{categoryName(selectedProject.category)}</span>
            <span>
              <Check size={13} aria-hidden="true" /> Fabricación a medida
            </span>
          </div>
          <p className="modal-description">{selectedProject.fullDescription}</p>
          <Link
            className="site-button button-primary"
            to="/#contacto"
            onClick={() => setSelectedProject(null)}
          >
            Quiero un proyecto así <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </Modal>
      )}
    </div>
  );
}
