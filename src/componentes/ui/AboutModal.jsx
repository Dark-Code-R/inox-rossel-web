/* eslint-disable react/prop-types -- Component props follow the project's JSX convention. */
import Modal from "./Modal";

export default function AboutModal({ closeModal }) {
  return (
    <Modal title="Detrás de Inox Rossel" onClose={closeModal}>
      <img
        className="about-modal-avatar"
        src="/images/oficio-soldadura.webp"
        alt="El oficio de trabajar el metal"
      />
      <h3 className="about-modal-name">Jimmy Rodolfo Rocha Rossel</h3>
      <p className="modal-description">
        Con más de 20 años de experiencia en metal mecánica y trabajos en
        madera, me especializo en crear soluciones personalizadas y de alta
        calidad.
      </p>
      <p className="modal-description">
        Cada proyecto refleja precisión, creatividad y resistencia, diseñado
        para satisfacer las necesidades y aspiraciones de cada cliente. Mi
        compromiso es brindar resultados únicos, funcionales y con atención a
        cada detalle.
      </p>
      <a
        className="site-button button-primary"
        href="#contacto"
        onClick={closeModal}
      >
        Hablemos de tu idea
      </a>
    </Modal>
  );
}
