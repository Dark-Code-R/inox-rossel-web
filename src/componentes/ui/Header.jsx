import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, LogIn, LogOut, MapPin, Menu, X } from "lucide-react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Link, useLocation } from "react-router-dom";
import { auth } from "../../firebaseConfig";
import Modal from "./Modal";

const links = [
  { href: "#inicio", label: "Inicio" },
  { href: "#servicios", label: "Servicios" },
  { href: "/projects", label: "Proyectos" },
  { href: "#nosotros", label: "Nosotros" },
];

export default function Header() {
  const { pathname } = useLocation();
  const isHome = pathname === "/" || pathname === "/home";
  const sectionHref = (hash) => (isHome ? hash : "/" + hash);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [user, setUser] = useState(null);
  const menuButton = useRef(null);

  useEffect(() => onAuthStateChanged(auth, setUser), []);

  useEffect(() => {
    const closeMenu = (event) => {
      if (event.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onResize = () => {
      if (desktop.matches) setIsMenuOpen(false);
    };
    window.addEventListener("keydown", closeMenu);
    desktop.addEventListener("change", onResize);
    return () => {
      window.removeEventListener("keydown", closeMenu);
      desktop.removeEventListener("change", onResize);
    };
  }, [isMenuOpen]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsMenuOpen(false);
      window.location.href = "/";
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <>
      <div className="location-bar">
        <div className="site-container location-bar-inner">
          <span>
            <MapPin size={12} aria-hidden="true" /> Hecho en Oruro, Bolivia
          </span>
          <span>Metal, madera y pasión por el detalle.</span>
        </div>
      </div>
      <header className="site-header">
        <div className="site-container header-inner">
          <button
            className="brand"
            onClick={() => setShowImageModal(true)}
            aria-label="Ver logotipo de Inox Rossel"
          >
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
          </button>
          <nav className="desktop-nav" aria-label="Navegación principal">
            {links.map(({ href, label }) => (
              <a
                key={href}
                href={href.startsWith("#") ? sectionHref(href) : href}
                aria-current={href === pathname ? "page" : undefined}
              >
                {label}
              </a>
            ))}
          </nav>
          <div className="header-actions">
            <a
              className="site-button button-primary header-quote"
              href={sectionHref("#contacto")}
            >
              Cotiza tu proyecto <ArrowUpRight size={17} aria-hidden="true" />
            </a>
            {user && (
              <button
                className="header-account"
                onClick={handleLogout}
                aria-label="Cerrar sesión"
                title="Cerrar sesión"
              >
                <LogOut size={19} />
              </button>
            )}
            <button
              ref={menuButton}
              className="menu-toggle"
              aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={isMenuOpen}
              aria-controls={isMenuOpen ? "mobile-navigation" : undefined}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <nav
            id="mobile-navigation"
            className="mobile-nav"
            aria-label="Navegación móvil"
          >
            <div className="site-container">
              {links.map(({ href, label }, index) => (
                <a
                  key={href}
                  href={href.startsWith("#") ? sectionHref(href) : href}
                  aria-current={href === pathname ? "page" : undefined}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="nav-number">0{index + 1}</span>
                  {label}
                  <ArrowUpRight size={18} aria-hidden="true" />
                </a>
              ))}
              <a
                className="mobile-contact-link"
                href={sectionHref("#contacto")}
                onClick={() => setIsMenuOpen(false)}
              >
                Hablemos de tu proyecto{" "}
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
              {user ? (
                <button className="nav-account" onClick={handleLogout}>
                  <LogOut size={16} aria-hidden="true" /> Cerrar sesión
                </button>
              ) : (
                <Link className="nav-account" to="/login">
                  <LogIn size={16} aria-hidden="true" /> Acceder a mi cuenta
                </Link>
              )}
            </div>
          </nav>
        )}
      </header>
      {isMenuOpen && (
        <button
          className="menu-backdrop"
          aria-label="Cerrar menú"
          tabIndex={-1}
          onClick={() => setIsMenuOpen(false)}
        />
      )}
      {showImageModal && (
        <Modal title="Inox Rossel" onClose={() => setShowImageModal(false)}>
          <img
            className="brand-preview"
            src="/images/inox-rossel-logo.webp"
            alt="Logotipo de Inox Rossel"
          />
        </Modal>
      )}
    </>
  );
}
