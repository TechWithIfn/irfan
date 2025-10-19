import React from 'react'
import Section from '../components/Section'
import { motion } from 'framer-motion'
import { education } from '../data/education'

export default function Education() {
  return (
    <Section id="education" title="Education" subtitle="Where I studied" className="bg-white dark:bg-slate-950">
      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-px bg-slate-300/30" />
        <div className="space-y-8">
          {education.map((ed) => (
            <motion.div key={ed.institute} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }} className="relative ml-10">
              <div className="absolute -left-[34px] h-3 w-3 rounded-full bg-primary-500" />
              <div className="rounded-2xl border border-slate-200/20 dark:border-slate-700/40 p-6 bg-white/50 dark:bg-slate-900/40">
                <h3 className="font-semibold">{ed.degree}</h3>
                <div className="opacity-80 text-sm">{ed.institute} · {ed.year} {ed.cgpa ? `· ${ed.cgpa}` : ''}</div>
                <div className="mt-3 flex flex-wrap gap-2 text-xs">
                  {ed.coursework.map(c => <span key={c} className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800">{c}</span>)}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}
