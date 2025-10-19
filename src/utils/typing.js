import { useEffect, useState } from 'react'

export function useTyping(words, speed = 120, pause = 1200) {
  const [index, setIndex] = useState(0)
  const [display, setDisplay] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = words[index % words.length]
    let timeout

    if (!deleting) {
      if (display.length < current.length) {
        timeout = setTimeout(() => setDisplay(current.slice(0, display.length + 1)), speed)
      } else {
        timeout = setTimeout(() => setDeleting(true), pause)
      }
    } else {
      if (display.length > 0) {
        timeout = setTimeout(() => setDisplay(current.slice(0, display.length - 1)), speed / 1.8)
      } else {
        setDeleting(false)
        setIndex(prev => (prev + 1) % words.length)
      }
    }

    return () => clearTimeout(timeout)
  }, [display, deleting, index, words, speed, pause])

  return display
}
