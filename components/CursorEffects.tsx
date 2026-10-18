'use client'

import { motion, useMotionValue, useSpring } from 'motion/react'
import { useEffect, useState } from 'react'

interface MagnetProps {
  children: React.ReactNode
  className?: string
  strength?: number
}

export function Magnet({ children, className }: MagnetProps) {
  return (
    <motion.div
      className={className}
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      style={{ display: 'inline-flex' }}
    >
      {children}
    </motion.div>
  )
}

// GlowCursor: lightweight ambient orb that follows the cursor on hardware compositor
export function GlowCursor() {
  const [enabled, setEnabled] = useState(false)
  const x = useMotionValue(-300)
  const y = useMotionValue(-300)
  const springX = useSpring(x, { stiffness: 180, damping: 24 })
  const springY = useSpring(y, { stiffness: 180, damping: 24 })

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    setEnabled(true)
    const handleMove = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    window.addEventListener('mousemove', handleMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMove)
  }, [x, y])

  if (!enabled) return null

  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        x: springX,
        y: springY,
        translateX: '-50%',
        translateY: '-50%',
        width: 320,
        height: 320,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,193,94,0.08) 0%, rgba(255,138,61,0.02) 50%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 1,
        willChange: 'transform',
      }}
    />
  )
}
