import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path, { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  css: {
    devSourcemap: true,
  },
  build: {
    target: 'esnext',
    outDir: 'dist',
  },
  rollupOptions: {
    input: {
      main: resolve(__dirname, 'index.html'),
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    },
  },
  logLevel: 'info',
});
