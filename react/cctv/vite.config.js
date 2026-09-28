import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
    server: {
    proxy: {
      "/api/nominatim": {
        target: "https://nominatim.openstreetmap.org",
        changeOrigin: true,

        rewrite: (path) =>
          path.replace(/^\/api\/nominatim/, ""),

        headers: {
          "User-Agent": "MyReactApp/1.0",
        },
      },
    },
  },
})
