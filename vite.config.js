import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

// viteSingleFile empaqueta todo (JS + CSS) en un solo index.html,
// útil para compartir el prototipo como un único archivo.
export default defineConfig({
  base: './', // rutas relativas: funciona en GitHub Pages bajo /nombre-del-repo/
  plugins: [react(), viteSingleFile()],
})
