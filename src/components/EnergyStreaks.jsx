import React, { useEffect, useRef } from 'react'

export default function EnergyStreaks() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const streaks = []
    const createStreak = () => {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        length: 100 + Math.random() * 200,
        speed: 2 + Math.random() * 3,
        angle: Math.random() * Math.PI * 2,
        opacity: 0.3 + Math.random() * 0.4,
        color: Math.random() > 0.5 ? 'rgba(99,102,241,' : 'rgba(236,72,153,',
      }
    }

    // Initialize streaks
    for (let i = 0; i < 8; i++) {
      streaks.push(createStreak())
    }

    let animationFrameId
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      streaks.forEach((streak, index) => {
        // Update position
        streak.x += Math.cos(streak.angle) * streak.speed
        streak.y += Math.sin(streak.angle) * streak.speed

        // Reset if out of bounds
        if (
          streak.x < -streak.length ||
          streak.x > canvas.width + streak.length ||
          streak.y < -streak.length ||
          streak.y > canvas.height + streak.length
        ) {
          streaks[index] = createStreak()
          return
        }

        // Draw streak
        const gradient = ctx.createLinearGradient(
          streak.x,
          streak.y,
          streak.x - Math.cos(streak.angle) * streak.length,
          streak.y - Math.sin(streak.angle) * streak.length
        )
        gradient.addColorStop(0, streak.color + streak.opacity + ')')
        gradient.addColorStop(0.5, streak.color + streak.opacity * 0.5 + ')')
        gradient.addColorStop(1, streak.color + '0)')

        ctx.strokeStyle = gradient
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(streak.x, streak.y)
        ctx.lineTo(
          streak.x - Math.cos(streak.angle) * streak.length,
          streak.y - Math.sin(streak.angle) * streak.length
        )
        ctx.stroke()
      })

      animationFrameId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-5 pointer-events-none opacity-40"
    />
  )
}
