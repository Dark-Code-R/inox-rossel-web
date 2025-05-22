// src/services/uploadImage.js
import { cloudName, uploadPreset } from './cloudinaryService';

/**
 * Sube una imagen a Cloudinary y devuelve la URL segura
 * @param {File} file - El archivo de imagen a subir
 * @returns {Promise<string>} - URL segura de la imagen subida
 */
export async function uploadImage(file) {
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Error al subir imagen: ${response.statusText}`);
    }

    const data = await response.json();
    return data.secure_url; // esta es la URL de tu imagen subida
  } catch (error) {
    console.error('Error al subir la imagen:', error);
    throw error;
  }
}

/**
 * Sube múltiples imágenes a Cloudinary
 * @param {File[]} files - Array de archivos a subir
 * @returns {Promise<string[]>} - Array de URLs de las imágenes subidas
 */
export async function uploadMultipleImages(files) {
  const uploadPromises = Array.from(files).map(file => uploadImage(file));
  return Promise.all(uploadPromises);
}