'use client'

import React, { useState, useEffect, useRef } from 'react'

interface CounterUpProps {
  start?: number
  end: number
  duration?: number
  decimals?: number
  className?: string
}

export default function CounterUp({ 
  start = 0, 
  end, 
  duration = 2000, 
  decimals = 3, 
  className = '' 
}: CounterUpProps) {
  const [count, setCount] = useState(start)
  const countRef = useRef(start)

  useEffect(() => {
    const startTime = Date.now()
    const endTime = startTime + duration
    const totalChange = end - start

    const updateCounter = () => {
      const now = Date.now()
      const remaining = Math.max(endTime - now, 0)
      const progress = 1 - remaining / duration

      countRef.current = start + totalChange * progress

      if (now <= endTime) {
        requestAnimationFrame(updateCounter)
      } else {
        countRef.current = end
      }

      setCount(Number(countRef.current.toFixed(decimals)))
    }

    requestAnimationFrame(updateCounter)

    return () => {
      countRef.current = start
    }
  }, [start, end, duration, decimals])

  return <span className={className}>{count.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  })}</span>
}

