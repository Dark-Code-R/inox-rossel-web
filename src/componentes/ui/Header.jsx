import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import perfil from '../images/logoM.png';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import anime from 'animejs';
import useFadeInOnLoad from '../../hooks/useAnimation';

function NavLink({ href, children, onClick, className }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`text-sm font-medium text-gray-600 hover:text-black transition-colors duration-200 ease-in-out tracking-wider ${className}`}
    >
      {children}
    </a>
  );
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);

  useFadeInOnLoad('.header-animate');

  const toggleMenu = () => {
    setIsMenuOpen((prev) => {
      const next = !prev;
      if (next) {
        setTimeout(() => {
          anime({
            targets: '.mobile-menu-slide',
            translateX: [300, 0],
            opacity: [0, 1],
            duration: 400,
            easing: 'easeOutExpo',
          });
        }, 10);
      }
      return next;
    });
  };

  const toggleImageModal = (e) => {
    e.preventDefault();
    setShowImageModal(!showImageModal);
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await signOut(auth);
      window.location.href = '/';
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <>
      <header className="header-animate sticky top-0 z-50 w-full border-b border-gray-300 bg-white shadow-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          {/* Logo */}
          <div className="flex items-center space-x-2 md:space-x-4 text-black font-semibold">
            <a href="#" onClick={toggleImageModal} className="cursor-pointer">
              <img
                src={perfil}
                alt="Logo"
                className="h-8 w-8 md:h-10 md:w-10 rounded-full object-cover border-2 border-gray-300"
              />
            </a>
            <span className="font-bold text-lg md:text-xl tracking-wider">
              Inox Rossel
            </span>
          </div>

          <button
            onClick={toggleMenu}
            className="md:hidden text-gray-600 focus:outline-none"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <nav className="hidden md:flex gap-4 md:gap-8 items-center">
            <NavLink href="#servicios">Servicios</NavLink>
            <NavLink href="#portafolio">Portafolio</NavLink>
            <NavLink href="#contacto">Contacto</NavLink>
            <NavLink
              href="/"
              onClick={handleLogout}
              className="text-red-600 font-bold"
            >
              Salir
            </NavLink>
          </nav>
        </div>
      </header>

      {/* Menú móvil */}
      <div
        className={`fixed inset-0 z-40 flex justify-end bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out md:hidden ${
          isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleMenu}
      >
        <div
          className={`mobile-menu-slide absolute right-0 top-0 min-h-screen w-3/4 bg-white shadow-lg pt-16 px-6 pb-6 overflow-y-auto ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <nav className="mt-8 flex flex-col gap-6">
            <NavLink href="#servicios" onClick={toggleMenu}>
              Servicios
            </NavLink>
            <NavLink href="#portafolio" onClick={toggleMenu}>
              Portafolio
            </NavLink>
            <NavLink href="#contacto" onClick={toggleMenu}>
              Contacto
            </NavLink>
            <NavLink
              href="/"
              onClick={(e) => {
                toggleMenu();
                handleLogout(e);
              }}
              className="text-red-600 font-bold"
            >
              Salir
            </NavLink>
          </nav>
        </div>
      </div>

      {/* Modal Imagen */}
      {showImageModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4"
          onClick={toggleImageModal}
        >
          <div
            className="relative max-w-3xl max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-lg"
              onClick={toggleImageModal}
            >
              <X size={24} className="text-gray-800" />
            </button>
            <img
              src={perfil}
              alt="Logo Inox Rossel"
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}
    </>
  );
}
