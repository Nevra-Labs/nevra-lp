import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { readdirSync } from 'node:fs'
import { resolve } from 'node:path'

// One HTML entry per shareable route, not one for the whole SPA. Link previews
// are read by crawlers that never run JavaScript, so a route that needs its own
// title, url or image needs its own document; Vercel rewrites onto them. Every
// document loads the same bundle and hands off to the router.
const articleEntries = Object.fromEntries(
  readdirSync(resolve(import.meta.dirname, 'blog'))
    .filter(f => f.endsWith('.html'))
    .map(f => [`blog/${f.replace(/\.html$/, '')}`, resolve(import.meta.dirname, 'blog', f)])
)

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        roadmap: resolve(import.meta.dirname, 'roadmap.html'),
        ...articleEntries,
      },
    },
  },
})
