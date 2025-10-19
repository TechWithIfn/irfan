import React from 'react'
import Section from '../components/Section'
import { motion } from 'framer-motion'
import { certifications } from '../data/certifications'

export default function Certifications() {
  return (
    <Section id="certifications" title="Certifications" subtitle="Proof of learning" className="bg-slate-50 dark:bg-slate-950">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {certifications.map((c) => (
          <motion.div key={c.title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}
            className="rounded-2xl border border-slate-200/20 dark:border-slate-700/40 p-6 bg-white/60 dark:bg-slate-900/40">
            <div className="aspect-[16/9] rounded-xl bg-slate-100 dark:bg-slate-900 grid place-items-center text-sm opacity-70 mb-4">{c.org} Logo</div>
            <h3 className="font-semibold">{c.title}</h3>
            <p className="text-sm opacity-80">{c.org}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
