'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function LoadingScreen() {
  const [loadingText, setLoadingText] = useState('LOADING')
  const [dots, setDots] = useState('')

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => {
        if (prev.length >= 3) return ''
        return prev + '.'
      })
    }, 500)

    return () => clearInterval(interval)
  }, [])

  const pixelArt = [
    '████████████████',
    '██░░░░░░░░░░░░██',
    '██░░██████████░░██',
    '██░░██░░░░░░██░░██',
    '██░░██░░██░░██░░██',
    '██░░██░░░░░░██░░██',
    '██░░██████████░░██',
    '██░░░░░░░░░░░░██',
    '████████████████',
  ]

  return (
    <motion.div
      className="fixed inset-0 bg-pixel-bg flex items-center justify-center z-50"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center">
        {/* Pixel Art Loading Icon */}
        <motion.div
          className="mb-8 font-mono text-pixel-primary text-xs leading-none"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, type: 'spring' }}
        >
          {pixelArt.map((line, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {line.split('').map((char, charIndex) => (
                <span
                  key={charIndex}
                  className={char === '█' ? 'text-pixel-primary' : 'text-pixel-secondary'}
                >
                  {char}
                </span>
              ))}
            </motion.div>
          ))}
        </motion.div>

        {/* Loading Text */}
        <motion.div
          className="text-pixel-primary text-xl mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <span className="glitch" data-text={loadingText}>
            {loadingText}
          </span>
          <span className="animate-pixel-blink">{dots}</span>
        </motion.div>

        {/* Progress Bar */}
        <div className="w-64 h-4 border-2 border-pixel-primary bg-pixel-bg mx-auto">
          <motion.div
            className="h-full bg-pixel-primary"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 2.5, ease: 'easeInOut' }}
          />
        </div>

        {/* Retro Loading Messages */}
        <motion.div
          className="mt-4 text-pixel-text text-xs opacity-60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 1 }}
        >
          INITIALIZING PIXEL MATRIX...
        </motion.div>
      </div>
    </motion.div>
  )
}
