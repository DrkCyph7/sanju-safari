'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { useRef } from 'react'

interface TiltCardProps {
  children: React.ReactNode
  className?: string
  tiltStrength?: number
  glare?: boolean
}

export function TiltCard({ children, className }: TiltCardProps) {
  return (
    <motion.div
      className={`${className || ''} tilt-card-optimized`}
      whileHover={{ y: -6, scale: 1.015 }}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      style={{ position: 'relative' }}
    >
      {children}
    </motion.div>
  )
}
