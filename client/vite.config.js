import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 5173, // Puerto por defecto de Vite
    open: true, // Abre automáticamente en el navegador
  },
  build: {
    outDir: 'dist', // Carpeta de salida al construir para producción
  },
});