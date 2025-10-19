import React from 'react'
import { motion } from 'framer-motion'

export default function Section({ id, title, subtitle, children, className = '' }) {
  const sectionVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      rotateX: -5,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      }
    }
  }

  return (
    <motion.section 
      id={id} 
      className={`py-20 sm:py-28 scroll-mt-24 ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={sectionVariants}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {(title || subtitle) && (
          <motion.div 
            className="mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {subtitle && (
              <motion.p 
                className="uppercase tracking-widest text-xs text-primary-400 mb-2"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                {subtitle}
              </motion.p>
            )}
            {title && (
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-violet-600 to-slate-900 dark:from-slate-100 dark:via-fuchsia-400 dark:to-slate-100">
                {title}
              </h2>
            )}
          </motion.div>
        )}
        {children}
      </div>
    </motion.section>
  )
}
