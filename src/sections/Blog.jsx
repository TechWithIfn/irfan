import React, { useState } from 'react'
import Section from '../components/Section'
import { motion } from 'framer-motion'
import { categories, posts } from '../data/blog'

export default function Blog() {
  const [filter, setFilter] = useState('All')
  const filtered = filter === 'All' ? posts : posts.filter(p => p.tags.includes(filter))

  return (
    <Section id="blog" title="Blog" subtitle="Thoughts & tutorials" className="bg-white dark:bg-slate-950">
      <div className="flex flex-wrap gap-3 mb-6">
        {categories.map(c => (
          <button key={c} onClick={() => setFilter(c)} className={`px-3 py-1.5 rounded-full border ${filter === c ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'hover:border-primary-400'}`}>{c}</button>
        ))}
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((p) => (
          <motion.a key={p.title} href={p.link} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} viewport={{ once: true }}
            className="rounded-2xl border border-slate-200/20 dark:border-slate-700/40 p-6 bg-white/60 dark:bg-slate-900/40 hover:shadow-soft">
            <h3 className="font-semibold">{p.title}</h3>
            <p className="mt-1 text-sm opacity-80">{p.excerpt}</p>
            <div className="mt-3 flex flex-wrap gap-2 text-xs opacity-90">
              {p.tags.map(t => <span key={t} className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800">{t}</span>)}
            </div>
            <div className="mt-4 text-sm text-primary-500">Read more →</div>
          </motion.a>
        ))}
      </div>
    </Section>
  )
}
