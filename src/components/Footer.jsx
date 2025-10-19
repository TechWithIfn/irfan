import React from 'react'
import { Github, Linkedin, Mail } from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import { profile } from '../data/profile'

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-slate-200/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm opacity-80">© 2025 Irfan Ansari.</p>
        <div className="flex items-center gap-5">
          <a href="#home" className="hover:text-primary-400">Home</a>
          <a href="#projects" className="hover:text-primary-400">Projects</a>
          <a href="#blog" className="hover:text-primary-400">Blog</a>
          <a href="#contact" className="hover:text-primary-400">Contact</a>
          <span className="h-5 w-px bg-slate-300/30" />
          <a href={profile.github} aria-label="GitHub" className="hover:text-primary-400"><Github size={18} /></a>
          <a href={profile.linkedin} aria-label="LinkedIn" className="hover:text-primary-400"><Linkedin size={18} /></a>
          <a href={`mailto:${profile.email}`} aria-label="Email" className="hover:text-primary-400"><Mail size={18} /></a>
          <ThemeToggle />
        </div>
      </div>
    </footer>
  )
}
