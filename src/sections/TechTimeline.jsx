import React from 'react'
import Section from '../components/Section'
import { motion } from 'framer-motion'
import { timeline } from '../data/achievements'

export default function TechTimeline() {
  return (
    <Section id="timeline" title="Tech Timeline" subtitle="Journey so far" className="bg-slate-50 dark:bg-slate-950">
      <div className="overflow-x-auto">
        <div className="min-w-[720px] flex items-start gap-10 relative">
          <div className="absolute left-0 right-0 top-3 h-px bg-slate-300/30" />
          {timeline.map((t, idx) => (
            <motion.div key={t.year} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: idx * 0.03 }} viewport={{ once: true }}
              className="relative pt-6">
              <div className="absolute top-2 left-1/2 -translate-x-1/2 h-3 w-3 rounded-full bg-primary-500" />
              <div className="rounded-xl p-4 border border-slate-200/20 dark:border-slate-700/40 bg-white/60 dark:bg-slate-900/40 min-w-[200px]">
                <div className="text-sm opacity-80">{t.year}</div>
                <div className="font-medium">{t.text}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}
