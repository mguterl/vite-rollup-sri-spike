import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { sri } from 'vite-plugin-sri3'
import importMapSRI from './rollup-import-map-sri'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    sri(),
  ],
  build: {
    rollupOptions: {
      plugins: [
        importMapSRI(),
      ],
    },
  },
})
