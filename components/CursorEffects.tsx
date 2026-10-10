'use client'

import { motion, useMotionValue, useSpring } from 'motion/react'
import { useEffect, useRef } from 'react'

interface MagnetProps {
  children: React.ReactNode
  className?: string
  strength?: number
}

export function Magnet({ children, className, strength = 0.4 }: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 260, damping: 18 })
  const springY = useSpring(y, { stiffness: 260, damping: 18 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    x.set((e.clientX - cx) * strength)
    y.set((e.clientY - cy) * strength)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY, display: 'inline-flex' }}
    >
      {children}
    </motion.div>
  )
}

// GlowCursor: soft glowing orb that follows the cursor
export function GlowCursor() {
  const x = useMotionValue(-300)
  const y = useMotionValue(-300)
  const springX = useSpring(x, { stiffness: 70, damping: 16 })
  const springY = useSpring(y, { stiffness: 70, damping: 16 })

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [x, y])

  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: 'fixed',
        left: springX,
        top: springY,
        translateX: '-50%',
        translateY: '-50%',
        width: 340,
        height: 340,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,193,94,0.10) 0%, rgba(255,138,61,0.04) 50%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 1,
        mixBlendMode: 'screen',
      }}
    />
  )
}
