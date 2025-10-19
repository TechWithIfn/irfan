import React, { useEffect, useState } from 'react'

export default function CursorTrail() {
  const [trails, setTrails] = useState([])
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    let timeoutId
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY })
      
      const trail = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
      }
      
      setTrails((prev) => [...prev.slice(-8), trail])
      
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        setTrails([])
      }, 800)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      clearTimeout(timeoutId)
    }
  }, [])

  return (
    <>
      {trails.map((trail, idx) => (
        <div
          key={trail.id}
          className="cursor-trail"
          style={{
            left: trail.x - 10,
            top: trail.y - 10,
            opacity: (idx + 1) / trails.length,
            transform: `scale(${(idx + 1) / trails.length})`,
          }}
        />
      ))}
      {/* Main cursor glow */}
      <div
        className="fixed pointer-events-none z-[9999] w-8 h-8 rounded-full mix-blend-screen transition-transform duration-100"
        style={{
          left: mousePos.x - 16,
          top: mousePos.y - 16,
          background: 'radial-gradient(circle, rgba(99,102,241,0.4), transparent)',
        }}
      />
    </>
  )
}
