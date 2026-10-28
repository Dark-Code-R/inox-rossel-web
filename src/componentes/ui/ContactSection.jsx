import { useState } from "react";
import {
  ArrowUpRight,
  CheckCircle2,
  LoaderCircle,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import emailjs from "emailjs-com";

const hasEmailService = Boolean(
  import.meta.env.VITE_EMAILJS_SERVICE_ID &&
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID &&
    import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
);

export default function ContactSection() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    celular: "",
    mensaje: "",
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    if (status) setStatus("");
  };

  const handleSendEmail = async (event) => {
    event.preventDefault();
    if (loading) return;
    if (!hasEmailService) {
      const message = [
        "Hola Inox Rossel, me gustaría cotizar un proyecto.",
        "",
        "Nombre: " + formData.nombre,
        "Correo: " + formData.email,
        "Celular: " + formData.celular,
        "",
        "Mi proyecto:",
        formData.mensaje,
      ].join("\n");
      window.open(
        "https://wa.me/59170416434?text=" + encodeURIComponent(message),
        "_blank",
        "noopener,noreferrer",
      );
      return;
    }
    setLoading(true);
    setStatus("");
    try {
      await emailjs.send(
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
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      );
      setStatus("success");
      setFormData({ nombre: "", email: "", celular: "", mensaje: "" });
    } catch (error) {
      setStatus("error");
      console.error("Error al enviar la cotización:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contacto"
      className="contact-section section-space"
      aria-labelledby="contact-title"
    >
      <div className="site-container contact-grid">
        <div className="contact-copy">
          <span className="eyebrow">05 / EMPECEMOS ALGO BUENO</span>
          <h2 id="contact-title">
            ESA IDEA MERECE
            <br />
            <span>HACERSE REALIDAD.</span>
          </h2>
          <p>
            Cuéntanos qué necesitas. Te ayudamos a encontrar los materiales, el
            diseño y la solución para tu proyecto.
          </p>
          <a
            className="site-button button-dark whatsapp-contact"
            href="https://wa.me/59170416434?text=Hola%20Inox%20Rossel%2C%20me%20gustar%C3%ADa%20cotizar%20un%20proyecto."
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle size={20} aria-hidden="true" /> Prefiero hablar por
            WhatsApp <ArrowUpRight size={18} aria-hidden="true" />
          </a>
          <div className="contact-details">
            <a href="tel:+59170416434">
              <span className="contact-detail-icon">
                <Phone size={19} aria-hidden="true" />
              </span>
              <span>
                <small>LLÁMANOS</small>+591 704 16434
              </span>
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
            <a href="mailto:rosselrochajhimyrodolfo@gmail.com">
              <span className="contact-detail-icon">
                <Mail size={19} aria-hidden="true" />
              </span>
              <span>
                <small>ESCRÍBENOS</small>rosselrochajhimyrodolfo@gmail.com
              </span>
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
            <div>
              <span className="contact-detail-icon">
                <MapPin size={19} aria-hidden="true" />
              </span>
              <span>
                <small>ESTAMOS EN</small>Oruro, Bolivia · Visitas con cita
                previa
              </span>
            </div>
          </div>
        </div>
        <form
          className="quote-form"
          onSubmit={handleSendEmail}
          aria-labelledby="quote-form-title"
        >
          <span className="form-kicker">TU PRÓXIMO PROYECTO EMPIEZA AQUÍ</span>
          <h3 id="quote-form-title">Hablemos de tu idea.</h3>
          <p>Déjanos tus datos y nos pondremos en contacto.</p>
          <div className="form-field">
            <label htmlFor="quote-name">Tu nombre</label>
            <input
              id="quote-name"
              name="nombre"
              autoComplete="name"
              placeholder="¿Cómo te llamas?"
              value={formData.nombre}
              onChange={handleChange}
              required
              maxLength={120}
            />
          </div>
          <div className="form-row">
            <div className="form-field">
              <label htmlFor="quote-email">Correo electrónico</label>
              <input
                id="quote-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="tu@correo.com"
                value={formData.email}
                onChange={handleChange}
                required
                maxLength={254}
              />
            </div>
            <div className="form-field">
              <label htmlFor="quote-phone">Celular</label>
              <input
                id="quote-phone"
                name="celular"
                type="tel"
                autoComplete="tel"
                placeholder="+591"
                value={formData.celular}
                onChange={handleChange}
                required
                maxLength={30}
              />
            </div>
          </div>
          <div className="form-field">
            <label htmlFor="quote-message">¿Qué te gustaría crear?</label>
            <textarea
              id="quote-message"
              name="mensaje"
              rows={4}
              placeholder="Cuéntanos tu idea, medidas o lo que tienes en mente..."
              value={formData.mensaje}
              onChange={handleChange}
              required
              maxLength={5000}
            />
          </div>
          <div aria-live="polite" aria-atomic="true">
            {status === "success" && (
              <p className="form-status status-success">
                <CheckCircle2 size={19} aria-hidden="true" /> ¡Recibimos tu
                solicitud! Gracias por confiar en Inox Rossel.
              </p>
            )}
            {status === "error" && (
              <p className="form-status status-error" role="alert">
                No pudimos enviar tu solicitud. Intenta nuevamente o contáctanos
                por WhatsApp.
              </p>
            )}
          </div>
          <button
            type="submit"
            className="site-button button-primary form-submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <LoaderCircle
                  className="loading-spinner"
                  size={19}
                  aria-hidden="true"
                />{" "}
                Enviando solicitud...
              </>
            ) : (
              <>
                {hasEmailService ? "Solicitar cotización" : "Continuar en WhatsApp"}{" "}
                <ArrowUpRight size={20} aria-hidden="true" />
              </>
            )}
          </button>
          <span className="form-footnote">
            {hasEmailService
              ? "Sin compromiso. Con muchas ganas de crear contigo."
              : "Se abrirá WhatsApp con tu solicitud lista para enviar."}
          </span>
        </form>
      </div>
    </section>
  );
}
