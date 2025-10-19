import React, { useMemo, useState } from 'react'
import Section from '../components/Section'
import { motion } from 'framer-motion'
import { categories, featuredProject, projects } from '../data/projects'
import { Github, ExternalLink } from 'lucide-react'

export default function Projects() {
  const [filter, setFilter] = useState('All')
  const filtered = useMemo(() => filter === 'All' ? projects : projects.filter(p => p.category === filter), [filter])

  return (
    <Section id="projects" title="Projects" subtitle="Things I've built" className="bg-white dark:bg-slate-950">
      {/* Featured */}
      <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}
        className="relative mb-10 overflow-hidden rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-sky-500/15 via-violet-500/15 to-pink-500/15 border border-slate-200/20 dark:border-slate-700/40">
        <div className="grid md:grid-cols-2 gap-6 items-center">
          <div>
            <h3 className="text-2xl font-semibold">{featuredProject.title}</h3>
            <p className="mt-2 text-sm opacity-80">{featuredProject.description}</p>
            <div className="mt-3 flex flex-wrap gap-2 text-xs opacity-90">
              {featuredProject.tech.map(t => <span key={t} className="px-2 py-1 rounded bg-white/50 dark:bg-slate-900/50 border border-slate-200/20 dark:border-slate-700/40">{t}</span>)}
            </div>
            <div className="mt-4 flex items-center gap-3">
              <a className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900" href={featuredProject.live}><ExternalLink size={16}/> Live</a>
              <a className="inline-flex items-center gap-1 px-3 py-2 rounded-lg border hover:border-primary-400" href={featuredProject.github}><Github size={16}/> GitHub</a>
            </div>
          </div>
          <div>
            <div className="aspect-[16/10] rounded-2xl bg-slate-100 dark:bg-slate-900 grid place-items-center opacity-80">Featured Image</div>
          </div>
        </div>
      </motion.div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        {categories.map(c => (
          <button key={c} onClick={() => setFilter(c)} className={`px-3 py-1.5 rounded-full border ${filter === c ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'hover:border-primary-400'}`}>{c}</button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((p, idx) => (
          <motion.div 
            key={p.title} 
            initial={{ opacity: 0, rotateY: -15, y: 30 }} 
            whileInView={{ opacity: 1, rotateY: 0, y: 0 }} 
            transition={{ duration: 0.6, delay: idx * 0.08, type: "spring", stiffness: 100 }} 
            viewport={{ once: true }}
            whileHover={{ 
              scale: 1.03,
              rotateY: 5,
              rotateX: 3,
              z: 50,
              transition: { duration: 0.3 }
            }}
            className="group overflow-hidden rounded-2xl border border-slate-200/20 dark:border-slate-700/40 bg-white/50 dark:bg-slate-900/40 hover:shadow-glow card-tilt-3d relative"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="aspect-[16/10] bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 grid place-items-center relative overflow-hidden">
              <div className="absolute inset-0 shimmer-effect opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <motion.div 
                className="text-4xl"
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                💻
              </motion.div>
            </div>
            <div className="p-5 relative z-10">
              <h4 className="font-semibold">{p.title}</h4>
              <p className="mt-1 text-sm opacity-80">{p.description}</p>
              <div className="mt-3 flex items-center gap-3 text-sm">
                <a href={p.live} data-magnetic className="inline-flex items-center gap-1 hover:text-primary-400 color-shift"><ExternalLink size={16}/> Live</a>
                <a href={p.github} data-magnetic className="inline-flex items-center gap-1 hover:text-primary-400 color-shift"><Github size={16}/> GitHub</a>
              </div>
            </div>
            {/* Glow edge on hover */}
            <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute inset-0 bg-gradient-to-tr from-violet-500/10 via-fuchsia-500/10 to-pink-500/10" />
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
