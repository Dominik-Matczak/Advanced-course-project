import { defineConfig } from "vite";
import react from '@vitejs/plugin-react';
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    open: true,
  },
  test: {
    coverage: {
      reporter: ['cobertura', 'json', 'html']
    },
    environment: 'jsdom',
    globals: true,
    include: ['src/**/*.{spec,test}.{js,jsx}'],
    setupFiles: ['./setupTests.mjs']
  }
})