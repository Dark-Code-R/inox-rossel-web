/* eslint-disable react/prop-types -- Component props follow the project's JSX convention. */
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  MoveRight,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function HeroSection({ openModal }) {
  return (
    <>
      <section
        id="inicio"
        className="hero-section"
        aria-labelledby="hero-title"
      >
        <div className="site-container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">
              <span className="status-dot" /> ARTESANÍA QUE TRANSFORMA
            </span>
            <h1 id="hero-title">
              TÚ LO IMAGINAS.
              <br />
              NOSOTROS
              <br />
              <span>LO CREAMOS.</span>
            </h1>
            <p>
              La fuerza del metal. La calidez de la madera.
              <br className="desktop-break" /> Creamos piezas a medida que dan
              vida a tus espacios y hacen crecer tu negocio.
            </p>
            <div className="hero-actions">
              <a href="#contacto" className="site-button button-primary">
                Hagamos tu proyecto{" "}
                <ArrowUpRight size={20} aria-hidden="true" />
              </a>
              <Link to="/projects" className="site-button button-outline">
                Explorar proyectos <MoveRight size={19} aria-hidden="true" />
              </Link>
            </div>
            <div className="hero-proof">
              <span>
                <Check size={15} aria-hidden="true" /> Fabricación a medida
              </span>
              <span>
                <Check size={15} aria-hidden="true" /> Atención personalizada
              </span>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-image-frame">
              <img
                className="hero-main-image"
                src="/images/oficio-soldadura.webp"
                alt="El oficio de la soldadura: precisión, metal y atención a cada detalle"
                width="900"
                height="900"
                loading="eager"
              />
              <div className="image-top-label">
                <span className="status-dot" /> DISEÑADO PARA DURAR
              </div>
              <div className="hero-image-caption">
                <span>
                  <small>DE NUESTRO TALLER A TU ESPACIO</small>
                  <strong>Detalles que hacen la diferencia.</strong>
                </span>
                <Link to="/projects" aria-label="Ver nuestros trabajos">
                  <ArrowUpRight size={25} />
                </Link>
              </div>
            </div>
            <button
              className="experience-badge"
              onClick={openModal}
              aria-label="Conoce a Rodolfo y sus más de 20 años de experiencia"
            >
              <Sparkles size={21} aria-hidden="true" />
              <strong>
                20<span>+</span>
              </strong>
              <span>
                AÑOS DE
                <br />
                EXPERIENCIA
              </span>
              <ArrowUpRight
                className="badge-arrow"
                size={18}
                aria-hidden="true"
              />
            </button>
            <div className="hero-detail-image">
              <img
                src="/images/escritorio-industrial.jpg"
                alt="Escritorio de metal y madera fabricado por Inox Rossel"
                width="1000"
                height="486"
              />
              <span>
                PRECISIÓN EN CADA PIEZA{" "}
                <ArrowUpRight size={14} aria-hidden="true" />
              </span>
            </div>
            <span className="hero-vertical-note" aria-hidden="true">
              PASIÓN POR EL OFICIO / INOX ROSSEL
            </span>
          </div>
        </div>
        <div className="site-container hero-bottom">
          <span>BUENOS MATERIALES. MEJORES IDEAS.</span>
          <a href="#servicios">
            Descubre lo que hacemos <ArrowDown size={16} aria-hidden="true" />
          </a>
        </div>
      </section>
      <div className="craft-strip" aria-label="Nuestras especialidades">
        <div className="site-container craft-strip-inner">
          <span>ACERO INOXIDABLE</span>
          <Sparkles aria-hidden="true" />
          <span>MADERA & METAL</span>
          <Sparkles aria-hidden="true" />
          <span>DISEÑO A MEDIDA</span>
          <Sparkles aria-hidden="true" />
          <span>HECHO EN BOLIVIA</span>
        </div>
      </div>
    </>
  );
}
