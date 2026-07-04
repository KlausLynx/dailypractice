import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import flowbiteReact from "flowbite-react/plugin/vite";
import { visualizer } from "rollup-plugin-visualizer"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), visualizer({open: true}), tailwindcss(), flowbiteReact()],
  test: {
    globals: true,         // so you don't have to import describe/it/expect
    environment: 'jsdom',  // fake browser
    setupFiles: './src/setupTests.js',
  },
    build: {
      outDir: 'docs'  
    }
})