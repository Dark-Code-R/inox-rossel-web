  import React, { useState, useEffect, useRef } from 'react';
  import { Mail, MapPin } from 'lucide-react';
  import emailjs from 'emailjs-com';
  import { Button } from './componentes-ui/Button';
  import { Input } from './componentes-ui/Input';
  import anime from 'animejs/lib/anime.es.js';

  function ContactInfo({ icon, text, index }) {
    const ref = useRef(null);

    useEffect(() => {
      const el = ref.current;
      anime({
        targets: el,
        translateY: [50, 0],
        opacity: [0, 1],
        easing: 'easeOutElastic(1, .8)',
        duration: 1000,
        delay: index * 150,
      });

      const pulse = () => {
        anime({
          targets: el,
          scale: [1, 1.05, 1],
          duration: 2500,
          easing: 'easeInOutQuad',
          complete: pulse
        });
      };

      pulse();
    }, [index]);

    return (
      <div ref={ref} className="flex items-center gap-3 text-gray-700 bg-white p-3 rounded-lg shadow-md w-full max-w-xs lg:max-w-none mx-auto">
        <div className="text-black">{icon}</div>
        <span className="break-words">{text}</span>
      </div>
    );
  }

  export default function ContactSection() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [formData, setFormData] = useState({
      nombre: '',
      email: '',
      celular: '',
      mensaje: '',
    });
    const sectionRef = useRef(null);

    useEffect(() => {
      anime({
        targets: sectionRef.current,
        opacity: [0, 1],
        translateY: [30, 0],
        easing: 'easeOutExpo',
        duration: 1000,
      });
    }, []);

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSendEmail = (e) => {
      e.preventDefault();
      if (!formData.nombre || !formData.email || !formData.celular || !formData.mensaje) {
        alert("Por favor, completa todos los campos.");
        return;
      }

      setLoading(true);
      setSuccess(false);
      setError(false);

      emailjs
        .send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
          {
            from_name: formData.nombre,
            from_email: formData.email,
            celular: formData.celular,
            message: formData.mensaje,
            to_name: "Rodolfo Rossel",
            to_email: "info@metalmasterpro.com",
          },
          import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        )

        .then(() => {
          setSuccess(true);
          setFormData({ nombre: "", email: "", celular: "", mensaje: "" });
        })
        .catch((error) => {
          setError(true);
          console.error(error);
        })
        .finally(() => setLoading(false));
    };

    return (
      <section ref={sectionRef} id="contacto" className="w-full py-16 bg-gray-100 text-black">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Solicitar Cotización
          </h2>

          {success && (
            <div className="max-w-lg mx-auto mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
              <span className="block sm:inline">Cotización enviada correctamente. ¡Gracias por contactarnos!</span>
            </div>
          )}
          {error && (
            <div className="max-w-lg mx-auto mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              <span className="block sm:inline">Error al enviar la cotización. Por favor intenta nuevamente.</span>
            </div>
          )}

          <form
            onSubmit={handleSendEmail}
            className="space-y-6 max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md"
          >
            <div className="relative">
              <Input
                name="nombre"
                placeholder="Tu Nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </div>
            <div className="relative">
              <Input
                name="email"
                type="email"
                placeholder="Correo Electrónico"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="relative">
              <Input
                name="celular"
                type="tel"
                placeholder="Número de Celular"
                value={formData.celular}
                onChange={handleChange}
                required
              />
            </div>
            <textarea
              name="mensaje"
              placeholder="Describe el proyecto o servicio que necesitas"
              value={formData.mensaje}
              onChange={handleChange}
              className="w-full p-4 border border-gray-300 rounded-lg text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FFD166] focus:border-transparent h-32"
              required
            />
            <Button
              type="submit"
              className="w-full bg-black text-white hover:bg-gray-800 h-12 font-semibold"
              disabled={loading}
            >
              {loading ? "Enviando..." : "Enviar Cotización"}
            </Button>
          </form>

          <div className="mt-10 max-w-lg mx-auto space-y-6">
            <ContactInfo icon={<Mail />} text="rosselrochajhimyrodolfo@gmail.com" index={0} />
            <ContactInfo icon={<MapPin />} text="Oruro, Bolivia - Agendas personalizadas" index={1} />
          </div>
        </div>
      </section>
    );
  }