import React, { useEffect, useState } from 'react'
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import { profile } from '../data/profile'

const links = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#education', label: 'Education' },
  { href: '#blog', label: 'Blog' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all ${scrolled ? 'backdrop-blur bg-white/60 dark:bg-slate-900/60 shadow-soft' : 'bg-transparent'}`}>
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="#home" className="font-semibold text-lg tracking-tight">IA<span className="text-primary-500">.</span></a>
        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-primary-400 transition-colors">{l.label}</a>
          ))}
          <div className="h-6 w-px bg-slate-300/40 dark:bg-slate-600/40" />
          <a href={profile.github} aria-label="GitHub" className="hover:text-primary-400"><Github size={20} /></a>
          <a href={profile.linkedin} aria-label="LinkedIn" className="hover:text-primary-400"><Linkedin size={20} /></a>
          <a href={`mailto:${profile.email}`} aria-label="Email" className="hover:text-primary-400"><Mail size={20} /></a>
          <ThemeToggle />
        </div>
        <button className="md:hidden" onClick={() => setOpen(v => !v)} aria-label="Toggle menu">
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      {open && (
        <div className="md:hidden border-t border-slate-200/10 bg-white/80 dark:bg-slate-900/80 backdrop-blur">
          <div className="px-4 py-3 space-y-3">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="block" onClick={() => setOpen(false)}>{l.label}</a>
            ))}
            <div className="flex items-center gap-4 pt-2">
              <a href={profile.github} aria-label="GitHub" className="hover:text-primary-400"><Github size={20} /></a>
              <a href={profile.linkedin} aria-label="LinkedIn" className="hover:text-primary-400"><Linkedin size={20} /></a>
              <a href={`mailto:${profile.email}`} aria-label="Email" className="hover:text-primary-400"><Mail size={20} /></a>
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
