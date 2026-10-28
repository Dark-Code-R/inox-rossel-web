function WhatsAppButton() {
  const message = encodeURIComponent(
    [
      "Hola Inox Rossel",
      "",
      "Estoy interesado en solicitar una cotización para un trabajo en metal o madera.",
      "",
      "¿Podrían brindarme más información sobre:",
      "• Tipos de trabajos realizados",
      "• Tiempos estimados de entrega",
      "• Disponibilidad para visitas o consultas?",
      "",
      "¡Gracias de antemano!",
    ].join("\n"),
  );

  return (
    <a
      href={"https://wa.me/59170416434?text=" + message}
      target="_blank"
      rel="noopener noreferrer"
      className="floating-whatsapp fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full border-4 border-white bg-[#168e49] text-white shadow-lg transition duration-200 hover:-translate-y-1 hover:bg-[#11783c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-700 motion-reduce:transform-none motion-reduce:transition-none sm:bottom-7 sm:right-7"
      aria-label="Solicitar cotización por WhatsApp"
      title="Hablemos por WhatsApp"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        className="h-7 w-7"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12 2a10 10 0 0 0-8.65 15.02L2 22l5.12-1.34A10 10 0 1 0 12 2zm0 18.18a8.1 8.1 0 0 1-4.15-1.14l-.3-.18-3.04.8.82-2.98-.2-.31A8.18 8.18 0 1 1 12 20.18z" />
      </svg>
    </a>
  );
}

export default WhatsAppButton;
