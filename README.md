
# Inox Rossel Web

<div align="center">
  <img src="https://res.cloudinary.com/tu-cloud-name/image/upload/v1234567890/inox-rossel/logo-circular.png" alt="Inox Rossel Logo" width="150" style="border-radius: 50%;" />
  <h3>Metal y Madera Profesional</h3>
</div>

Sitio web profesional desarrollado para **Inox Rossel**, una empresa especializada en creaciones de metal mecánica y mobiliario en madera, con más de 20 años de experiencia en el mercado boliviano.

## 📸 Capturas de pantalla

<div align="center">
  <h3>Página de Login</h3>
  <img src="https://res.cloudinary.com/dyqcjrmmt/image/upload/v1747876562/Logo_x9fv3u.jpg" alt="Página de Login" width="600" />
  
  <h3>Sitio Web</h3>
  <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; margin-top: 20px;">
    <img src="https://res.cloudinary.com/dyqcjrmmt/image/upload/v1747876562/Inicio_uzzj8e.jpg" alt="Página Principal" width="400" />
    <img src="https://res.cloudinary.com/dyqcjrmmt/image/upload/v1747876562/servicios_wembi6.jpg" alt="Sección Servicion" width="400" />
    <img src="https://res.cloudinary.com/dyqcjrmmt/image/upload/v1747876562/destacados_wdzpzx.jpg" alt="Sección ProyectosS" width="400" />
    <img src="https://res.cloudinary.com/dyqcjrmmt/image/upload/v1747876562/testimonios_m136v4.jpg" alt="Testimonios" width="400" />
    <img src="https://res.cloudinary.com/dyqcjrmmt/image/upload/v1747876562/cotizar_r3tstk.jpg" alt="Contacto" width="400" />
  </div>
</div>

## 🚀 Tecnologías utilizadas

* **React.js + Vite**: Framework moderno para aplicaciones web.
* **Tailwind CSS**: Estilizado responsivo y altamente personalizable.
* **Firebase**: Autenticación con Google y base de datos (Firestore).
* **Cloudinary**: Almacenamiento optimizado de imágenes y videos.
* **EmailJS**: Envío de formularios de contacto sin backend.
* **Anime.js**: Animaciones suaves y profesionales.
* **Driver.js**: Guía interactiva para nuevos visitantes.

---

## 📝 Características principales

* 🌐 Catálogo visual de proyectos realizados (imágenes y videos).
* 💬 Sección de testimonios con animaciones y formularios.
* 📱 Interfaz totalmente **responsiva** para móviles y escritorio.
* ✉️ Formulario de cotización conectado a EmailJS.
* 📢 Botón flotante de WhatsApp para contacto rápido.
* 🌟 Animaciones personalizadas con `anime.js`.
* 🕵️ Guía interactiva con Driver.js para orientar a nuevos usuarios.

---

## ⚖️ Requisitos previos

* Node.js v18+
* npm o yarn
* Cuentas en:
  * Firebase
  * Cloudinary
  * EmailJS

---

## 📚 Instalación local

```bash
# Clonar el repositorio
git clone https://github.com/Dark-Code-R/inox-rossel-web.git

# Entrar a la carpeta del proyecto
cd inox-rossel-web

# Instalar dependencias
npm install

# Crear archivo .env con tus credenciales
cp .env.example .env

# Iniciar el servidor de desarrollo
npm run dev
```

---

## 🖼️ Configuración de Cloudinary

Este proyecto utiliza Cloudinary para almacenar y optimizar imágenes. Para configurar:

