import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

// https://vite.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        // Code-splitting and hashed filenames only apply to the client build.
        // The SSR build produces a single entry for Node.js.
        ...(!isSsrBuild
          ? {
              manualChunks: (id: string) => {
                if (id.includes('node_modules')) {
                  if (id.includes('react-dom') || id.includes('react/')) return 'vendor-react'
                  if (id.includes('react-router')) return 'vendor-router'
                  if (id.includes('framer-motion')) return 'vendor-framer'
                  if (id.includes('gsap')) return 'vendor-gsap'
                  if (id.includes('@supabase')) return 'vendor-supabase'
                  if (id.includes('lucide-react')) return 'vendor-icons'
                  return 'vendor-misc'
                }
              },
              chunkFileNames: 'assets/[name]-[hash].js',
              entryFileNames: 'assets/[name]-[hash].js',
              assetFileNames: 'assets/[name]-[hash][extname]',
            }
          : {}),
      },
    },
    chunkSizeWarningLimit: 400,
  },
  // SSR configuration — bundles browser-only packages so their module-level
  // code is processed by Vite (prevents bare require() of ESM packages in Node).
  ssr: {
    noExternal: [
      'framer-motion',
      '@studio-freight/lenis',
      'gsap',
      'lucide-react',
    ],
  },
}))
