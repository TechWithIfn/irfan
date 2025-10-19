import React, { useEffect, useState, useRef } from 'react'

export default function MagneticCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [ripples, setRipples] = useState([])
  const cursorRef = useRef(null)

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })

      // Check if hovering over interactive elements
      const target = e.target
      const isInteractive = target.closest('a, button, [data-magnetic]')
      setIsHovering(!!isInteractive)
    }

    const handleClick = (e) => {
      const ripple = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
      }
      setRipples((prev) => [...prev, ripple])
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== ripple.id))
      }, 1000)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('click', handleClick)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('click', handleClick)
    }
  }, [])

  return (
    <>
      {/* Main cursor glow */}
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-[9999] transition-all duration-200 ease-out"
        style={{
          left: position.x - (isHovering ? 20 : 12),
          top: position.y - (isHovering ? 20 : 12),
          width: isHovering ? 40 : 24,
          height: isHovering ? 40 : 24,
        }}
      >
        <div
          className="w-full h-full rounded-full transition-all duration-300"
          style={{
            background: isHovering
              ? 'radial-gradient(circle, rgba(236,72,153,0.6), rgba(99,102,241,0.4), transparent)'
              : 'radial-gradient(circle, rgba(99,102,241,0.5), transparent)',
            boxShadow: isHovering
              ? '0 0 30px rgba(236,72,153,0.6), 0 0 60px rgba(99,102,241,0.4)'
              : '0 0 20px rgba(99,102,241,0.5)',
          }}
        />
      </div>

      {/* Ripple effects on click */}
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="fixed pointer-events-none z-[9998] rounded-full border-2 border-violet-400"
          style={{
            left: ripple.x - 20,
            top: ripple.y - 20,
            width: 40,
            height: 40,
            animation: 'ripple-expand 1s ease-out forwards',
          }}
        />
      ))}

      <style jsx>{`
        @keyframes ripple-expand {
          0% {
            transform: scale(0);
            opacity: 1;
          }
          100% {
            transform: scale(4);
            opacity: 0;
          }
        }
      `}</style>
    </>
  )
}
