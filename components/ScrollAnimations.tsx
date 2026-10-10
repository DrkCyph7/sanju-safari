'use client'

import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'

interface ScrollFloatProps {
  children: React.ReactNode
  className?: string
  floatStrength?: number
}

export function ScrollFloat({ children, className, floatStrength = 60 }: ScrollFloatProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [floatStrength, -floatStrength])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <motion.div ref={ref} className={className} style={{ y, opacity }}>
      {children}
    </motion.div>
  )
}

interface ParallaxProps {
  children: React.ReactNode
  className?: string
  speed?: number
}

export function Parallax({ children, className, speed = 0.3 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [speed * 100, -speed * 100])

  return (
    <motion.div ref={ref} className={className} style={{ y }}>
      {children}
    </motion.div>
  )
}
