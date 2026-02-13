/**
 * SSR entry point — used by the prerender script to generate static HTML.
 *
 * For each route we:
 *   1. Reset the SEO collector
 *   2. Render the app with StaticRouter to an HTML string
 *   3. Return the rendered HTML + collected SEO metadata
 *
 * This file is built with `vite build --ssr` and executed by scripts/prerender.js.
 */
import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { AppContent } from './App'
import { startSSRCollection, getSSRSeoData } from './hooks/useSEO'
import type { SEOProps } from './hooks/useSEO'

export function render(url: string): { html: string; seoData: SEOProps | null } {
  // Reset the SEO collector before each render
  startSSRCollection()

  const html = renderToString(
    <React.StrictMode>
      <StaticRouter location={url}>
        <AppContent />
      </StaticRouter>
    </React.StrictMode>,
  )

  const seoData = getSSRSeoData()

  return { html, seoData }
}
