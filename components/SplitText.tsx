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
  stagger = 0.025,
  blur = true,
  once = true,
}: SplitTextProps) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once, margin: '-60px' })
  const Tag = tag as 'h1' | 'h2' | 'h3' | 'p' | 'span'

  // Split by word to preserve line-breaking
  const words = text.split(' ')

  return (
    <Tag
      ref={ref as React.RefObject<HTMLHeadingElement & HTMLParagraphElement & HTMLSpanElement>}
      className={className}
      aria-label={text}
      style={{ display: 'inline-flex', flexWrap: 'wrap', gap: '0 0.28em' }}
    >
      {words.map((word, wi) => (
        <span key={wi} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
          {word.split('').map((char, ci) => {
            const index = words.slice(0, wi).join('').length + wi + ci
            return (
              <motion.span
                key={ci}
                aria-hidden="true"
                style={{ display: 'inline-block' }}
                initial={{ opacity: 0, y: 24, ...(blur ? { filter: 'blur(8px)' } : {}) }}
                animate={
                  inView
                    ? { opacity: 1, y: 0, ...(blur ? { filter: 'blur(0px)' } : {}) }
                    : {}
                }
                transition={{
                  duration: 0.55,
                  delay: delay + index * stagger,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                {char}
              </motion.span>
            )
          })}
        </span>
      ))}
    </Tag>
  )
}
