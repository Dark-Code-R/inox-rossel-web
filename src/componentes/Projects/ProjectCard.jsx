import React, { useState, useEffect } from "react";

export default function Modal({ onClose, title, description, imageUrl }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Cerrar modal al hacer clic fuera
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Cerrar modal con tecla Escape
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  }, [onClose]);

  // Prevenir scroll del body cuando el modal está abierto
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg p-6 max-w-lg mx-auto shadow-lg relative animate-fade-in-up overflow-auto max-h-[90vh]">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl font-bold"
          onClick={onClose}
        >
          &times;
        </button>
        
        {imageError ? (
          <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded-md mb-4">
            <span className="text-gray-500">Imagen no disponible</span>
          </div>
        ) : (
          <div className="relative w-full max-h-64 mb-4">
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-md">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-800"></div>
              </div>
            )}
            <img
              src={imageUrl}
              alt={title}
              className={`w-full h-auto max-h-64 object-contain rounded-md ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
          </div>
        )}
        
        <h3 className="text-2xl font-bold text-center mb-4">{title}</h3>
        <p className="text-gray-700 text-center">{description}</p>
      </div>
    </div>
  );
}