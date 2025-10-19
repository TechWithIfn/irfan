import React from 'react'
import Section from '../components/Section'
import { motion } from 'framer-motion'

export default function About() {
  return (
    <Section id="about" title="About" subtitle="Who am I?" className="bg-white dark:bg-slate-950">
      <div className="grid md:grid-cols-3 gap-8 items-start">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="md:col-span-2">
          <p className="leading-relaxed text-slate-700 dark:text-slate-300">
            I'm Irfan, a Computer Science student and full stack developer who loves building beautiful and scalable web apps. I'm passionate about learning, open-source, AI, and data-driven experiences. Currently experimenting with an AI-powered travel assistant for India.
          </p>
          <ul className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
            {['React', 'Node.js', 'Tailwind', 'Flask', 'Django', 'MongoDB', 'PostgreSQL', 'Git', 'Vercel'].map((t, idx) => (
              <motion.li 
                key={t} 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, x: 4 }}
                className="px-3 py-2 rounded-lg border border-slate-200/20 bg-slate-50 dark:bg-slate-900/40 dark:border-slate-700/40 hover:border-primary-400 transition-colors cursor-pointer magnetic-hover"
              >
                {t}
              </motion.li>
            ))}
          </ul>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.1 }} viewport={{ once: true }}>
          <div className="rounded-2xl bg-gradient-to-br from-sky-400/20 via-fuchsia-400/20 to-pink-400/20 p-1 card-3d magnetic-hover">
            <div className="aspect-square rounded-2xl bg-slate-100 dark:bg-slate-900 grid place-items-center text-sm opacity-80 relative overflow-hidden">
              <div className="absolute inset-0 shimmer-effect opacity-50" />
              <div className="relative z-10 text-center">
                <div className="text-6xl mb-2">👨‍💻</div>
                <div>Profile Photo</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  )
}
