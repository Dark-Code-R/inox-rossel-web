import React, { useEffect, useState } from 'react';
import { db } from '../../../../firebaseConfig';
import { collection, query, where, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';


export default function UserTestimonialsManager({ userId, onTestimonialUpdated }) {
  const [userTestimonials, setUserTestimonials] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);
  const [testimonialToDelete, setTestimonialToDelete] = useState(null);

// Componente de notificación
const Notification = ({ message, type }) => {
  const bgColor = type === "success" ? "bg-green-100 border-green-500" : "bg-red-100 border-red-500";
  const textColor = type === "success" ? "text-green-700" : "text-red-700";
  
  return (
    <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg border-l-4 ${bgColor} animate-fade-in-down z-50`}>
      <div className="flex items-center">
        <div className={`mr-3 ${textColor}`}>
          {type === "success" ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          )}
        </div>
        <p className={`font-medium ${textColor}`}>{message}</p>
      </div>
    </div>
  );
};

// Componente de modal de confirmación
const ModalConfirmacion = ({ onConfirm, onCancel }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm text-center">
      <h2 className="text-lg font-bold mb-4">¿Eliminar testimonio?</h2>
      <p className="text-gray-600 mb-6">Esta acción no se puede deshacer.</p>
      <div className="flex justify-center gap-4">
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
        >
          Cancelar
        </button>
        <button
          onClick={onConfirm}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Eliminar
        </button>
      </div>
    </div>
  </div>
);
 // Cargar los testimonios del usuario actual
  useEffect(() => {
    const loadUserTestimonials = async () => {
      if (!userId) return;

      setIsLoading(true);
      try {
        const q = query(
          collection(db, "testimonios"),
          where("userId", "==", userId)
        );

        const querySnapshot = await getDocs(q);
        const testimonials = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setUserTestimonials(testimonials);
        setError(null);
      } catch (err) {
        console.error("Error al cargar testimonios del usuario:", err);
        setError(
          "No se pudieron cargar tus testimonios. Inténtalo de nuevo más tarde."
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadUserTestimonials();
  }, [userId]);

  // Mostrar notificación temporal
  const showNotification = (message, type = "success") => {
    setNotification({ message, type });

    // Ocultar la notificación después de 3 segundos
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  // Iniciar edición de un testimonio
  const handleEdit = (testimonial) => {
    setEditingId(testimonial.id);
    setEditText(testimonial.texto);
  };

  // Cancelar edición
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  // Guardar cambios de edición
  const handleSaveEdit = async (id) => {
    if (!editText.trim()) return;

    try {
      const testimonioRef = doc(db, "testimonios", id);
      await updateDoc(testimonioRef, {
        texto: editText.trim(),
      });

      // Actualizar la lista local
      setUserTestimonials((prev) =>
        prev.map((t) => (t.id === id ? { ...t, texto: editText.trim() } : t))
      );

      // Notificar al componente padre que hubo cambios
      if (onTestimonialUpdated) {
        onTestimonialUpdated();
      }

      setEditingId(null);
      setEditText("");

      // Mostrar notificación de éxito
      showNotification("¡Tu testimonio ha sido actualizado con éxito! ✨");
    } catch (err) {
      console.error("Error al actualizar testimonio:", err);
      setError("No se pudo actualizar el testimonio. Inténtalo de nuevo.");
      showNotification(
        "No se pudo actualizar el testimonio. Inténtalo de nuevo.",
        "error"
      );
    }
  };

  // Eliminar un testimonio
  const confirmDelete = (testimonialId) => {
    setTestimonialToDelete(testimonialId);
  };

  const handleDeleteConfirmed = async () => {
    const id = testimonialToDelete;
    if (!id) return;

    try {
      const testimonioRef = doc(db, "testimonios", id);
      await deleteDoc(testimonioRef);

      setUserTestimonials((prev) => prev.filter((t) => t.id !== id));

      if (onTestimonialUpdated) {
        onTestimonialUpdated();
      }

      showNotification("Testimonio eliminado correctamente 🗑️");
    } catch (err) {
      console.error("Error al eliminar testimonio:", err);
      setError("No se pudo eliminar el testimonio.");
      showNotification("Error al eliminar el testimonio.", "error");
    } finally {
      setTestimonialToDelete(null); // cerrar modal
    }
  };

  if (isLoading) {
    return <div className="text-center py-4">Cargando tus testimonios...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-4">{error}</div>;
  }

  if (userTestimonials.length === 0) {
    return (
      <div className="text-center text-gray-500 py-4">
        No has publicado ningún testimonio aún.
      </div>
    );
  }

  return (
    <div className="mt-8 mb-12 relative">
      {notification && (
        <Notification message={notification.message} type={notification.type} />
      )}

      {testimonialToDelete && (
        <ModalConfirmacion
          onConfirm={handleDeleteConfirmed}
          onCancel={() => setTestimonialToDelete(null)}
        />
      )}

      <h3 className="text-xl font-semibold mb-4 text-center">
        Tus testimonios
      </h3>
      <div className="space-y-4">
        {userTestimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-white p-4 rounded-lg shadow border border-gray-200 transition-all duration-300 hover:shadow-md"
          >
            {editingId === testimonial.id ? (
              <>
                <textarea
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="w-full p-3 border rounded-md resize-none mb-2 focus:ring-2 focus:ring-[#FFD166] focus:border-transparent outline-none"
                  rows="3"
                  autoFocus
                />
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={handleCancelEdit}
                    className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors duration-200"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => handleSaveEdit(testimonial.id)}
                    className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-200 flex items-center"
                  >
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    Guardar
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="text-gray-700 italic mb-2">
                  "{testimonial.texto}"
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {testimonial.fecha?.toDate
                      ? new Date(
                          testimonial.fecha.toDate()
                        ).toLocaleDateString()
                      : "Fecha no disponible"}
                  </span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(testimonial)}
                      className="px-3 py-1 bg-[#FFD166] text-[#123347] rounded-md hover:brightness-110 transition-all duration-200 flex items-center"
                    >
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        ></path>
                      </svg>
                      Editar
                    </button>
                    <button
                      onClick={() => confirmDelete(testimonial.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200 flex items-center"
                    >
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        ></path>
                      </svg>
                      Eliminar
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Animación CSS para las notificaciones */}
      <style jsx>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-down {
          animation: fadeInDown 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}