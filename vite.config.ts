import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
import Prerender from 'vite-plugin-prerender'
import Renderer from '@prerenderer/renderer-puppeteer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    Prerender({
      staticDir: path.join(__dirname, 'dist'),
      routes: [
        '/',
        '/diensten',
        '/projecten',
        '/over-ons',
        '/contact',
        '/catalogus',
        '/configurator',
        '/diensten/keuken-wrapping',
        '/diensten/keuken-frontjes',
        '/diensten/aanrechtbladen',
        '/diensten/achterwanden',
        '/diensten/kasten',
        '/diensten/deuren',
        '/diensten/kozijnen',
        '/diensten/schadeherstel',
      ],
      renderer: new Renderer({
        renderAfterDocumentEvent: 'custom-render-trigger',
        renderAfterTime: 5000, // Safe fallback
        headless: true,
      }),
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
