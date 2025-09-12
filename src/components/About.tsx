'use client'

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Code, Palette, Gamepad2, Zap } from 'lucide-react'

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const skills = [
    {
      icon: <Palette className="w-8 h-8" />,
      title: 'PIXEL ART',
      description: 'Creating stunning pixel art with attention to every detail, from character sprites to environmental tiles.',
      level: 95
    },
    {
      icon: <Gamepad2 className="w-8 h-8" />,
      title: 'GAME SPRITES',
      description: 'Designing animated characters, UI elements, and game assets optimized for various platforms.',
      level: 90
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: 'DIGITAL ART',
      description: 'Blending traditional art techniques with modern digital tools for unique visual experiences.',
      level: 85
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'ANIMATION',
      description: 'Bringing static pixels to life with smooth, frame-by-frame animations and effects.',
      level: 88
    }
  ]

  const stats = [
    { label: 'PROJECTS COMPLETED', value: '50+' },
    { label: 'YEARS EXPERIENCE', value: '5+' },
    { label: 'HAPPY CLIENTS', value: '30+' },
    { label: 'PIXELS PLACED', value: '1M+' }
  ]

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-pixel-bg to-pixel-bg/50 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300ff41' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
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
            <span className="glitch" data-text="ABOUT ME">ABOUT ME</span>
          </h2>
          <div className="w-24 h-1 bg-pixel-secondary mx-auto mb-8"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* About Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-pixel-text">
              CRAFTING DIGITAL WORLDS
            </h3>
            <div className="space-y-4 text-pixel-text/80 text-lg leading-relaxed">
              <p>
                Welcome to my pixel universe! I'm a passionate digital artist specializing in 
                pixel art and retro-style game graphics. With over 5 years of experience, 
                I've mastered the art of creating compelling visuals within the constraints 
                of limited resolution and color palettes.
              </p>
              <p>
                My journey began with classic 8-bit and 16-bit games, which inspired me to 
                pursue this unique art form. I believe that limitations breed creativity, 
                and every pixel has its purpose in telling a story.
              </p>
              <p>
                From character sprites to environmental tiles, UI elements to animated 
                sequences, I bring ideas to life one pixel at a time. Each project is 
                a new adventure in digital craftsmanship.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center p-4 border-2 border-pixel-border bg-pixel-bg/50"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.05, borderColor: 'var(--pixel-primary)' }}
                >
                  <div className="text-2xl font-bold text-pixel-primary mb-1">{stat.value}</div>
                  <div className="text-xs text-pixel-text/60">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Profile Picture */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="pixel-border p-8 bg-gradient-to-br from-pixel-bg to-pixel-border/20 text-center">
              {/* Profile Photo */}
              <motion.div
                className="relative inline-block mb-6"
                initial={{ scale: 0, rotate: 180 }}
                animate={isInView ? { scale: 1, rotate: 0 } : {}}
                transition={{ duration: 1, type: 'spring', bounce: 0.5, delay: 0.6 }}
              >
                <div className="w-48 h-48 mx-auto relative overflow-hidden border-4 border-pixel-primary bg-pixel-bg">
                  <img
                    src="/peti.jpg"
                    alt="Pixel Artist Profile"
                    className="w-full h-full object-cover pixel-art"
                    style={{ imageRendering: 'auto' }}
                  />
                  {/* Pixel overlay effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-pixel-primary/20 to-pixel-secondary/20 mix-blend-overlay"></div>
                </div>
                
                {/* Floating pixels around photo */}
                {Array.from({ length: 8 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-pixel-primary"
                    style={{
                      left: `${Math.cos((i * Math.PI * 2) / 8) * 120 + 96}px`,
                      top: `${Math.sin((i * Math.PI * 2) / 8) * 120 + 96}px`,
                    }}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.6, 1, 0.6],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </motion.div>

              {/* Artist Title */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1 }}
              >
                <h4 className="text-xl font-bold text-pixel-primary mb-2">
                  <span className="glitch" data-text="PIXEL ARTIST">PIXEL ARTIST</span>
                </h4>
                <div className="w-16 h-0.5 bg-pixel-secondary mx-auto mb-4"></div>
                <p className="text-pixel-text/80 text-sm">
                  "Every pixel tells a story"
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h3 className="text-3xl font-bold text-center mb-12 text-pixel-text">
            MY SKILLS
          </h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.title}
                className="bg-pixel-bg/50 border-2 border-pixel-border p-6 hover:border-pixel-primary transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center mb-4">
                  <div className="text-pixel-primary mr-4">{skill.icon}</div>
                  <h4 className="text-xl font-bold text-pixel-text">{skill.title}</h4>
                </div>
                
                <p className="text-pixel-text/80 mb-4 text-sm leading-relaxed">
                  {skill.description}
                </p>
                
                {/* Skill Level Bar */}
                <div className="relative">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-pixel-text/60">SKILL LEVEL</span>
                    <span className="text-xs text-pixel-primary font-bold">{skill.level}%</span>
                  </div>
                  <div className="w-full h-2 bg-pixel-border border border-pixel-border">
                    <motion.div
                      className="h-full bg-gradient-to-r from-pixel-primary to-pixel-secondary"
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${skill.level}%` } : {}}
                      transition={{ duration: 1, delay: 1 + index * 0.2 }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
