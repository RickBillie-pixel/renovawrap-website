/**
 * SSR entry point — used by the prerender script to generate static HTML.
 *
 * For each route we:
 *   1. Preload the lazy page component for that route
 *   2. Reset the SEO collector
 *   3. Render the app with StaticRouter to an HTML string
 *   4. Return the rendered HTML + collected SEO metadata
 *
 * This file is built with `vite build --ssr` and executed by scripts/prerender.js.
 */
import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { AppContent, getPreloadForRoute } from './App'
import { startSSRCollection, getSSRSeoData } from './hooks/useSEO'
import type { SEOProps } from './hooks/useSEO'

export async function render(url: string): Promise<{ html: string; seoData: SEOProps | null }> {
  const preload = getPreloadForRoute(url)
  if (preload) {
    await preload()
  }

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
