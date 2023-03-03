import { defineConfig } from 'vite';
import { ghPages } from 'vite-plugin-gh-pages';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/simple-dtrader-vite/',
  plugins: [ghPages(), react()],
});
