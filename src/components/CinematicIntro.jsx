import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function CinematicIntro({ onComplete }) {
  const [stage, setStage] = useState('zoom') // zoom -> logo -> reveal

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage('logo'), 800),
      setTimeout(() => setStage('reveal'), 2200),
      setTimeout(() => onComplete && onComplete(), 3000),
    ]
    return () => timers.forEach(clearTimeout)
  }, [onComplete])

  return (
    <AnimatePresence>
      {stage !== 'complete' && (
        <motion.div
          className="fixed inset-0 z-[200] bg-gradient-to-br from-slate-950 via-violet-950 to-slate-900 flex items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Camera zoom background */}
          <motion.div
            className="absolute inset-0 bg-grid opacity-20"
            initial={{ scale: 3, opacity: 0 }}
            animate={{ scale: stage === 'zoom' ? 1 : 0.8, opacity: stage === 'zoom' ? 0.3 : 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />

          {/* Ambient glow */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.6, 0] }}
            transition={{ duration: 2, repeat: 1 }}
          >
            <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-violet-500/30 blur-[120px]" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-fuchsia-500/30 blur-[120px]" />
          </motion.div>

          {/* Logo/Name reveal */}
          <motion.div
            className="relative z-10 text-center"
            initial={{ scale: 0, filter: 'blur(20px)', opacity: 0 }}
            animate={{
              scale: stage === 'logo' || stage === 'reveal' ? 1 : 0,
              filter: stage === 'logo' || stage === 'reveal' ? 'blur(0px)' : 'blur(20px)',
              opacity: stage === 'logo' || stage === 'reveal' ? 1 : 0,
            }}
            transition={{ duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] }}
          >
            <motion.h1
              className="text-6xl md:text-8xl font-extrabold tracking-wider"
              style={{
                background: 'linear-gradient(120deg, #6366f1, #ec4899, #06b6d4, #a855f7)',
                backgroundSize: '200% 200%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              IRFAN ANSARI
            </motion.h1>
            <motion.div
              className="mt-4 text-xl text-slate-300 tracking-widest"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: stage === 'reveal' ? 1 : 0, y: stage === 'reveal' ? 0 : 20 }}
              transition={{ delay: 0.3 }}
            >
              PORTFOLIO
            </motion.div>
          </motion.div>

          {/* Energy streaks */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-violet-400 to-transparent"
              style={{
                width: '100%',
                top: `${20 + i * 15}%`,
                left: 0,
              }}
              initial={{ x: '-100%', opacity: 0 }}
              animate={{
                x: stage === 'logo' ? '100%' : '-100%',
                opacity: stage === 'logo' ? [0, 1, 0] : 0,
              }}
              transition={{ duration: 1.2, delay: i * 0.1 }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
