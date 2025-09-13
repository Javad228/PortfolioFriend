'use client'

import React, { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, MessageSquare, Send, Copy, Check, Instagram } from 'lucide-react'

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [copiedDiscord, setCopiedDiscord] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const email = 'javid.hajiyev.w@gmail.com'
  const discord = 'djammik'

  const copyToClipboard = async (text: string, type: 'email' | 'discord') => {
    try {
      await navigator.clipboard.writeText(text)
      if (type === 'email') {
        setCopiedEmail(true)
        setTimeout(() => setCopiedEmail(false), 2000)
      } else {
        setCopiedDiscord(true)
        setTimeout(() => setCopiedDiscord(false), 2000)
      }
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically handle form submission
    console.log('Form submitted:', formData)
    // Reset form
    setFormData({ name: '', email: '', message: '' })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  // Pixel art envelope
  const envelopeArt = [
    '████████████████████',
    '██                ██',
    '██  ████████████  ██',
    '██  ██        ██  ██',
    '██  ██  ████  ██  ██',
    '██  ██  ████  ██  ██',
    '██  ██        ██  ██',
    '██  ████████████  ██',
    '██                ██',
    '████████████████████'
  ]

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-pixel-bg to-pixel-bg/80 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ff6b35' fill-opacity='0.3'%3E%3Cpath d='M20 20c0 11.046-8.954 20-20 20v20h40V20H20z'/%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-pixel-primary">
            <span className="glitch" data-text="GET IN TOUCH">GET IN TOUCH</span>
          </h2>
          <div className="w-24 h-1 bg-pixel-secondary mx-auto mb-8"></div>
          <p className="text-xl text-pixel-text/80 max-w-2xl mx-auto">
            Ready to bring your pixel art vision to life? Let&apos;s collaborate and create something amazing together!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Pixel Art Envelope */}
            <div className="mb-8 flex justify-center lg:justify-start">
              <div className="font-mono text-pixel-primary text-xs leading-none">
                {envelopeArt.map((line, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + index * 0.05 }}
                  >
                    {line.split('').map((char, charIndex) => (
                      <span
                        key={charIndex}
                        className={char === '█' ? 'text-pixel-primary' : 'text-transparent'}
                      >
                        {char === ' ' ? '\u00A0' : char}
                      </span>
                    ))}
                  </motion.div>
                ))}
              </div>
            </div>

            <h3 className="text-2xl font-bold mb-8 text-pixel-text">
              LET&apos;S CREATE TOGETHER
            </h3>

            <div className="space-y-6">
              {/* Email Contact */}
              <motion.div
                className="bg-pixel-bg/50 border-2 border-pixel-border p-6 hover:border-pixel-primary transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Mail className="text-pixel-primary mr-4" size={24} />
                    <div>
                      <h4 className="text-lg font-bold text-pixel-text mb-1">EMAIL</h4>
                      <p className="text-pixel-text/80 text-sm">{email}</p>
                    </div>
                  </div>
                  <motion.button
                    onClick={() => copyToClipboard(email, 'email')}
                    className="pixel-btn px-3 py-2 text-xs"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {copiedEmail ? <Check size={16} /> : <Copy size={16} />}
                  </motion.button>
                </div>
                <p className="text-pixel-text/60 text-sm mt-3">
                  Perfect for project inquiries and professional collaborations.
                </p>
              </motion.div>

              {/* Discord Contact */}
              <motion.div
                className="bg-pixel-bg/50 border-2 border-pixel-border p-6 hover:border-pixel-secondary transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.8 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <MessageSquare className="text-pixel-secondary mr-4" size={24} />
                    <div>
                      <h4 className="text-lg font-bold text-pixel-text mb-1">DISCORD</h4>
                      <p className="text-pixel-text/80 text-sm">{discord}</p>
                    </div>
                  </div>
                  <motion.button
                    onClick={() => copyToClipboard(discord, 'discord')}
                    className="pixel-btn bg-pixel-secondary border-pixel-secondary hover:bg-pixel-bg hover:text-pixel-secondary px-3 py-2 text-xs"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {copiedDiscord ? <Check size={16} /> : <Copy size={16} />}
                  </motion.button>
                </div>
                <p className="text-pixel-text/60 text-sm mt-3">
                  Quick chats, brainstorming sessions, and real-time collaboration.
                </p>
              </motion.div>

              {/* Instagram Contact */}
              <motion.div
                className="bg-pixel-bg/50 border-2 border-pixel-border p-6 hover:border-pixel-accent transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 1.0 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Instagram className="text-pixel-accent mr-4" size={24} />
                    <div>
                      <h4 className="text-lg font-bold text-pixel-text mb-1">INSTAGRAM</h4>
                      <p className="text-pixel-text/80 text-sm">@jagana.db</p>
                    </div>
                  </div>
                  <motion.a
                    href="https://www.instagram.com/jagana.db/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pixel-btn bg-pixel-accent border-pixel-accent hover:bg-pixel-bg hover:text-pixel-accent px-3 py-2 text-xs"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    VISIT
                  </motion.a>
                </div>
                <p className="text-pixel-text/60 text-sm mt-3">
                  Check out my latest work, behind-the-scenes content, and art process.
                </p>
              </motion.div>

              {/* Availability Info */}
              <motion.div
                className="bg-gradient-to-r from-pixel-accent/20 to-pixel-primary/20 border-2 border-pixel-accent p-6"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 1 }}
              >
                <h4 className="text-lg font-bold text-pixel-text mb-2">AVAILABILITY</h4>
                <p className="text-pixel-text/80 text-sm leading-relaxed">
                  Currently accepting new projects! I typically respond within 24 hours. 
                  Let&apos;s discuss your pixel art needs and bring your creative vision to life.
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="bg-pixel-bg/50 border-2 border-pixel-border p-8">
              <h3 className="text-2xl font-bold mb-6 text-pixel-text">
                SEND A MESSAGE
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-pixel-text mb-2">
                    YOUR NAME
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-pixel-bg border-2 border-pixel-border focus:border-pixel-primary text-pixel-text px-4 py-3 outline-none transition-colors duration-300 font-mono text-sm"
                    placeholder="Enter your name..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-pixel-text mb-2">
                    EMAIL ADDRESS
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-pixel-bg border-2 border-pixel-border focus:border-pixel-primary text-pixel-text px-4 py-3 outline-none transition-colors duration-300 font-mono text-sm"
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-pixel-text mb-2">
                    PROJECT DETAILS
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    className="w-full bg-pixel-bg border-2 border-pixel-border focus:border-pixel-primary text-pixel-text px-4 py-3 outline-none transition-colors duration-300 font-mono text-sm resize-none"
                    placeholder="Tell me about your project, timeline, and budget..."
                    required
                  />
                </div>

                <motion.button
                  type="submit"
                  className="pixel-btn w-full py-4 text-lg flex items-center justify-center gap-3"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Send size={20} />
                  SEND MESSAGE
                </motion.button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-pixel-text/60 text-sm">
                  I&apos;ll get back to you as soon as possible!
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <h3 className="text-2xl font-bold text-pixel-text mb-4">
            READY TO START YOUR PROJECT?
          </h3>
          <p className="text-pixel-text/80 max-w-2xl mx-auto mb-8">
            Whether you need character sprites, environmental assets, UI elements, or complete pixel art packages, 
            I&apos;m here to help bring your vision to life with professional quality and attention to detail.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href={`mailto:${email}`}
              className="pixel-btn text-lg px-8 py-4 inline-flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail size={20} />
              EMAIL ME
            </motion.a>
            
            <motion.button
              onClick={() => copyToClipboard(discord, 'discord')}
              className="pixel-btn bg-pixel-secondary border-pixel-secondary hover:bg-pixel-bg hover:text-pixel-secondary text-lg px-8 py-4 inline-flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MessageSquare size={20} />
              DISCORD CHAT
            </motion.button>

            <motion.a
              href="https://www.instagram.com/jagana.db/"
              target="_blank"
              rel="noopener noreferrer"
              className="pixel-btn bg-pixel-accent border-pixel-accent hover:bg-pixel-bg hover:text-pixel-accent text-lg px-8 py-4 inline-flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Instagram size={20} />
              FOLLOW ME
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
