import { ArrowUpRight, MapPin } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function Footer() {
  const { pathname } = useLocation();
  const homeHref = (hash) =>
    pathname === "/" || pathname === "/home" ? hash : "/" + hash;
  return (
    <footer className="site-footer">
      <div className="site-container">
        <div className="footer-main">
          <div>
            <a href={homeHref("#inicio")} className="brand footer-brand">
              <span className="brand-mark" aria-hidden="true">
                <i />
                <i />
              </span>
              <span className="brand-type">
                INOX{" "}
                <strong>
                  ROSSEL<span>.</span>
                </strong>
                <small>METAL & MADERA</small>
              </span>
            </a>
            <p>El oficio de hacer bien las cosas.</p>
          </div>
          <nav aria-label="Navegación de pie de página">
            <a href={homeHref("#servicios")}>Servicios</a>
            <Link to="/projects">Proyectos</Link>
            <a href={homeHref("#nosotros")}>Nosotros</a>
            <a href={homeHref("#contacto")}>
              Contacto <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </nav>
          <span className="footer-location">
            <MapPin size={16} aria-hidden="true" /> Oruro, Bolivia
          </span>
        </div>
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} Inox Rossel. Todos los derechos
            reservados.
          </p>
          <Link to="/login">
            Acceso de clientes <ArrowUpRight size={13} aria-hidden="true" />
          </Link>
          <span>
            HECHO CON OFICIO Y PASIÓN <span className="footer-spark">✳</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
