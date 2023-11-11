import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  css: {
    devSourcemap: true,
  },
  build: {
    outDir: './webroot',
    target: 'esnext',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/'),
    },
  },
  logLevel: 'info',
});
