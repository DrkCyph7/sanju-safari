'use client'

import { motion, useInView } from 'motion/react'
import { useRef } from 'react'

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  distance?: number
  duration?: number
  once?: boolean
}

export function AnimatedSection({
  children,
  className,
  delay = 0,
  direction = 'up',
  distance = 28,
  duration = 0.55,
  once = true,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once, margin: '-60px' })

  const initialX = direction === 'left' ? -distance : direction === 'right' ? distance : 0
  const initialY = direction === 'up' ? distance : direction === 'down' ? -distance : 0

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, x: initialX, y: initialY }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ willChange: inView ? 'auto' : 'transform, opacity' }}
    >
      {children}
    </motion.div>
  )
}

interface StaggerContainerProps {
  children: React.ReactNode
  className?: string
  staggerDelay?: number
  once?: boolean
}

export function StaggerContainer({ children, className, staggerDelay = 0.08, once = true }: StaggerContainerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({
  children,
  className,
  direction = 'up',
}: {
  children: React.ReactNode
  className?: string
  direction?: 'up' | 'left' | 'right' | 'none'
}) {
  const y = direction === 'up' ? 20 : 0
  const x = direction === 'left' ? -20 : direction === 'right' ? 20 : 0

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y, x },
        visible: {
          opacity: 1,
          y: 0,
          x: 0,
          transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
        },
      }}
    >
      {children}
    </motion.div>
  )
}
