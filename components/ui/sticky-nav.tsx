'use client'

import { useEffect, useState } from 'react'
import { LSLogo } from '@/components/ui/ls-logo'

const GREEN = '#00FF41'

const NAV_LINKS = [
  { label: 'Le Défi', href: '#challenge' },
  { label: 'Vidéos', href: '#videos' },
  { label: 'Contact', href: '#contact' },
]

export function StickyNav() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        visible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      } border-b border-white/10 bg-black/90 backdrop-blur-md`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-12">
        <a href="#hero" className="flex items-center gap-1.5">
          <span className="text-base font-black text-white">L</span>
          <span className="text-base font-black" style={{ color: GREEN }}>/</span>
          <span className="text-base font-black text-white">S</span>
        </a>

        <div className="flex items-center gap-6">
          {NAV_LINKS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-xs font-mono tracking-widest uppercase text-white/40 hover:text-white transition-colors duration-200 hidden sm:block"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#videos"
            className="px-4 py-1.5 text-xs font-bold tracking-widest uppercase border transition-all duration-200"
            style={{ borderColor: GREEN, color: '#000', backgroundColor: GREEN }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
              e.currentTarget.style.color = GREEN
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = GREEN
              e.currentTarget.style.color = '#000'
            }}
          >
            Vidéos
          </a>
        </div>
      </div>
    </nav>
  )
}