1. Crea una cuenta en [Cloudinary](https://cloudinary.com/users/register/free)
2. Obtén tus credenciales desde el Dashboard
3. Configura las variables en tu archivo `.env`:

```
VITE_CLOUDINARY_CLOUD_NAME=tu-cloud-name
VITE_CLOUDINARY_UPLOAD_PRESET=tu-preset
```

### Subir imágenes a Cloudinary y usar los enlaces en el README

1. **Sube tus imágenes** usando el Dashboard de Cloudinary o mediante su API
2. **Obtén el enlace** de la imagen subida (formato: `https://res.cloudinary.com/tu-cloud-name/image/upload/v1234567890/ruta/imagen.jpg`)
3. **Inserta el enlace** en tu README usando la sintaxis de Markdown:
   ```markdown
   ![Descripción](https://res.cloudinary.com/tu-cloud-name/image/upload/v1234567890/ruta/imagen.jpg)
   ```

---

## 📁 Estructura de carpetas destacadas

```bash
src/
├── assets/                  # Archivos estáticos (logos, imágenes, videos)
│   └── images/
│       └── logo.png
│       └── fondo-contacto.webp
│       └── proyectos/...
│
├── componentes/             # Componentes reutilizables
│   ├── UI/                  # Botones, inputs, cards reutilizables
│   │   └── Button.jsx
│   │   └── Input.jsx
│   │   └── TestimonialCard.jsx
│   │
│   ├── Layout/              # Estructura principal
│   │   └── Header.jsx
│   │   └── Footer.jsx
│   │   └── AboutModal.jsx
│   │
│   ├── Forms/               # Formularios
│   │   └── ContactForm.jsx (antes ContactSection.jsx)
│   │   └── UploadImage.jsx
│
├── screens/                 # Vistas principales o páginas
│   └── HomePage.jsx
│   └── Login/
│       └── Login.jsx
│       └── Register.jsx
│       └── Admin.jsx
│
├── Projects/                # Sección de proyectos destacados o galería
│   └── PortfolioSection.jsx
│   └── ImageGallery.jsx
│
├── hooks/                   # Hooks personalizados
│   └── useAnimation.js
│
├── services/                # Servicios externos
│   └── firebaseConfig.js
│   └── cloudinaryService.js
│   └── uploadImage.js
│
├── context/                 # Contextos globales (auth, temas)
│   └── AuthContext.jsx (opcional)
│
├── App.jsx
├── index.css
└── main.jsx

```

---

## 📅 Despliegue

Puedes subir el proyecto a:

* **Firebase Hosting**
  ```bash
  npm run build
  firebase deploy
  ```
* **Vercel**
  ```bash
  vercel --prod
  ```
* **Netlify**
  ```bash
  netlify deploy --prod
  ```

No olvides configurar correctamente las variables de entorno `.env` y nunca subir este archivo al repositorio.

---

## 🚨 Seguridad y buenas prácticas

* Variables sensibles como claves de Firebase, EmailJS o Cloudinary deben ir en un archivo **`.env`**.
* Asegúrate de tener esta línea en `.gitignore`:

  ```bash
  .env
  .env.local
  .env.development
  .env.production
  ```
* Utiliza reglas de seguridad adecuadas en Firebase
* Implementa validación de formularios tanto en cliente como en servidor

---

## 🎓 Autor

<div align="center">
  <img src="https://github.com/Dark-Code-R.png" alt="Carlos Rodrigo Condori Rossel" width="100" style="border-radius: 50%;" />
  <h3>Carlos Rodrigo Condori Rossel</h3>
  <a href="https://github.com/Dark-Code-R">
    <img src="https://img.shields.io/github/followers/Dark-Code-R?label=GitHub&style=social" alt="GitHub" />
  </a>
</div>

---

## 🚀 Contribuciones

Este es un proyecto personal y profesional. Se aceptan sugerencias o mejoras a través de issues o pull requests.

1. Haz un fork del proyecto
2. Crea una rama para tu característica (`git checkout -b feature/amazing-feature`)
3. Haz commit de tus cambios (`git commit -m 'Add some amazing feature'`)
4. Haz push a la rama (`git push origin feature/amazing-feature`)
5. Abre un Pull Request

---

## 🌐 Enlaces del proyecto

* [Repositorio GitHub](https://github.com/Dark-Code-R/inox-rossel-web)
* [Sitio web en vivo](https://inox-rossel.web.app) <!-- Reemplaza con tu URL real -->

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.
