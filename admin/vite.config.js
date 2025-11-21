import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
   css: {
    transformer: 'postcss' // force PostCSS instead of lightningcss
  },
  plugins: [react(), tailwindcss()],
  server: {port:5174},
  tailwindcss: {
    theme: {
      extend: {
        colors: {
          'primary': "#5f6fff",
        },
        gridTemplateColumns:{
          'auto': 'repeat(auto-fill, minmax(200px, 1fr))'
        }
      },
    },
  },
})
