'use client'

import { motion, useInView } from 'motion/react'
import { useRef } from 'react'

interface SplitTextProps {
  text: string
  className?: string
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
  delay?: number
  stagger?: number
  blur?: boolean
  once?: boolean
}

export function SplitText({
  text,
  className,
  tag = 'h2',
  delay = 0,
  stagger = 0.03,
  once = true,
}: SplitTextProps) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once, margin: '-60px' })
  const Tag = tag as 'h1' | 'h2' | 'h3' | 'p' | 'span'

  // Split by word for efficient, hardware-composited text reveal
  const words = text.split(' ')

  return (
    <Tag
      ref={ref as React.RefObject<HTMLHeadingElement & HTMLParagraphElement & HTMLSpanElement>}
      className={className}
      aria-label={text}
      style={{ display: 'inline-flex', flexWrap: 'wrap', gap: '0 0.28em' }}
    >
      {words.map((word, wi) => (
        <motion.span
          key={wi}
          style={{ display: 'inline-block', willChange: inView ? 'auto' : 'transform, opacity' }}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.45,
            delay: delay + wi * stagger,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          {word}
        </motion.span>
      ))}
    </Tag>
  )
}
