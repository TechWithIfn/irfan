import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import { reportWebVitals, logPerformanceMetrics } from './utils/performanceMonitoring'

// Create root and render
const root = createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// Report Core Web Vitals
if (process.env.NODE_ENV === 'production') {
  // In production, send to analytics
  reportWebVitals((metric) => {
    // Replace with your analytics endpoint
    // console.log(metric);
  });
} else {
  // In development, log to console
  logPerformanceMetrics();
}

// Service Worker registration (optional - for PWA)
if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log('SW registered:', registration);
      })
      .catch((error) => {
        console.log('SW registration failed:', error);
      });
  });
}

