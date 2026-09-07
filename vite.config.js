import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

// One HTML entry per shareable route, not one for the whole SPA. Link previews
// are read by crawlers that never run JavaScript, so a route that needs its own
// title, url or image needs its own document; Vercel rewrites onto them. Every
// document loads the same bundle and hands off to the router.
//
// Listed by hand rather than read off the blog directory: config that touches
// the filesystem fails the whole build if the read ever throws, and this list
// changes once per article.
const r = p => resolve(import.meta.dirname, p)

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: r('index.html'),
        roadmap: r('roadmap.html'),
        'blog/your-bank-cannot-read-your-paycheck': r('blog/your-bank-cannot-read-your-paycheck.html'),
        'blog/why-crypto-never-solved-credit': r('blog/why-crypto-never-solved-credit.html'),
      },
    },
  },
})
