import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

// Two HTML entries, not one. Link previews are read by crawlers that never
// run JavaScript, so a route that needs its own og:image needs its own HTML
// document; Vercel rewrites /roadmap onto roadmap.html. Both documents load
// the same bundle and hand off to the router.
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        roadmap: resolve(import.meta.dirname, 'roadmap.html'),
      },
    },
  },
})
