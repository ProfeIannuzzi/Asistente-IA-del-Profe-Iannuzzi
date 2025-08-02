import { defineConfig } from 'vite';

export default defineConfig({
  preview: {
    port: 3000,
    host: true,
    strictPort: true,
    allowedHosts: ["asistente-ia-del-profe-iannuzzi.onrender.com"]
  }
});