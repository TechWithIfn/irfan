import React from 'react'
import { motion } from 'framer-motion'

export default function FloatingShapes() {
  const shapes = [
    { size: 80, top: '10%', left: '5%', duration: 25, color: 'bg-sky-500/10' },
    { size: 60, top: '70%', left: '85%', duration: 20, color: 'bg-fuchsia-500/10' },
    { size: 100, top: '40%', left: '70%', duration: 30, color: 'bg-violet-500/10' },
    { size: 50, top: '20%', left: '90%', duration: 22, color: 'bg-cyan-400/10' },
    { size: 70, top: '80%', left: '15%', duration: 28, color: 'bg-pink-500/10' },
  ]

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {shapes.map((shape, idx) => (
        <motion.div
          key={idx}
          className={`absolute rounded-full blur-2xl ${shape.color} floating-blob`}
          style={{
            width: shape.size,
            height: shape.size,
            top: shape.top,
            left: shape.left,
          }}
          animate={{
            x: [0, 40, -20, 0],
            y: [0, -30, 20, 0],
            rotate: [0, 120, 240, 360],
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
