/* eslint-disable react/prop-types -- Component props follow the project's JSX convention. */
import { ArrowUpRight, Check, Quote } from "lucide-react";

export default function AboutSection({ openModal }) {
  return (
    <section
      id="nosotros"
      className="about-section section-space"
      aria-labelledby="about-title"
    >
      <div className="site-container about-grid">
        <div className="about-portrait">
          <div className="portrait-frame">
            <img
              src="/images/mostrador-industrial.jpg"
              alt="Mostrador de madera y estructura metálica fabricado por Inox Rossel"
              loading="lazy"
              width="900"
              height="437"
            />
          </div>
          <div className="portrait-caption">
            <span className="status-dot" />
            <span>
              MADERA & METAL <small>EL OFICIO DETRÁS DE CADA PIEZA</small>
            </span>
            <Quote size={28} aria-hidden="true" />
          </div>
        </div>
        <div className="about-copy">
          <span className="eyebrow">03 / MANOS QUE SABEN CREAR</span>
          <h2 id="about-title">
            NO SOLO FABRICAMOS.
            <br />
            <span>LE PONEMOS ALMA.</span>
          </h2>
          <p>
            Soy Rodolfo. Llevo más de 20 años transformando metal y madera en
            soluciones que la gente usa, disfruta y hace suyas.
          </p>
          <p>
            En Inox Rossel, cada proyecto empieza escuchándote. Cuidamos los
            materiales, las medidas y esos pequeños detalles que convierten una
            buena idea en una gran pieza.
          </p>
          <div className="about-values">
            <span>
              <Check size={17} aria-hidden="true" /> Trato directo y cercano
            </span>
            <span>
              <Check size={17} aria-hidden="true" /> Cuidado en cada acabado
            </span>
            <span>
              <Check size={17} aria-hidden="true" /> Piezas hechas para ti
            </span>
          </div>
          <button className="site-button button-light" onClick={openModal}>
            Conoce mi historia <ArrowUpRight size={19} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
