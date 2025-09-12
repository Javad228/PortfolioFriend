'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Heart, Code, Palette } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { name: 'TWITTER', url: '#', icon: '🐦' },
    { name: 'INSTAGRAM', url: '#', icon: '📷' },
    { name: 'ARTSTATION', url: '#', icon: '🎨' },
    { name: 'GITHUB', url: '#', icon: '💻' }
  ]

  const footerArt = [
    '████████████████████████████████',
    '██░░░░░░░░░░░░░░░░░░░░░░░░░░░░██',
    '██░░██████░░██░░██████░░██████░░██',
    '██░░██░░██░░██░░██░░██░░██░░██░░██',
    '██░░██████░░██░░██████░░██████░░██',
    '██░░░░░░░░░░░░░░░░░░░░░░░░░░░░██',
    '████████████████████████████████'
  ]

  return (
    <footer className="bg-pixel-bg border-t-2 border-pixel-primary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="font-mono text-pixel-primary text-xs leading-none">
          {Array.from({ length: 10 }).map((_, rowIndex) => (
            <div key={rowIndex} className="flex">
              {Array.from({ length: 100 }).map((_, colIndex) => (
                <span
                  key={colIndex}
                  className={Math.random() > 0.95 ? 'text-pixel-primary' : 'text-transparent'}
                >
                  █
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Footer Art */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="font-mono text-pixel-primary text-xs leading-none inline-block">
            {footerArt.map((line, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
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
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* About Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold text-pixel-primary mb-4">PIXEL.ART</h3>
            <p className="text-pixel-text/80 text-sm leading-relaxed mb-4">
              Creating digital worlds one pixel at a time. Professional pixel artist 
              specializing in game sprites, character design, and retro-style graphics.
            </p>
            <div className="flex items-center gap-2 text-pixel-text/60 text-xs">
              <span>Made with</span>
              <Heart size={12} className="text-pixel-secondary animate-pulse" />
              <span>and</span>
              <Code size={12} className="text-pixel-primary" />
              <span>+</span>
              <Palette size={12} className="text-pixel-accent" />
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold text-pixel-primary mb-4">NAVIGATION</h3>
            <nav className="space-y-2">
              {[
                { name: 'HOME', href: '#home' },
                { name: 'ABOUT', href: '#about' },
                { name: 'PORTFOLIO', href: '#portfolio' },
                { name: 'CONTACT', href: '#contact' }
              ].map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className="block text-pixel-text/80 hover:text-pixel-primary transition-colors duration-200 text-sm"
                  whileHover={{ x: 5 }}
                  onClick={(e) => {
                    e.preventDefault()
                    document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  &gt; {link.name}
                </motion.a>
              ))}
            </nav>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold text-pixel-primary mb-4">CONNECT</h3>
            <div className="space-y-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  className="flex items-center gap-3 text-pixel-text/80 hover:text-pixel-primary transition-colors duration-200 text-sm"
                  whileHover={{ x: 5, scale: 1.02 }}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <span className="text-lg">{social.icon}</span>
                  {social.name}
                </motion.a>
              ))}
            </div>

            {/* Contact Info */}
            <div className="mt-6 p-4 border-2 border-pixel-border bg-pixel-bg/50">
              <h4 className="text-sm font-bold text-pixel-text mb-2">QUICK CONTACT</h4>
              <p className="text-xs text-pixel-text/60 mb-2">pixelartist@example.com</p>
              <p className="text-xs text-pixel-text/60">PixelMaster#1337</p>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="border-t-2 border-pixel-border pt-6 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-pixel-text/60 text-sm">
              © {currentYear} PIXEL.ART - All rights reserved
            </p>
            
            <div className="flex items-center gap-4 text-pixel-text/60 text-xs">
              <span>CRAFTED WITH NEXT.JS</span>
              <span className="w-1 h-1 bg-pixel-primary"></span>
              <span>STYLED WITH TAILWIND</span>
              <span className="w-1 h-1 bg-pixel-primary"></span>
              <span>ANIMATED WITH FRAMER</span>
            </div>
          </div>

          {/* Retro Loading Bar */}
          <motion.div
            className="mt-4 mx-auto w-64 h-2 border border-pixel-border bg-pixel-bg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 1 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-pixel-primary to-pixel-secondary"
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              transition={{ duration: 2, delay: 1.2 }}
              viewport={{ once: true }}
            />
          </motion.div>

          <motion.p
            className="text-pixel-primary text-xs mt-2 font-mono"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 2 }}
            viewport={{ once: true }}
          >
            PORTFOLIO.EXE LOADED SUCCESSFULLY
          </motion.p>
        </motion.div>
      </div>

      {/* Floating Pixels */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-pixel-primary opacity-60"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </footer>
  )
}
