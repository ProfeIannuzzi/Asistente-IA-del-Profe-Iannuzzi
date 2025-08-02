
import { defineConfig } from 'vite';

export default defineConfig({
  root: '.', 
  server: {
    host: true,
    port: 3000
  },
  preview: {
    port: 3000,
    host: true,
    allowedHosts: ['asistente-ia-del-profe-iannuzzi.onrender.com']
  }
});
