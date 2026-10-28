import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  CheckCircle2,
  LoaderCircle,
  MessageSquareQuote,
  Quote,
  Send,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../../../../firebaseConfig";

export default function TestimonialsSection() {
  const [testimonios, setTestimonios] = useState([]);
  const [nuevoComentario, setNuevoComentario] = useState("");
  const [usuarioGoogle, setUsuarioGoogle] = useState(null);
  const [isGuest, setIsGuest] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [sending, setSending] = useState(false);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    let active = true;
    // Firestore can retry indefinitely offline; keep the rest of the section usable.
    const loadingTimeout = window.setTimeout(() => {
      if (active) {
        setLoadError(true);
        setLoading(false);
      }
    }, 8000);
    getDocs(query(collection(db, "testimonios"), orderBy("fecha", "desc")))
      .then((snapshot) => {
        if (active) {
          setTestimonios(
            snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })),
          );
          setLoadError(false);
        }
      })
      .catch((error) => {
        if (active) setLoadError(true);
        console.warn("No se pudieron cargar los testimonios:", error);
      })
      .finally(() => {
        window.clearTimeout(loadingTimeout);
        if (active) setLoading(false);
      });
    return () => {
      active = false;
      window.clearTimeout(loadingTimeout);
    };
  }, []);

  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        setUsuarioGoogle(
          user?.providerData.some(
            (provider) => provider.providerId === "google.com",
          )
            ? user
            : null,
        );
        setIsGuest(!user && localStorage.getItem("userRole") === "guest");
      }),
    [],
  );

  const enviarTestimonio = async (event) => {
    event.preventDefault();
    if (!nuevoComentario.trim() || !usuarioGoogle || sending) return;
    setSending(true);
    setFeedback("");
    try {
      await addDoc(collection(db, "testimonios"), {
        nombre: usuarioGoogle.displayName,
        texto: nuevoComentario.trim(),
        fecha: new Date(),
      });
      setNuevoComentario("");
      setFeedback("success");
      const snapshot = await getDocs(
        query(collection(db, "testimonios"), orderBy("fecha", "desc")),
      );
      setTestimonios(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })),
      );
      setLoadError(false);
    } catch (error) {
      setFeedback("error");
      console.error("Error al enviar testimonio:", error);
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      className="testimonials-section section-space"
      aria-labelledby="testimonials-title"
    >
      <div className="site-container">
        <div className="section-heading">
          <div>
            <span className="eyebrow">04 / LA MEJOR CARTA DE PRESENTACIÓN</span>
            <h2 id="testimonials-title">
              PIEZAS QUE HABLAN.
              <br />
              <span>CLIENTES TAMBIÉN.</span>
            </h2>
          </div>
          <p>
            Detrás de cada trabajo hay alguien que confió en nosotros. Este
            espacio es para sus experiencias.
          </p>
        </div>
        {loading ? (
          <div className="testimonials-loading" role="status">
            <LoaderCircle
              className="loading-spinner"
              size={20}
              aria-hidden="true"
            />{" "}
            Cargando experiencias de nuestros clientes...
          </div>
        ) : testimonios.length > 0 ? (
          <div className="testimonials-grid">
            {testimonios.map((testimonial) => (
              <figure className="testimonial-card" key={testimonial.id}>
                <Quote
                  size={30}
                  className="testimonial-quote"
                  aria-hidden="true"
                />
                <blockquote>{testimonial.texto}</blockquote>
                <figcaption>
                  <span className="testimonial-avatar" aria-hidden="true">
                    {(testimonial.nombre || "C").slice(0, 1).toUpperCase()}
                  </span>
                  <span>
                    {testimonial.nombre || "Cliente de Inox Rossel"}
                    <small>UNA EXPERIENCIA CON NUESTRO TALLER</small>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        ) : (
          <div className="testimonial-empty">
            <span className="empty-quote-icon">
              <MessageSquareQuote size={30} aria-hidden="true" />
            </span>
            <div>
              <h3>Tu experiencia también forma parte de nuestra historia.</h3>
              <p>
                {loadError
                  ? "Los comentarios no están disponibles en este momento. Si ya trabajamos juntos, nos encantará conocer tu opinión."
                  : "¿Ya creamos algo para ti? Cuéntanos cómo fue trabajar con nuestro taller."}
              </p>
            </div>
            <span className="empty-decoration" aria-hidden="true">
              “
            </span>
          </div>
        )}
        {usuarioGoogle ? (
          <form className="testimonial-form" onSubmit={enviarTestimonio}>
            <label htmlFor="testimonial-message">
              Hola, {usuarioGoogle.displayName}. ¿Cómo fue tu experiencia?
            </label>
            <textarea
              id="testimonial-message"
              value={nuevoComentario}
              onChange={(event) => setNuevoComentario(event.target.value)}
              rows={3}
              maxLength={2000}
              placeholder="Comparte tu experiencia con Inox Rossel..."
              required
            />
            <div aria-live="polite">
              {feedback === "success" && (
                <p className="form-status status-success">
                  <CheckCircle2 size={18} aria-hidden="true" /> ¡Gracias por
                  compartir tu experiencia!
                </p>
              )}
              {feedback === "error" && (
                <p className="form-status status-error">
                  No pudimos publicar tu comentario. Intenta de nuevo.
                </p>
              )}
            </div>
            <button
              className="site-button button-dark"
              type="submit"
              disabled={sending}
            >
              {sending ? "Publicando..." : "Compartir mi experiencia"}
              <Send size={17} aria-hidden="true" />
            </button>
          </form>
        ) : (
          <div className="testimonial-login">
            <span>
              {isGuest
                ? "Estás navegando como invitado. Comparte tu experiencia al iniciar sesión."
                : "¿Ya trabajamos juntos? Nos encantaría leerte."}
            </span>
            <Link className="text-link" to="/login">
              Inicia sesión para comentar{" "}
              <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
