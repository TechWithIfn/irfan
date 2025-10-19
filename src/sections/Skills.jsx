import React from 'react'
import Section from '../components/Section'
import { motion } from 'framer-motion'
import { skills } from '../data/skills'

const Card = ({ title, items, idx }) => (
  <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: idx * 0.08 }} viewport={{ once: true }}
    className="rounded-2xl p-6 border border-slate-200/20 bg-white/50 dark:bg-slate-900/40 dark:border-slate-700/40 backdrop-blur card-3d magnetic-hover glow-on-hover">
    <h3 className="font-semibold mb-4">{title}</h3>
    <div className="flex flex-wrap gap-2">
      {items.map((t) => (
        <motion.span 
          key={t} 
          whileHover={{ scale: 1.05, rotate: 2 }}
          className="px-3 py-1.5 rounded-full bg-gradient-to-r from-sky-400/20 via-violet-400/20 to-pink-400/20 border border-slate-200/20 dark:border-slate-700/40 hover:shadow-glow transition cursor-pointer"
        >
          {t}
        </motion.span>
      ))}
    </div>
  </motion.div>
)

export default function Skills() {
  return (
    <Section id="skills" title="Skills" subtitle="What I use" className="bg-slate-50 dark:bg-slate-950">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card title="Frontend" items={skills.frontend} idx={0} />
        <Card title="Backend" items={skills.backend} idx={1} />
        <Card title="Database" items={skills.database} idx={2} />
        <Card title="Tools" items={skills.tools} idx={3} />
      </div>
    </Section>
  )
}
