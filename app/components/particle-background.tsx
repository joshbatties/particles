"use client"

import { useEffect, useRef } from "react"

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas to full window size
    const setCanvasSize = () => {
      if (!canvasRef.current) return
      canvasRef.current.width = window.innerWidth
      canvasRef.current.height = window.innerHeight
    }

    setCanvasSize()

    const particles: Particle[] = []
    const particleCount = 150

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number

      constructor() {
        // Determine if this particle should be positioned near an edge
        const nearEdge = Math.random() > 0.3 // 70% chance to be near an edge

        if (nearEdge) {
          // Position near an edge
          const edge = Math.floor(Math.random() * 4) // 0: top, 1: right, 2: bottom, 3: left

          if (edge === 0) {
            // top
            this.x = Math.random() * canvas.width
            this.y = Math.random() * (canvas.height * 0.2)
          } else if (edge === 1) {
            // right
            this.x = canvas.width - Math.random() * (canvas.width * 0.2)
            this.y = Math.random() * canvas.height
          } else if (edge === 2) {
            // bottom
            this.x = Math.random() * canvas.width
            this.y = canvas.height - Math.random() * (canvas.height * 0.2)
          } else {
            // left
            this.x = Math.random() * (canvas.width * 0.2)
            this.y = Math.random() * canvas.height
          }
        } else {
          // Position away from center (but not at edge)
          const centerX = canvas.width / 2
          const centerY = canvas.height / 2
          const angle = Math.random() * Math.PI * 2
          const minDistance = Math.min(canvas.width, canvas.height) * 0.2 // Minimum distance from center
          const maxDistance = Math.min(canvas.width, canvas.height) * 0.4 // Maximum distance from center
          const distance = minDistance + Math.random() * (maxDistance - minDistance)

          this.x = centerX + Math.cos(angle) * distance
          this.y = centerY + Math.sin(angle) * distance
        }

        this.size = Math.random() * 2 + 0.1
        // Slow down the particles by reducing their speed range
        this.speedX = (Math.random() * 0.8 - 0.4) * 0.5 // Reduced speed range and multiplied by 0.5
        this.speedY = (Math.random() * 0.8 - 0.4) * 0.5 // Reduced speed range and multiplied by 0.5
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > canvas.width) this.x = 0
        if (this.x < 0) this.x = canvas.width
        if (this.y > canvas.height) this.y = 0
        if (this.y < 0) this.y = canvas.height
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = "rgba(255, 255, 255, 0.5)"
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    function animate() {
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const particle of particles) {
        particle.update()
        particle.draw()
      }

      requestAnimationFrame(animate)
    }

    animate()

    // Handle window resize
    window.addEventListener("resize", setCanvasSize)
    return () => window.removeEventListener("resize", setCanvasSize)
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 h-full w-full bg-black -z-10" aria-hidden="true" />
}
