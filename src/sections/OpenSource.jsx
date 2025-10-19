import React from 'react'
import Section from '../components/Section'
import { motion } from 'framer-motion'
import { profile } from '../data/profile'
import { Github } from 'lucide-react'

export default function OpenSource() {
  return (
    <Section id="open-source" title="Open Source" subtitle="Code & contributions" className="bg-white dark:bg-slate-950">
      <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}
        className="rounded-2xl border border-slate-200/20 dark:border-slate-700/40 p-6 bg-white/60 dark:bg-slate-900/40">
        <div className="aspect-[16/6] rounded-xl bg-slate-100 dark:bg-slate-900 grid place-items-center opacity-70 mb-4">GitHub Contribution Graph Placeholder</div>
        <div className="flex items-center gap-3">
          <a href={profile.github} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 text-white dark:bg-white dark:text-slate-900"><Github size={18}/> View GitHub Profile</a>
        </div>
      </motion.div>
    </Section>
  )
}
