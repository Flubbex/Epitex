import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    base: '/Epitex/',
      server: {
    proxy: {
      '/tumblr-api': {
        target: 'https://api.tumblr.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/tumblr-api/, ''),
      }
    }
  }
})
