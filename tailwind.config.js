/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Poppins', 'Montserrat', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'Apple Color Emoji', 'Segoe UI Emoji'],
      },
      colors: {
        primary: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81'
        },
      },
      backgroundImage: {
        'gradient-glow': 'radial-gradient(1200px 600px at 100% 0%, rgba(99,102,241,.15), transparent 60%), radial-gradient(1200px 600px at 0% 100%, rgba(236,72,153,.12), transparent 60%)',
        'grid': 'linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)'
      },
      boxShadow: {
        soft: '0 10px 30px rgba(0,0,0,0.12)',
        glow: '0 8px 40px rgba(99,102,241,.35), 0 4px 16px rgba(236,72,153,.25)'
      }
    },
  },
  plugins: [],
}
