import React, { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export function TypewriterText({ text, className = '', delay = 0 }) {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex >= text.length) return

    const timeout = setTimeout(
      () => {
        setDisplayText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      },
      currentIndex === 0 ? delay : 50 + Math.random() * 50
    )

    return () => clearTimeout(timeout)
  }, [currentIndex, text, delay])

  return (
    <span className={className}>
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  )
}

export function SplitTextReveal({ text, className = '', stagger = 0.03 }) {
  const letters = text.split('')

  return (
    <motion.span className={className} initial="hidden" whileInView="visible" viewport={{ once: true }}>
      {letters.map((char, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ delay: i * stagger, duration: 0.5 }}
          style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  )
}

export function GradientShimmerText({ text, className = '' }) {
  return (
    <span
      className={`${className} bg-clip-text text-transparent`}
      style={{
        background: 'linear-gradient(90deg, #6366f1, #ec4899, #06b6d4, #6366f1)',
        backgroundSize: '200% auto',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        animation: 'shimmer-text 3s linear infinite',
      }}
    >
      {text}
      <style jsx>{`
        @keyframes shimmer-text {
          to {
            background-position: 200% center;
          }
        }
      `}</style>
    </span>
  )
}

export function ParallaxSection({ children, className = '', speed = 0.5 }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed])

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  )
}
