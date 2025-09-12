'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Hero() {
  const [currentText, setCurrentText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  
  const texts = ['PIXEL ARTIST', 'DIGITAL CREATOR', 'SPRITE MASTER', '8-BIT WIZARD']

  useEffect(() => {
    const timeout = setTimeout(() => {
      const current = texts[currentIndex]
      
      if (!isDeleting) {
        if (currentText !== current) {
          setCurrentText(current.substring(0, currentText.length + 1))
        } else {
          setTimeout(() => setIsDeleting(true), 1000)
        }
      } else {
        if (currentText !== '') {
          setCurrentText(current.substring(0, currentText.length - 1))
        } else {
          setIsDeleting(false)
          setCurrentIndex((prev) => (prev + 1) % texts.length)
        }
      }
    }, isDeleting ? 50 : 150)

    return () => clearTimeout(timeout)
  }, [currentText, isDeleting, currentIndex, texts])

  // Pixel character sprite (simplified ASCII art)
  const pixelCharacter = [
    '    ████████    ',
    '  ██████████████',
    '  ██░░██░░██░░██',
    '  ██░░██░░██░░██',
    '  ██████████████',
    '  ██░░░░░░░░░░██',
    '  ██░░████████░░██',
    '  ██░░░░░░░░░░██',
    '  ████████████  ',
    '    ██████████  ',
    '    ██░░░░██    ',
    '    ██████████  ',
    '  ████████████  ',
    '██████████████  ',
    '██░░░░░░░░░░██  ',
    '████      ████  '
  ]

  const scrollToAbout = () => {
    const element = document.querySelector('#about')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-20 grid-rows-20 h-full w-full">
          {Array.from({ length: 400 }).map((_, i) => (
            <motion.div
              key={i}
              className="border border-pixel-primary"
              initial={{ opacity: 0 }}
              animate={{ opacity: Math.random() > 0.8 ? 0.3 : 0 }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: 'reverse',
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          
          {/* Pixel Character */}
          <motion.div
            className="mb-8 font-mono text-pixel-primary text-xs leading-none inline-block"
            initial={{ scale: 0, rotate: 180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1, type: 'spring', bounce: 0.5 }}
          >
            {pixelCharacter.map((line, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="animate-pixel-float"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {line.split('').map((char, charIndex) => (
                  <span
                    key={charIndex}
                    className={
                      char === '█' ? 'text-pixel-primary' :
                      char === '░' ? 'text-pixel-secondary' :
                      'text-transparent'
                    }
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
              </motion.div>
            ))}
          </motion.div>

          {/* Main Title */}
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-pixel-text"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <span className="block mb-2">WELCOME TO</span>
            <span className="text-pixel-primary glitch" data-text="PIXEL REALM">
              PIXEL REALM
            </span>
          </motion.h1>

          {/* Typewriter Effect */}
          <motion.div
            className="text-xl md:text-2xl mb-8 h-8 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <span className="text-pixel-secondary">
              {currentText}
              <span className="animate-pixel-blink text-pixel-primary">|</span>
            </span>
          </motion.div>

          {/* Description */}
          <motion.p
            className="text-lg md:text-xl text-pixel-text/80 mb-12 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            Crafting digital worlds one pixel at a time. 
            <br />
            Explore my collection of retro-inspired art, game sprites, and digital masterpieces.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2 }}
          >
            <motion.button
              className="pixel-btn text-lg px-8 py-4 animate-pixel-glow"
              onClick={() => document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' })}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              VIEW PORTFOLIO
            </motion.button>
            
            <motion.button
              className="pixel-btn bg-transparent text-pixel-primary border-pixel-secondary hover:bg-pixel-secondary hover:text-pixel-bg text-lg px-8 py-4"
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              GET IN TOUCH
            </motion.button>
          </motion.div>

        </div>
      </div>

      {/* Floating Pixels */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-pixel-primary opacity-60"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </section>
  )
}
