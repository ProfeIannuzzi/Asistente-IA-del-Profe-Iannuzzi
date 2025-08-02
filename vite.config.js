import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 3000,
    host: true
  },
  preview: {
    port: 3000,
    host: true,
    allowedHosts: ['asistente-ia-del-profe-iannuzzi.onrender.com']
  }
});