import React, { useState } from 'react'
import Section from '../components/Section'
import { motion } from 'framer-motion'
import { profile } from '../data/profile'

export default function Contact() {
  const [status, setStatus] = useState('idle')

  const onSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    try {
      // Replace with your Formspree/EmailJS endpoint
      const form = e.currentTarget
      const data = new FormData(form)
      await fetch('https://formspree.io/f/your-id', { method: 'POST', body: data, headers: { Accept: 'application/json' } })
      setStatus('success')
      form.reset()
    } catch (e) {
      setStatus('error')
    }
  }

  return (
    <Section id="contact" title="Contact" subtitle="Let's build something" className="bg-white dark:bg-slate-950">
      <div className="grid md:grid-cols-2 gap-8">
        <motion.form onSubmit={onSubmit} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}
          className="rounded-2xl p-6 border border-slate-200/20 dark:border-slate-700/40 bg-white/60 dark:bg-slate-900/40">
          <div className="grid grid-cols-1 gap-4">
            <input required name="name" placeholder="Your Name" className="px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 outline-none focus:ring-2 ring-primary-400" />
            <input required type="email" name="email" placeholder="Email" className="px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 outline-none focus:ring-2 ring-primary-400" />
            <textarea required name="message" placeholder="Message" rows={5} className="px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 outline-none focus:ring-2 ring-primary-400"></textarea>
            <button disabled={status==='loading'} className="px-5 py-3 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:opacity-95">
              {status==='loading' ? 'Sending…' : 'Send Message'}
            </button>
            {status==='success' && <p className="text-green-500 text-sm">Thanks! I'll get back to you soon.</p>}
            {status==='error' && <p className="text-red-500 text-sm">Something went wrong. Try again.</p>}
          </div>
        </motion.form>
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.05 }} viewport={{ once: true }}>
          <div className="rounded-2xl p-6 border border-slate-200/20 dark:border-slate-700/40 bg-white/60 dark:bg-slate-900/40">
            <h3 className="font-semibold mb-2">Reach me directly</h3>
            <p className="text-sm opacity-80">Email: <a className="text-primary-500" href={`mailto:${profile.email}`}>{profile.email}</a></p>
            <p className="text-sm opacity-80 mt-1">GitHub: <a className="text-primary-500" href={profile.github}>Profile</a></p>
            <p className="text-sm opacity-80 mt-1">LinkedIn: <a className="text-primary-500" href={profile.linkedin}>Profile</a></p>
            <div className="mt-6 aspect-[16/10] rounded-xl bg-slate-100 dark:bg-slate-900 grid place-items-center opacity-70">Map/Illustration</div>
          </div>
        </motion.div>
      </div>
    </Section>
  )
}
