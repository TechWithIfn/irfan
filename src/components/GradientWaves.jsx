import React, { useEffect, useRef } from 'react'

export default function GradientWaves() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animationFrameId
    let mouseX = 0
    let mouseY = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const handleMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }
    window.addEventListener('mousemove', handleMouseMove)

    const waves = [
      { speed: 0.002, amplitude: 40, frequency: 0.003, color: 'rgba(99, 102, 241, 0.15)' },
      { speed: 0.0015, amplitude: 30, frequency: 0.004, color: 'rgba(236, 72, 153, 0.12)' },
      { speed: 0.0025, amplitude: 35, frequency: 0.0025, color: 'rgba(6, 182, 212, 0.1)' },
    ]

    let time = 0
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 1

      waves.forEach((wave) => {
        ctx.beginPath()
        ctx.moveTo(0, canvas.height / 2)

        for (let x = 0; x < canvas.width; x++) {
          const mouseInfluence = Math.max(0, 1 - Math.sqrt(Math.pow(x - mouseX, 2) + Math.pow(canvas.height / 2 - mouseY, 2)) / 200)
          const y =
            canvas.height / 2 +
            Math.sin(x * wave.frequency + time * wave.speed) * wave.amplitude +
            mouseInfluence * 30
          ctx.lineTo(x, y)
        }

        ctx.lineTo(canvas.width, canvas.height)
        ctx.lineTo(0, canvas.height)
        ctx.closePath()
        ctx.fillStyle = wave.color
        ctx.fill()
      })

      animationFrameId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none opacity-60"
    />
  )
}
