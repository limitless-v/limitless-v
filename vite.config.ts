import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // relative path for seamless static file serving on Tor Onion / standard servers
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false
  }
});
