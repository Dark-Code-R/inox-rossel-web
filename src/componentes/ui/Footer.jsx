import React from 'react';
import { Wrench } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full py-8 bg-white text-gray-600 border-t border-gray-300 animate-fade-in">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        <a href="/" className="flex items-center space-x-2">
          <Wrench className="h-6 w-6 text-black" />
          <span className="font-bold text-lg">Inox Rossel</span>
        </a>
        <p className="mt-4 md:mt-0 text-gray-500">© 2025 Inox Rossel. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
