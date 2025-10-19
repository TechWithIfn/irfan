import React from 'react'
import Section from '../components/Section'
import { motion } from 'framer-motion'
import { achievements } from '../data/achievements'
import { Award, Medal } from 'lucide-react'

const iconFor = (name) => name === 'trophy' ? <Award /> : <Medal />

export default function Achievements() {
  return (
    <Section id="achievements" title="Achievements" subtitle="Recognition" className="bg-slate-50 dark:bg-slate-950">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map(a => (
          <motion.div key={a.title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} viewport={{ once: true }}
            className="rounded-2xl border border-slate-200/20 dark:border-slate-700/40 p-6 bg-white/60 dark:bg-slate-900/40">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-sky-400/20 via-violet-400/20 to-pink-400/20 grid place-items-center">{iconFor(a.icon)}</div>
              <div>
                <h3 className="font-semibold">{a.title}</h3>
                <p className="text-sm opacity-80">{a.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
