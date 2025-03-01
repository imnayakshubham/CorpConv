import { defineConfig } from 'vite'
import path from "path"
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'prompt',
      // includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: "Hushwork - Stay Connected with Your Network Anonymously",
        short_name: "Hushwork",
        description: "Connect and collaborate anonymously with Hushwork. Share ideas, gather feedback, post jobs, and conduct surveys securely within your   network. Redefine workplace communication with privacy-first tools designed to empower communication",
        theme_color: '#171717',
        background_color: '#f0e7db',
        display: "standalone",
        scope: '/',
        start_url: "/",
        orientation: 'portrait',
        icons: [
          {
            src: '/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/maskable_icon.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
      },
      devOptions: {
        enabled: true,
      },
    }),
  ],
  server: {
    port: 3001,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      '@components': '/src/components',
    },
  },
});
