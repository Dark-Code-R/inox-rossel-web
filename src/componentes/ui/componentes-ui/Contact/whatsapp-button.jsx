import React, { useEffect, useRef } from "react";
import anime from "animejs";

function WhatsAppButton() {
  const buttonRef = useRef(null);

  useEffect(() => {
    const el = buttonRef.current;

    // Animación de entrada
    anime({
      targets: el,
      opacity: [0, 1],
      translateY: [100, 0],
      easing: 'easeOutExpo',
      duration: 800,
    });

    // Animación de flotación infinita (tipo burbuja)
    anime({
      targets: el,
      translateY: [
        { value: -6, duration: 1000 },
        { value: 0, duration: 1000 }
      ],
      easing: 'easeInOutSine',
      loop: true,
      direction: 'alternate'
    });
  }, []);

  const message = encodeURIComponent([
    "Hola Inox Rossel",
    "",
    "Estoy interesado en solicitar una cotización para un trabajo en metal o madera.",
    "",
    "¿Podrían brindarme más información sobre:",
    "• Tipos de trabajos realizados",
    "• Tiempos estimados de entrega",
    "• Disponibilidad para visitas o consultas?",
    "",
    "¡Gracias de antemano!"
  ].join("\n"));

  const whatsappUrl = `https://wa.me/59170416434?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      ref={buttonRef}
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition-all hover:scale-110 flex items-center group"
      aria-label="Solicitar cotización por WhatsApp"
    >
      {/* Icono WhatsApp */}
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12.051 2C6.49 2 2 6.49 2 12.05c0 2.1.55 4.147 1.592 5.95l-1.602 5.997 6.103-1.594a9.892 9.892 0 004.958 1.297c5.561 0 10.051-4.49 10.051-10.051C22.101 6.49 17.611 2 12.051 2zm0 18.1a8.046 8.046 0 01-4.077-1.137l-.292-.183-3.493.913.932-3.405-.219-.349A8.065 8.065 0 014.001 12.05c0-4.43 3.62-8.05 8.05-8.05 4.43 0 8.05 3.62 8.05 8.05s-3.62 8.05-8.05 8.05z" />
      </svg>

      {/* Tooltip */}
      <span className="absolute right-full mr-3 bg-white text-gray-800 px-4 py-2 rounded-lg shadow-md text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        Solicitar cotización
      </span>
    </a>
  );
}

export default WhatsAppButton;
