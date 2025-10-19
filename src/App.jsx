import React, { useState, useEffect, lazy, Suspense } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import BackToTop from './components/BackToTop'
import CinematicIntro from './components/CinematicIntro'
import MagneticCursor from './components/MagneticCursor'
import Hero from './sections/Hero'

// Lazy load animation components for better performance
const EnergyStreaks = lazy(() => import('./components/EnergyStreaks'))
const GradientWaves = lazy(() => import('./components/GradientWaves'))
const FloatingShapes = lazy(() => import('./components/FloatingShapes'))

// Lazy load sections for code splitting
const About = lazy(() => import('./sections/About'))
const Skills = lazy(() => import('./sections/Skills'))
const Projects = lazy(() => import('./sections/Projects'))
const Experience = lazy(() => import('./sections/Experience'))
const Education = lazy(() => import('./sections/Education'))
const Certifications = lazy(() => import('./sections/Certifications'))
const Blog = lazy(() => import('./sections/Blog'))
const Achievements = lazy(() => import('./sections/Achievements'))
const OpenSource = lazy(() => import('./sections/OpenSource'))
const TechTimeline = lazy(() => import('./sections/TechTimeline'))
const Contact = lazy(() => import('./sections/Contact'))

// Loading fallback component
const SectionLoader = () => (
  <div className="flex items-center justify-center py-20">
    <div className="relative w-16 h-16">
      <div className="absolute inset-0 border-4 border-violet-200 dark:border-violet-900 rounded-full"></div>
      <div className="absolute inset-0 border-4 border-violet-600 dark:border-violet-400 rounded-full border-t-transparent animate-spin"></div>
    </div>
  </div>
)

function App() {
  const [showIntro, setShowIntro] = useState(true)
  const [contentVisible, setContentVisible] = useState(false)

  useEffect(() => {
    // Show content after cinematic intro
    const timer = setTimeout(() => {
      setContentVisible(true)
    }, 3200)
    return () => clearTimeout(timer)
  }, [])

  // Preload critical sections after initial load
  useEffect(() => {
    if (contentVisible) {
      // Preload above-the-fold sections
      const timer = setTimeout(() => {
        import('./sections/About')
        import('./sections/Skills')
        import('./sections/Projects')
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [contentVisible])

  return (
    <div className="min-h-screen bg-gradient-glow relative overflow-x-hidden">
      {/* Ultra dynamic animation layers */}
      {showIntro && <CinematicIntro onComplete={() => setShowIntro(false)} />}
      <MagneticCursor />
      
      {/* Lazy load animation layers */}
      <Suspense fallback={null}>
        <EnergyStreaks />
        <GradientWaves />
        <FloatingShapes />
      </Suspense>
      
      {/* subtle grid background */}
      <div className="pointer-events-none fixed inset-0 opacity-[0.06] bg-grid" />
      
      <div className={`transition-opacity duration-1000 ${contentVisible ? 'opacity-100' : 'opacity-0'}`}>
        <Navbar />
        <main>
          {/* Hero is always loaded (above the fold) */}
          <Hero />
          
          {/* Lazy load remaining sections */}
          <Suspense fallback={<SectionLoader />}>
            <About />
            <Skills />
            <Projects />
            <Experience />
            <Education />
            <Certifications />
            <Blog />
            <Achievements />
            <OpenSource />
            <TechTimeline />
            <Contact />
          </Suspense>
        </main>
        <Footer />
        <BackToTop />
      </div>
    </div>
  )
}

export default App
