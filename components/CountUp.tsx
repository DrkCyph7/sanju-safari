'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'motion/react'

interface CountUpProps {
  to: number
  from?: number
  duration?: number
  delay?: number
  className?: string
  suffix?: string
  once?: boolean
}

export function CountUp({
  to,
  from = 0,
  duration = 2000,
  delay = 0,
  className,
  suffix = '',
  once = true,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once })
  const [value, setValue] = useState(from)
  const hasRun = useRef(false)

  useEffect(() => {
    if (!inView || (once && hasRun.current)) return
    hasRun.current = true
    let start: number | null = null
    const step = (timestamp: number) => {
      if (!start) start = timestamp + delay
      if (timestamp < start) {
        requestAnimationFrame(step)
        return
      }
      const elapsed = timestamp - start
      const progress = Math.min(elapsed / duration, 1)
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(from + (to - from) * eased))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [inView, from, to, duration, delay, once])

  return (
    <span ref={ref} className={className}>
      {value}{suffix}
    </span>
  )
}
