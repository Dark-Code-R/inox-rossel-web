// src/services/cloudinaryService.js
import { v2 as cloudinary } from '@cloudinary/url-gen';

export const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
export const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
