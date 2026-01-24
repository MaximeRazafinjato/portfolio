import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface AnimatedNameProps {
  text: string
  delay?: number
}

const TYPING_SPEED_MS = 80

export default function AnimatedName({ text, delay = 0 }: AnimatedNameProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [isTypingComplete, setIsTypingComplete] = useState(false)

  useEffect(() => {
    let currentIndex = 0
    let timeoutId: NodeJS.Timeout

    const startTyping = () => {
      timeoutId = setTimeout(() => {
        const tick = () => {
          if (currentIndex <= text.length) {
            setDisplayedText(text.slice(0, currentIndex))
            currentIndex++
            timeoutId = setTimeout(tick, TYPING_SPEED_MS)
          } else {
            setIsTypingComplete(true)
          }
        }
        tick()
      }, delay)
    }

    startTyping()

    return () => clearTimeout(timeoutId)
  }, [text, delay])

  return (
    <span className="inline-flex items-baseline">
      <motion.span
        className="inline-block bg-clip-text text-transparent"
        style={{
          backgroundImage: 'linear-gradient(90deg, #8b5cf6, #ec4899, #8b5cf6, #ec4899)',
          backgroundSize: '300% 100%',
        }}
        animate={{ backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {displayedText}
      </motion.span>
      {!isTypingComplete && (
        <motion.span
          className="inline-block w-[3px] bg-primary"
          animate={{ opacity: [1, 0] }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        >
          &nbsp;
        </motion.span>
      )}
    </span>
  )
}
