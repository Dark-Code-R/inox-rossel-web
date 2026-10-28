import {
  ArrowUpRight,
  Armchair,
  Flame,
  Hammer,
  Layers3,
  PencilRuler,
  Wrench,
} from "lucide-react";

const services = [
  {
    icon: Wrench,
    title: "Metal mecánica",
    description:
      "Estructuras metálicas resistentes, funcionales y con acabados que se notan. Desde la idea hasta la última unión.",
    tags: "ESTRUCTURAS · ACERO INOXIDABLE",
  },
  {
    icon: Armchair,
    title: "Muebles con carácter",
    description:
      "La combinación perfecta de madera y metal. Muebles únicos que se adaptan a tu espacio y a tu manera de vivir.",
    tags: "MOBILIARIO · MADERA & METAL",
  },
  {
    icon: Flame,
    title: "Equipos gastronómicos",
    description:
      "Cocinas, asadores y hornos para llevar tu negocio al siguiente nivel. Diseñados para trabajar tanto como tú.",
    tags: "COCINAS · HORNOS · ASADORES",
  },
  {
    icon: Hammer,
    title: "Soldadura especializada",
    description:
      "Precisión en cada unión. Fabricación, ensamblaje y reparación de piezas con el cuidado que tu proyecto merece.",
    tags: "SOLDADURA · ENSAMBLAJE",
  },
  {
    icon: PencilRuler,
    title: "Tu idea, a medida",
    description:
      "Te ayudamos a dar forma a eso que tienes en mente. Asesoría y soluciones personalizadas de principio a fin.",
    tags: "ASESORÍA · DISEÑO PERSONALIZADO",
  },
  {
    icon: Layers3,
    title: "Espacios al aire libre",
    description:
      "Estructuras y mobiliario pensados para disfrutar afuera. Funcionalidad y diseño que resisten el paso del tiempo.",
    tags: "EXTERIORES · MOBILIARIO",
  },
];

export default function ServicesSection() {
  return (
    <section
      id="servicios"
      className="services-section section-space"
      aria-labelledby="services-title"
    >
      <div className="site-container">
        <div className="section-heading">
          <div>
            <span className="eyebrow">01 / LO QUE HACEMOS</span>
            <h2 id="services-title">
              BUENAS IDEAS.
              <br />
              <span>GRANDES RESULTADOS.</span>
            </h2>
          </div>
          <p>
            Un taller, muchas posibilidades. Combinamos experiencia y
            creatividad para construir lo que necesitas.
          </p>
        </div>
        <div className="services-grid">
          {services.map(({ icon: Icon, title, description, tags }, index) => (
            <a key={title} href="#contacto" className="service-card">
              <div className="service-card-top">
                <span className="service-icon">
                  <Icon size={25} strokeWidth={1.7} aria-hidden="true" />
                </span>
                <span className="service-number">0{index + 1}</span>
              </div>
              <h3>{title}</h3>
              <p>{description}</p>
              <div className="service-card-bottom">
                <span>{tags}</span>
                <ArrowUpRight size={20} aria-hidden="true" />
              </div>
            </a>
          ))}
        </div>
        <div className="services-note">
          <span className="status-dot" />
          <p>¿Tienes algo diferente en mente? Nos gustan los nuevos retos.</p>
          <a href="#contacto">
            Cuéntanos tu idea <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
