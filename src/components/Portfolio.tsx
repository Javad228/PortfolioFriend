'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { X, ExternalLink } from 'lucide-react'

interface PortfolioItem {
  id: number
  title: string
  category: string
  description: string
  image: string
  pixelArt: string[]
  tags: string[]
}

interface ConfigItem {
  title: string
  category: string
  description: string
  imagePath: string
  tags: string[]
}

interface Project {
  id: number
  projectName: string
  projectDescription: string
  projectColor: string
  items: ConfigItem[]
}

interface PortfolioConfig {
  projects: Project[]
}

export default function Portfolio() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null)
  const [filter, setFilter] = useState('ALL')
  const [projects, setProjects] = useState<Project[]>([])
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([])

  // Load portfolio configuration
  useEffect(() => {
    const loadPortfolioConfig = async () => {
      try {
        const response = await fetch('/portfolio-config.json')
        const config: PortfolioConfig = await response.json()
        setProjects(config.projects)
        
        // Convert config items to portfolio items
        const items: PortfolioItem[] = []
        let itemId = 1
        
        config.projects.forEach(project => {
          project.items.forEach(item => {
            items.push({
              id: itemId++,
              title: item.title,
              category: item.category,
              description: item.description,
              image: `/portfolio/${item.imagePath}`,
              pixelArt: [
                '████████████████',
                '██░░░░░░░░░░░░██',
                '██░░██████████░░██',
                '██░░██░░░░░░██░░██',
                '██░░██░░██░░██░░██',
                '██░░██░░░░░░██░░██',
                '██░░██████████░░██',
                '██░░░░░░░░░░░░██',
                '████████████████'
              ],
              tags: item.tags
            })
          })
        })
        
        setPortfolioItems(items)
      } catch (error) {
        console.error('Failed to load portfolio config:', error)
        // Fallback to hardcoded items if config fails
        setPortfolioItems([
          {
            id: 1,
            title: 'CHARACTER WALK CYCLE',
            category: 'ANIMATION',
            description: 'Complete 8-directional walking animation set for character movement in games.',
            image: '/portfolio/emo_project/test_walk_south.gif',
            pixelArt: ['████████████████', '██░░░░░░░░░░░░██', '████████████████'],
            tags: ['ANIMATION', 'CHARACTER', 'WALK CYCLE']
          },
          {
            id: 2,
            title: 'WORKOUT CHARACTER DESIGN',
            category: 'CHARACTER',
            description: 'Detailed character sprite design for fitness/workout themed game.',
            image: '/portfolio/workout_project/image.png',
            pixelArt: ['████████████████', '██░░░░░░░░░░░░██', '████████████████'],
            tags: ['CHARACTER', 'FITNESS', 'SPRITE']
          }
        ])
        
        setProjects([
          {
            id: 1,
            projectName: 'Emo Project',
            projectDescription: 'Character Animation & Movement System',
            projectColor: 'secondary',
            items: [{ title: 'CHARACTER WALK CYCLE', category: 'ANIMATION', description: 'Complete 8-directional walking animation set', imagePath: 'emo_project/test_walk_south.gif', tags: ['ANIMATION', 'CHARACTER'] }]
          },
          {
            id: 2,
            projectName: 'Workout Project',
            projectDescription: 'Fitness Game Characters & Assets',
            projectColor: 'accent',
            items: [{ title: 'WORKOUT CHARACTER DESIGN', category: 'CHARACTER', description: 'Detailed character sprite design', imagePath: 'workout_project/image.png', tags: ['CHARACTER', 'FITNESS'] }]
          }
        ])
      }
    }

    loadPortfolioConfig()
  }, [])

  // Dynamic categories based on loaded items
  const categories = ['ALL', ...Array.from(new Set(portfolioItems.map(item => item.category)))]
  const filteredItems = filter === 'ALL' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === filter)

  return (
    <section id="portfolio" className="py-20 bg-gradient-to-b from-pixel-bg/50 to-pixel-bg relative">
      <div className="container mx-auto px-4" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-pixel-primary">
            <span className="glitch" data-text="MY PORTFOLIO">MY PORTFOLIO</span>
          </h2>
          <div className="w-24 h-1 bg-pixel-secondary mx-auto mb-8"></div>
          <p className="text-xl text-pixel-text/80 max-w-2xl mx-auto">
            Explore my collection of pixel art creations, from character sprites to environmental assets.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              className={`px-6 py-3 border-2 text-sm font-bold transition-all duration-300 ${
                filter === category
                  ? 'bg-pixel-primary text-pixel-bg border-pixel-primary'
                  : 'bg-transparent text-pixel-primary border-pixel-primary hover:bg-pixel-primary hover:text-pixel-bg'
              }`}
              onClick={() => setFilter(category)}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Project Sections */}
        <div className="space-y-16">
          {projects.map((project, projectIndex) => {
            const projectItems = portfolioItems.filter(item => {
              const startId = projects.slice(0, projectIndex).reduce((acc, p) => acc + p.items.length, 0) + 1
              const endId = startId + project.items.length - 1
              return item.id >= startId && item.id <= endId && (filter === 'ALL' || item.category === filter)
            })
            
            if (projectItems.length === 0 && filter !== 'ALL') return null
            
            const colorClass = project.projectColor === 'secondary' ? 'text-pixel-secondary' : 
                              project.projectColor === 'accent' ? 'text-pixel-accent' : 'text-pixel-primary'
            const bgColorClass = project.projectColor === 'secondary' ? 'bg-pixel-secondary' : 
                                project.projectColor === 'accent' ? 'bg-pixel-accent' : 'bg-pixel-primary'
            
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.6 + projectIndex * 0.2 }}
              >
                <div className="text-center mb-8">
                  <h3 className={`text-2xl font-bold ${colorClass} mb-2`}>{project.projectName.toUpperCase()}</h3>
                  <div className={`w-16 h-0.5 ${bgColorClass} mx-auto mb-4`}></div>
                  <p className="text-pixel-text/70">{project.projectDescription}</p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <AnimatePresence>
                    {projectItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    className="bg-pixel-bg/50 border-2 border-pixel-border hover:border-pixel-primary transition-all duration-300 cursor-pointer group"
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    onClick={() => setSelectedItem(item)}
                    whileHover={{ scale: 1.02 }}
                  >
                    {/* Real Image Display */}
                    <div className="p-4 bg-gradient-to-br from-pixel-bg to-pixel-border/20 flex justify-center items-center h-48 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="pixel-art max-w-full max-h-full object-contain hover:scale-110 transition-transform duration-300"
                        style={{ imageRendering: 'pixelated' }}
                      />
                    </div>

                    {/* Item Info */}
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-sm font-bold text-pixel-text group-hover:text-pixel-primary transition-colors">
                          {item.title}
                        </h3>
                        <span className="text-xs text-pixel-secondary bg-pixel-secondary/20 px-2 py-1 border border-pixel-secondary">
                          {item.category}
                        </span>
                      </div>
                      
                      <p className="text-pixel-text/70 text-xs mb-3 line-clamp-2">
                        {item.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {item.tags.slice(0, 2).map(tag => (
                          <span key={tag} className="text-xs text-pixel-accent bg-pixel-accent/20 px-2 py-1 border border-pixel-accent">
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Action */}
                      <div className="flex justify-end items-center text-xs text-pixel-text/60">
                        <span className="text-pixel-primary">CLICK</span>
                      </div>
                    </div>
                  </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Fallback: Original Grid for Filtered Items */}
        {filter !== 'ALL' && (
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8"
            layout
          >
          <AnimatePresence>
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                className="bg-pixel-bg/50 border-2 border-pixel-border hover:border-pixel-primary transition-all duration-300 cursor-pointer group"
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setSelectedItem(item)}
                whileHover={{ scale: 1.02 }}
              >
                {/* Real Image Display */}
                <div className="p-4 bg-gradient-to-br from-pixel-bg to-pixel-border/20 flex justify-center items-center h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="pixel-art max-w-full max-h-full object-contain hover:scale-110 transition-transform duration-300"
                    style={{ imageRendering: 'pixelated' }}
                  />
                </div>

                {/* Item Info */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-pixel-text group-hover:text-pixel-primary transition-colors">
                      {item.title}
                    </h3>
                    <span className="text-xs text-pixel-secondary bg-pixel-secondary/20 px-2 py-1 border border-pixel-secondary">
                      {item.category}
                    </span>
                  </div>
                  
                  <p className="text-pixel-text/70 text-sm mb-4 line-clamp-2">
                    {item.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.tags.map(tag => (
                      <span key={tag} className="text-xs text-pixel-accent bg-pixel-accent/20 px-2 py-1 border border-pixel-accent">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action */}
                  <div className="flex justify-end items-center text-xs text-pixel-text/60">
                    <span className="text-pixel-primary">CLICK TO VIEW</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          </motion.div>
        )}

        {/* Modal */}
        <AnimatePresence>
          {selectedItem && (
            <motion.div
              className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
            >
              <motion.div
                className="bg-pixel-bg border-2 border-pixel-primary max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="flex justify-between items-center p-6 border-b border-pixel-border">
                  <h3 className="text-2xl font-bold text-pixel-primary">{selectedItem.title}</h3>
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="text-pixel-text hover:text-pixel-primary transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Modal Content */}
                <div className="p-6">
                  {/* Large Image Display */}
                  <div className="bg-gradient-to-br from-pixel-bg to-pixel-border/20 p-8 mb-6 flex justify-center">
                    <img
                      src={selectedItem.image}
                      alt={selectedItem.title}
                      className="pixel-art max-w-full max-h-96 object-contain"
                      style={{ imageRendering: 'pixelated' }}
                    />
                  </div>

                  {/* Description */}
                  <p className="text-pixel-text/80 mb-6 leading-relaxed">
                    {selectedItem.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedItem.tags.map(tag => (
                      <span key={tag} className="text-sm text-pixel-accent bg-pixel-accent/20 px-3 py-1 border border-pixel-accent">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex justify-end items-center">
                    <button className="pixel-btn flex items-center gap-2">
                      <ExternalLink size={16} />
                      VIEW FULL SIZE
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
