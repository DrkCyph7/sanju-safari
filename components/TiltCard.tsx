'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { useRef } from 'react'

interface TiltCardProps {
  children: React.ReactNode
  className?: string
  tiltStrength?: number
  glare?: boolean
}

export function TiltCard({ children, className, tiltStrength = 12, glare = true }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springX = useSpring(mouseX, { stiffness: 200, damping: 22 })
  const springY = useSpring(mouseY, { stiffness: 200, damping: 22 })

  const rotateX = useTransform(springY, [-0.5, 0.5], [tiltStrength, -tiltStrength])
  const rotateY = useTransform(springX, [-0.5, 0.5], [-tiltStrength, tiltStrength])

  const glareX = useTransform(springX, [-0.5, 0.5], ['0%', '100%'])
  const glareY = useTransform(springY, [-0.5, 0.5], ['0%', '100%'])
  const glareOpacity = useTransform(
    [springX, springY] as [typeof springX, typeof springY],
    ([x, y]: number[]) => Math.sqrt(x * x + y * y) * 0.8
  )

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        transformPerspective: '1000px',
      }}
      whileHover={{ scale: 1.02 }}
      transition={{ scale: { duration: 0.25 } }}
    >
      {children}
      {glare && (
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 'inherit',
            background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.18) 0%, transparent 65%)`,
            opacity: glareOpacity,
            pointerEvents: 'none',
            zIndex: 10,
          }}
        />
      )}
    </motion.div>
  )
}
