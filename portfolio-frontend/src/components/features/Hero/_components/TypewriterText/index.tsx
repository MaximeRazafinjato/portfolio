import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface TypewriterTextProps {
  text: string
  className?: string
  delay?: number
}

const TYPING_SPEED_MS = 80
const CURSOR_BLINK_DURATION = 0.8

export default function TypewriterText({ text, className = '', delay = 0 }: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [isTypingComplete, setIsTypingComplete] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      let currentIndex = 0
      const interval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayedText(text.slice(0, currentIndex))
          currentIndex++
        } else {
          clearInterval(interval)
          setIsTypingComplete(true)
        }
      }, TYPING_SPEED_MS)

      return () => clearInterval(interval)
    }, delay)

    return () => clearTimeout(timeout)
  }, [text, delay])

  return (
    <span className={className}>
      {displayedText}
      <motion.span
        className="inline-block w-[3px] bg-primary"
        animate={{ opacity: isTypingComplete ? [1, 0] : 1 }}
        transition={{
          duration: CURSOR_BLINK_DURATION,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      >
        &nbsp;
      </motion.span>
    </span>
  )
}
