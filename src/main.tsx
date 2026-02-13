import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

const rootElement = document.getElementById('root')!

// Detect pre-rendered HTML: if the root has real content, hydrate; otherwise create fresh.
const hasSSRContent =
  rootElement.childNodes.length > 0 &&
  rootElement.innerHTML.trim() !== '' &&
  rootElement.innerHTML.trim() !== '<!--ssr-outlet-->'

if (hasSSRContent) {
  // Production: pre-rendered HTML exists — hydrate to preserve SSR content
  ReactDOM.hydrateRoot(
    rootElement,
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
} else {
  // Development: empty root — do a full client render
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
}

// Signal readiness (used by legacy prerender, safe to keep)
document.dispatchEvent(new Event('render-event'))
