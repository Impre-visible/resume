import { defineConfig } from 'vite'

import react from '@vitejs/plugin-react'

import generouted from '@generouted/react-router/plugin'

import path from "path"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  plugins: [react(), generouted(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: '0.0.0.0',
  },
})