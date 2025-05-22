import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Login from "./Login/Login";
import HomePage from "./componentes/HomePage";
import UploadImage from "./componentes/UploadImage";
import ProjectsPage from "./componentes/Projects/ProjectsPage"; // Cambiado de ProjectsPage a Projects
import ImageGallery from "./componentes/ImageGallery";
import Register from "./Login/Register";
import Admin from "./Login/Admin"; // Página para admin
import WhatsAppButton from "./componentes/ui/componentes-ui/Contact/whatsapp-button";

// Componente para renderizar el botón de WhatsApp condicionalmente
function WhatsAppButtonWrapper() {
  const location = useLocation();
  
  // Lista de rutas donde NO queremos mostrar el botón de WhatsApp
  const excludedRoutes = ['/', '/login', '/register', '/admin'];
  
  // Verificar si la ruta actual está en la lista de exclusiones
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
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/upload" element={<UploadImage />} />
        <Route path="/gallery" element={<ImageGallery />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Admin />} />
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