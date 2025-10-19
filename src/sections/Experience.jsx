import React from 'react'
import Section from '../components/Section'
import { motion } from 'framer-motion'
import { experiences } from '../data/experience'

export default function Experience() {
  return (
    <Section id="experience" title="Experience" subtitle="What I've done" className="bg-slate-50 dark:bg-slate-950">
      <div className="space-y-6">
        {experiences.map((e) => (
          <motion.div key={e.company} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}
            className="rounded-2xl border border-slate-200/20 dark:border-slate-700/40 p-6 bg-white/50 dark:bg-slate-900/40">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 className="font-semibold">{e.role} — {e.company}</h3>
              </div>
              <div className="text-sm opacity-80">{e.duration}</div>
            </div>
            <ul className="mt-3 list-disc pl-5 space-y-1 text-sm">
              {e.points.map((p) => <li key={p}>{p}</li>)}
            </ul>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
