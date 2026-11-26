import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    base: '/Epitex/',
      server: {
        host: '0.0.0.0',
    proxy: {
      '/figlet':{
        target:"https://asciified.thelicato.io/api/v2",
        changeOrigin:true,
        rewrite: (path) => path.replace(/^\/figlet/, ''),
      },
      '/tumblr-api': {
        target: 'https://api.tumblr.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/tumblr-api/, ''),
      }
    }
  }
})
