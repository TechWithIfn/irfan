import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function ParticleExplosion({ trigger = true, text = "IRFAN ANSARI", onComplete }) {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    if (!trigger) return
    const count = 50
    const newParticles = Array.from({ length: count }, (_, i) => ({
      id: i,
      angle: (Math.PI * 2 * i) / count,
      distance: 150 + Math.random() * 100,
      size: 4 + Math.random() * 8,
      duration: 0.8 + Math.random() * 0.4,
      delay: Math.random() * 0.2,
    }))
    setParticles(newParticles)
    
    if (onComplete) setTimeout(onComplete, 1500)
  }, [trigger, onComplete])

  if (!trigger) return null

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center">
      {/* Center text that explodes */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.2, 0], opacity: [0, 1, 0] }}
        transition={{ duration: 1.2, times: [0, 0.4, 1] }}
        className="absolute text-4xl md:text-6xl font-extrabold neon-text text-white"
      >
        {text}
      </motion.div>

      {/* Particles */}
      {particles.map((p) => {
        const x = Math.cos(p.angle) * p.distance
        const y = Math.sin(p.angle) * p.distance
        return (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              width: p.size,
              height: p.size,
              background: `radial-gradient(circle, rgba(99,102,241,0.9), rgba(236,72,153,0.6))`,
              boxShadow: '0 0 10px rgba(99,102,241,0.8)',
            }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{
              x,
              y,
              opacity: 0,
              scale: 0,
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              ease: 'easeOut',
            }}
          />
        )
      })}
    </div>
  )
}
