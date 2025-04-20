import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  server: {
    host: true,
    allowedHosts: ['large-chefs-jam.loca.lt']  // 👈 your localtunnel subdomain here
  }
})