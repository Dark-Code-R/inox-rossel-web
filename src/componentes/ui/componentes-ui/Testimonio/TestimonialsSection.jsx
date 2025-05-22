// componentes/ui/TestimonialsSection.jsx
import React, { useEffect, useState, useRef } from 'react';
import { db, auth } from '../../../../firebaseConfig';
import { collection, addDoc, getDocs, query, orderBy } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import anime from 'animejs/lib/anime.es.js';

function TestimonialCard({ nombre, texto, index }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const el = cardRef.current;

    anime({
      targets: el,
      translateY: [50, 0],
      opacity: [0, 1],
      scale: [0.9, 1],
      easing: 'easeOutElastic(1, .8)',
      duration: 800,
      delay: index * 150,
    });

    const bounceLoop = () => {
      anime({
        targets: el,
        translateY: [0, -8, 0],
        duration: 2500,
        easing: 'easeInOutQuad',
        complete: bounceLoop,
      });
    };

    bounceLoop();

    const handleMouseEnter = () => {
      anime({
        targets: el,
        scale: 1.05,
        duration: 300,
        easing: 'easeOutQuad',
      });
    };

    const handleMouseLeave = () => {
      anime({
        targets: el,
        scale: 1,
        duration: 300,
        easing: 'easeOutQuad',
      });
    };

    el.addEventListener('mouseenter', handleMouseEnter);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mouseenter', handleMouseEnter);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="bg-white p-6 rounded-lg shadow-md border border-gray-200 transition duration-300"
      style={{ opacity: 0 }}
    >
      <p className="text-gray-700 italic mb-4">"{texto}"</p>
      <div className="text-right font-semibold text-black">— {nombre}</div>
    </div>
  );
}

export default function TestimonialsSection() {
  const [testimonios, setTestimonios] = useState([]);
  const [nuevoComentario, setNuevoComentario] = useState('');
  const [usuarioGoogle, setUsuarioGoogle] = useState(null);
  const [isGuest, setIsGuest] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const obtenerTestimonios = async () => {
      const testimoniosRef = collection(db, 'testimonios');
      const q = query(testimoniosRef, orderBy('fecha', 'desc'));
      const querySnapshot = await getDocs(q);
      const docs = querySnapshot.docs.map(doc => doc.data());
      setTestimonios(docs);
    };

    obtenerTestimonios();

    anime({
      targets: '.testimonials-title',
      opacity: [0, 1],
      translateY: [30, 0],
      easing: 'easeOutExpo',
      duration: 1000,
      delay: 300,
    });
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.providerData[0]?.providerId === 'google.com') {
        setUsuarioGoogle(user);
        setIsGuest(false);
      } else {
        setUsuarioGoogle(null);
        const userRole = localStorage.getItem('userRole');
        setIsGuest(userRole === 'guest');
      }
    });

    return () => unsubscribe();
  }, []);

  const enviarTestimonio = async (e) => {
    e.preventDefault();
    if (!nuevoComentario.trim()) return;

    try {
      await addDoc(collection(db, 'testimonios'), {
        nombre: usuarioGoogle.displayName,
        texto: nuevoComentario,
        fecha: new Date(),
      });
      setNuevoComentario('');

      const testimoniosRef = collection(db, 'testimonios');
      const q = query(testimoniosRef, orderBy('fecha', 'desc'));
      const querySnapshot = await getDocs(q);
      const docs = querySnapshot.docs.map(doc => doc.data());
      setTestimonios(docs);
    } catch (error) {
      console.error("Error al enviar testimonio:", error);
    }
  };

  return (
    <section ref={sectionRef} className="w-full py-16 bg-gray-100 text-black animate-fade-in">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="testimonials-title text-2xl md:text-3xl font-bold text-center mb-8" style={{ opacity: 0 }}>
          Lo que dicen los clientes
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {testimonios.map((t, i) => (
            <TestimonialCard key={i} index={i} nombre={t.nombre} texto={t.texto} />
          ))}
        </div>

        {usuarioGoogle && (
          <form onSubmit={enviarTestimonio} className="max-w-lg mx-auto mt-8">
            <textarea
              value={nuevoComentario}
              onChange={(e) => setNuevoComentario(e.target.value)}
              className="w-full p-4 border rounded-md resize-none focus:ring-2 focus:ring-[#FFD166] focus:border-transparent transition duration-300"
              rows="4"
              placeholder="Escribe tu testimonio aquí..."
            />
            <button
              type="submit"
              className="mt-4 w-full bg-[#FFD166] text-[#123347] font-semibold py-3 rounded-full hover:brightness-110 transition-all duration-300"
            >
              Enviar Testimonio
            </button>
          </form>
        )}

        {!usuarioGoogle && isGuest && (
          <div className="animate-slide-bounce text-center mt-8 p-4 bg-white rounded-lg shadow-md max-w-lg mx-auto border-l-4 border-[#FFD166]">
            <p className="text-gray-700">
              Estás navegando como invitado. Para dejar un comentario,
              <a href="/" className="text-blue-600 hover:underline ml-1">inicia sesión con Google</a>.
            </p>
          </div>
        )}

        {!usuarioGoogle && !isGuest && (
          <p className="text-center text-gray-500 mt-8 animate-slide-bounce">Inicia sesión con Google para dejar un comentario ✨</p>
        )}
      </div>

      <style jsx="true">{`
        @keyframes slideBounce {
          0% { opacity: 0; transform: translateY(40px); }
          50% { opacity: 1; transform: translateY(-5px); }
          100% { transform: translateY(0); }
        }

        .animate-slide-bounce {
          animation: slideBounce 1.2s ease-out;
        }
      `}</style>
    </section>
  );
}
