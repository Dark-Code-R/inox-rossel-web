'use client';

import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';
import anime from 'animejs/lib/anime.es.js';

import Spline from '@splinetool/react-spline';
import { UserCircle2 } from 'lucide-react';
import './style/Login.css';

export default function Login() {
  const navigate = useNavigate();
  const ADMIN_EMAIL = "rodrigo.darkcode@gmail.com";
  const titleRef = useRef(null);
  const googleBtnRef = useRef(null);
  const guestBtnRef = useRef(null);

  useEffect(() => {
    // Animación principal del contenedor
    anime({
      targets: '.animate-login',
      opacity: [0, 1],
      translateY: [30, 0],
      duration: 1000,
      easing: 'easeOutExpo',
    });

    // Animación secuencial de elementos
    const timeline = anime.timeline({
      easing: 'easeOutExpo',
      delay: 300
    });

    // Animar título
    timeline.add({
      targets: titleRef.current,
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 800,
    })
    // Animar botón de Google
    .add({
      targets: googleBtnRef.current,
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 600,
    }, '-=400')
    // Animar botón de invitado
    .add({
      targets: guestBtnRef.current,
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 600,
    }, '-=400');

  }, []);

  // Iniciar sesión con Google
  const handleGoogleLogin = async () => {
    // Animación al hacer clic
    anime({
      targets: googleBtnRef.current,
      scale: [1, 0.95, 1],
      duration: 300,
      easing: 'easeInOutQuad'
    });

    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Guardar en Firestore si es nuevo
      const docRef = doc(db, "usuarios", user.uid);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        await setDoc(docRef, {
          uid: user.uid,
          email: user.email,
          nombre: user.displayName || "Usuario",
          fechaRegistro: new Date()
        });
      }

      // Animación de salida
      anime({
        targets: '.login-box',
        opacity: [1, 0],
        translateY: [0, -20],
        duration: 500,
        easing: 'easeOutQuad',
        complete: () => {
          // Asignar rol según email
          if (user.email === ADMIN_EMAIL) {
            localStorage.setItem("userRole", "admin");
            navigate('/admin');
          } else {
            localStorage.setItem("userRole", "user");
            navigate('/home');
          }
        }
      });
    } catch (error) {
      console.error("Error con Google:", error.message);
      
      // Animación de error
      anime({
        targets: googleBtnRef.current,
        translateX: [0, -10, 10, -10, 10, 0],
        duration: 500,
        easing: 'easeInOutQuad'
      });
      
      alert("No se pudo iniciar sesión con Google.");
    }
  };

  // Modo Invitado
  const handleGuestLogin = async () => {
    // Animación al hacer clic
    anime({
      targets: guestBtnRef.current,
      scale: [1, 0.95, 1],
      duration: 300,
      easing: 'easeInOutQuad'
    });

    try {
      await signOut(auth);
      
      // Animación de salida
      anime({
        targets: '.login-box',
        opacity: [1, 0],
        translateY: [0, -20],
        duration: 500,
        easing: 'easeOutQuad',
        complete: () => {
          localStorage.setItem("userRole", "guest");
          navigate('/home');
        }
      });
    } catch (error) {
      console.error("Error al ingresar como invitado:", error);
      
      // Animación de error
      anime({
        targets: guestBtnRef.current,
        translateX: [0, -10, 10, -10, 10, 0],
        duration: 500,
        easing: 'easeInOutQuad'
      });
    }
  };

  return (
    <div className="login-container">
      <div className="login-box animate-login">
        {/* Animación Spline */}
        <div className="w-full h-48 mb-6 overflow-hidden flex justify-center animate-fade-in-up">
          <Spline
            scene="https://prod.spline.design/i7cx4-oqO1ig1-MC/scene.splinecode"
            style={{
              width: "100%",
              height: "350px",
              transform: "scale(1) translateY(-28%)",
            }}
          />
        </div>

        <h2 className="login-title" ref={titleRef}>Bienvenido a Inox Rossel</h2>

        <div className="login-options">
          <p className="google-login-text">Inicia sesión para continuar</p>

          <div className="login-buttons">
            <button 
              ref={googleBtnRef}
              onClick={handleGoogleLogin} 
              className="btn-google"
            >
              <img
                src="https://img.icons8.com/color/24/google-logo.png"
                alt="Google"
                className="mr-2"
              />
              Iniciar con Google
            </button>

            <button 
              ref={guestBtnRef}
              onClick={handleGuestLogin} 
              className="btn-guest"
            >
              <UserCircle2 size={20} className="mr-2" />
              Entrar como Invitado
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}