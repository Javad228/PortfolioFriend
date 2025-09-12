'use client'

import React, { useState, useEffect } from 'react'
import { useUser } from '@auth0/nextjs-auth0/client'
import { motion } from 'framer-motion'
import { Plus, Save, Trash2, LogOut, Eye } from 'lucide-react'

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

export default function Dashboard() {
  const { user, isLoading } = useUser()
  const [config, setConfig] = useState<PortfolioConfig>({ projects: [] })
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    loadConfig()
  }, [])

  const loadConfig = async () => {
    try {
      const response = await fetch('/portfolio-config.json')
      const data = await response.json()
      setConfig(data)
    } catch (error) {
      console.error('Failed to load config:', error)
      setMessage('Failed to load configuration')
    }
  }

  const saveConfig = async () => {
    setIsSaving(true)
    try {
      const response = await fetch('/api/save-config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(config),
      })

      const result = await response.json()
      
      if (response.ok) {
        setMessage('✅ Configuration saved successfully! Changes will be live in ~2 minutes.')
      } else {
        setMessage(`❌ Failed to save: ${result.error}`)
      }
    } catch (error) {
      setMessage('❌ Failed to save configuration')
    } finally {
      setIsSaving(false)
    }
  }

  const addProject = () => {
    const newProject: Project = {
      id: Math.max(0, ...config.projects.map(p => p.id)) + 1,
      projectName: 'New Project',
      projectDescription: 'Project description',
      projectColor: 'primary',
      items: []
    }
    setConfig({ projects: [...config.projects, newProject] })
  }

  const updateProject = (projectId: number, updates: Partial<Project>) => {
    setConfig({
      projects: config.projects.map(p => 
        p.id === projectId ? { ...p, ...updates } : p
      )
    })
  }

  const deleteProject = (projectId: number) => {
    setConfig({
      projects: config.projects.filter(p => p.id !== projectId)
    })
  }

  const addItem = (projectId: number) => {
    const newItem: ConfigItem = {
      title: 'New Artwork',
      category: 'CHARACTER',
      description: 'Description of your artwork',
      imagePath: 'project_folder/image.png',
      tags: ['TAG1', 'TAG2']
    }
    
    updateProject(projectId, {
      items: [...(config.projects.find(p => p.id === projectId)?.items || []), newItem]
    })
  }

  const updateItem = (projectId: number, itemIndex: number, updates: Partial<ConfigItem>) => {
    const project = config.projects.find(p => p.id === projectId)
    if (!project) return
    
    const updatedItems = [...project.items]
    updatedItems[itemIndex] = { ...updatedItems[itemIndex], ...updates }
    
    updateProject(projectId, { items: updatedItems })
  }

  const deleteItem = (projectId: number, itemIndex: number) => {
    const project = config.projects.find(p => p.id === projectId)
    if (!project) return
    
    const updatedItems = project.items.filter((_, i) => i !== itemIndex)
    updateProject(projectId, { items: updatedItems })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-pixel-bg flex items-center justify-center">
        <div className="text-pixel-primary text-xl">Loading...</div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-pixel-bg flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-pixel-primary mb-4">🎮 PORTFOLIO ADMIN</h1>
          <p className="text-pixel-text/80 mb-8">Please log in to manage your portfolio</p>
          <motion.a
            href="/api/auth/login"
            className="pixel-btn text-lg px-8 py-4"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Login with Auth0
          </motion.a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-pixel-bg text-pixel-text p-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="flex justify-between items-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div>
            <h1 className="text-4xl font-bold text-pixel-primary mb-2">
              🎮 PORTFOLIO DASHBOARD
            </h1>
            <p className="text-pixel-text/80">
              Welcome back, {user.name}!
            </p>
          </div>
          
          <motion.a
            href="/api/auth/logout"
            className="pixel-btn bg-pixel-secondary border-pixel-secondary hover:bg-pixel-bg hover:text-pixel-secondary flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <LogOut size={16} />
            Logout
          </motion.a>
        </motion.div>
        
        {message && (
          <div className="mb-8 p-4 border-2 border-pixel-primary bg-pixel-primary/10 rounded">
            {message}
          </div>
        )}

        <div className="flex gap-4 mb-8 justify-center">
          <motion.button
            onClick={addProject}
            className="pixel-btn flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus size={16} />
            Add Project
          </motion.button>
          
          <motion.button
            onClick={saveConfig}
            disabled={isSaving}
            className="pixel-btn bg-pixel-secondary border-pixel-secondary hover:bg-pixel-bg hover:text-pixel-secondary flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Save size={16} />
            {isSaving ? 'Saving...' : 'Save Changes'}
          </motion.button>
          
          <motion.a
            href="/"
            className="pixel-btn bg-pixel-accent border-pixel-accent hover:bg-pixel-bg hover:text-pixel-accent flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Eye size={16} />
            View Portfolio
          </motion.a>
        </div>

        <div className="space-y-8">
          {config.projects.map((project) => (
            <motion.div
              key={project.id}
              className="bg-pixel-bg/50 border-2 border-pixel-border p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex-1 space-y-4">
                  <div>
                    <label className="block text-sm font-bold mb-2">Project Name:</label>
                    <input
                      type="text"
                      value={project.projectName}
                      onChange={(e) => updateProject(project.id, { projectName: e.target.value })}
                      className="w-full bg-pixel-bg border-2 border-pixel-border focus:border-pixel-primary text-pixel-text px-3 py-2 font-mono text-sm"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold mb-2">Description:</label>
                    <input
                      type="text"
                      value={project.projectDescription}
                      onChange={(e) => updateProject(project.id, { projectDescription: e.target.value })}
                      className="w-full bg-pixel-bg border-2 border-pixel-border focus:border-pixel-primary text-pixel-text px-3 py-2 font-mono text-sm"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold mb-2">Color Theme:</label>
                    <select
                      value={project.projectColor}
                      onChange={(e) => updateProject(project.id, { projectColor: e.target.value })}
                      className="bg-pixel-bg border-2 border-pixel-border focus:border-pixel-primary text-pixel-text px-3 py-2 font-mono text-sm"
                    >
                      <option value="primary">Green</option>
                      <option value="secondary">Orange</option>
                      <option value="accent">Purple</option>
                    </select>
                  </div>
                </div>
                
                <motion.button
                  onClick={() => deleteProject(project.id)}
                  className="ml-4 p-2 text-red-400 hover:text-red-300 border-2 border-red-400 hover:border-red-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Trash2 size={16} />
                </motion.button>
              </div>

              <div className="mb-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-pixel-primary">Artworks</h3>
                  <motion.button
                    onClick={() => addItem(project.id)}
                    className="pixel-btn text-sm flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Plus size={14} />
                    Add Artwork
                  </motion.button>
                </div>
                
                <div className="space-y-4">
                  {project.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="bg-pixel-bg/30 border border-pixel-border p-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold mb-1">Title:</label>
                          <input
                            type="text"
                            value={item.title}
                            onChange={(e) => updateItem(project.id, itemIndex, { title: e.target.value })}
                            className="w-full bg-pixel-bg border border-pixel-border focus:border-pixel-primary text-pixel-text px-2 py-1 text-sm"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-xs font-bold mb-1">Category:</label>
                          <select
                            value={item.category}
                            onChange={(e) => updateItem(project.id, itemIndex, { category: e.target.value })}
                            className="w-full bg-pixel-bg border border-pixel-border focus:border-pixel-primary text-pixel-text px-2 py-1 text-sm"
                          >
                            <option value="ANIMATION">Animation</option>
                            <option value="CHARACTER">Character</option>
                            <option value="OBJECTS">Objects</option>
                            <option value="UI">UI Elements</option>
                            <option value="ENVIRONMENT">Environment</option>
                          </select>
                        </div>
                        
                        <div className="md:col-span-2">
                          <label className="block text-xs font-bold mb-1">Description:</label>
                          <textarea
                            value={item.description}
                            onChange={(e) => updateItem(project.id, itemIndex, { description: e.target.value })}
                            className="w-full bg-pixel-bg border border-pixel-border focus:border-pixel-primary text-pixel-text px-2 py-1 text-sm h-20 resize-none"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-xs font-bold mb-1">Image Path:</label>
                          <input
                            type="text"
                            value={item.imagePath}
                            onChange={(e) => updateItem(project.id, itemIndex, { imagePath: e.target.value })}
                            placeholder="project_folder/image.png"
                            className="w-full bg-pixel-bg border border-pixel-border focus:border-pixel-primary text-pixel-text px-2 py-1 text-sm"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-xs font-bold mb-1">Tags (comma separated):</label>
                          <input
                            type="text"
                            value={item.tags.join(', ')}
                            onChange={(e) => updateItem(project.id, itemIndex, { tags: e.target.value.split(',').map(t => t.trim()) })}
                            placeholder="TAG1, TAG2, TAG3"
                            className="w-full bg-pixel-bg border border-pixel-border focus:border-pixel-primary text-pixel-text px-2 py-1 text-sm"
                          />
                        </div>
                      </div>
                      
                      <div className="flex justify-end mt-4">
                        <motion.button
                          onClick={() => deleteItem(project.id, itemIndex)}
                          className="p-1 text-red-400 hover:text-red-300"
                          whileHover={{ scale: 1.1 }}
                        >
                          <Trash2 size={14} />
                        </motion.button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
