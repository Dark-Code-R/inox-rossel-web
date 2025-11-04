import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from "./Login/Login";
import HomePage from "./componentes/HomePage";
import UploadImage from "./componentes/UploadImage";
import ProjectsPage from "./componentes/Projects/ProjectsPage";
import ImageGallery from "./componentes/ImageGallery";
import Register from "./Login/Register";
import Admin from "./Login/Admin";
import WhatsAppButton from "./componentes/ui/componentes-ui/Contact/whatsapp-button";

// Componente para mostrar el botón de WhatsApp solo en ciertas rutas
function WhatsAppButtonWrapper() {
  const location = useLocation();
  const excludedRoutes = ["/login", "/register", "/admin"];
  const shouldShowButton = !excludedRoutes.includes(location.pathname);

  return shouldShowButton ? (
    <WhatsAppButton 
      phoneNumber="59170416434"
      message="Hola Rodolfo, vi tu página web y me interesa una cotización para:%0A%0A- Tipo de proyecto:%0A- Descripción:%0A- Plazo estimado:%0A%0AGracias!"
    />
  ) : null;
}

function AppRoutes() {
  return (
    <>
      <Routes>
        {/* Ahora el Home es la ruta principal */}
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/upload" element={<UploadImage />} />
        <Route path="/gallery" element={<ImageGallery />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Admin />} />

        {/* Redirección por defecto a Home si la ruta no existe */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <WhatsAppButtonWrapper />
    </>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
