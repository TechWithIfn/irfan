import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    react(),
    // Bundle analyzer (only in build mode with ANALYZE=true)
    process.env.ANALYZE && visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
  ].filter(Boolean),
  
  build: {
    // Output directory
    outDir: 'dist',
    
    // Generate source maps for debugging (set to false for production)
    sourcemap: false,
    
    // Minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log in production
        drop_debugger: true,
      },
    },
    
    // Chunk size warnings
    chunkSizeWarningLimit: 1000,
    
    // Rollup options for optimization
    rollupOptions: {
      output: {
        // Manual chunk splitting for better caching
        manualChunks: {
          // Vendor chunks
          'react-vendor': ['react', 'react-dom'],
          'framer-motion': ['framer-motion'],
          'lucide-icons': ['lucide-react'],
          
          // Group sections
          'sections-main': [
            './src/sections/Hero.jsx',
            './src/sections/About.jsx',
            './src/sections/Skills.jsx',
          ],
          'sections-secondary': [
            './src/sections/Projects.jsx',
            './src/sections/Experience.jsx',
            './src/sections/Education.jsx',
          ],
          'sections-additional': [
            './src/sections/Certifications.jsx',
            './src/sections/Blog.jsx',
            './src/sections/Achievements.jsx',
            './src/sections/OpenSource.jsx',
            './src/sections/TechTimeline.jsx',
            './src/sections/Contact.jsx',
          ],
        },
        
        // File naming for better caching
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },
    
    // Enable CSS code splitting
    cssCodeSplit: true,
    
    // Asset inlining threshold (10kb)
    assetsInlineLimit: 10240,
  },
  
  // Preview server configuration
  preview: {
    port: 3000,
    strictPort: true,
  },
  
  // Development server configuration
  server: {
    port: 5173,
    strictPort: false,
    open: true,
  },
  
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion', 'lucide-react'],
  },
})
