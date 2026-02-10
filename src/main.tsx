import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

const app = ReactDOM.createRoot(document.getElementById('root')!)
app.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// Signal to vite-plugin-prerender that the page is ready to be captured
document.dispatchEvent(new Event('render-event'))
