'use client'

import { Beams } from '@/components/ui/ethereal-beams-hero'
import { TextDisperse } from '@/components/ui/text-disperse'
import { LSLogo } from '@/components/ui/ls-logo'
import { ArrowDown } from 'lucide-react'
import { getChallengeStats, formatCurrency } from '@/lib/challenge-data'

const GREEN = '#00FF41'
const GREEN_DIM = 'rgba(0,255,65,0.5)'
const stats = getChallengeStats()

export function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen w-full overflow-hidden bg-black font-mono">
      {/* Terminal scanlines */}
      <div className="terminal-scanline absolute inset-0 z-10 pointer-events-none" />

      {/* 3D Beams background */}
      <div className="absolute inset-0 z-0">
        <Beams
          beamWidth={2.5}
          beamHeight={18}
          beamNumber={10}
          lightColor={GREEN}
          speed={2}
          noiseIntensity={1.5}
          scale={0.15}
          rotation={40}
        />
      </div>

      {/* Dark gradient */}
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-black/80 via-black/20 to-black/50 pointer-events-none" />

      {/* Top chrome bar */}
      <div className="relative z-20 w-full border-b border-white/10 bg-black/60 backdrop-blur-sm">
        <div className="flex items-center justify-between px-4 h-8">
          {/* Left: dots + title */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
              <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
              <div className="w-3 h-3 rounded-full bg-[#28C840]" />
            </div>
            <span className="text-xs tracking-widest" style={{ color: GREEN_DIM }}>
              launch_and_scale.sh
            </span>
          </div>
          {/* Right: pill nav */}
          <nav className="hidden sm:flex items-center gap-1 border border-white/10 rounded-full bg-black/60 backdrop-blur-md px-2 py-1 font-[family-name:var(--font-rubik)]">
            {[
              { label: 'Le Défi', href: '#challenge' },
              { label: 'Vidéos', href: '#videos' },
              { label: 'Contact', href: '#contact' },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="px-3 py-1 text-[11px] font-semibold tracking-widest uppercase text-white/40 hover:text-white rounded-full hover:bg-white/5 transition-all duration-200"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#videos"
              className="ml-1 px-4 py-1 text-[11px] font-bold tracking-widest uppercase rounded-full transition-all duration-200"
              style={{ backgroundColor: GREEN, color: '#000' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
                e.currentTarget.style.color = GREEN
                e.currentTarget.style.border = `1px solid ${GREEN}`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = GREEN
                e.currentTarget.style.color = '#000'
                e.currentTarget.style.border = '1px solid transparent'
              }}
            >
              Vidéos
            </a>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-[calc(100vh-3.5rem)] px-6">
        <LSLogo className="text-[clamp(5rem,15vw,10rem)] mb-2" />

        <p className="text-xs tracking-[0.5em] uppercase mb-8" style={{ color: GREEN_DIM }}>
          launch &amp; scale
        </p>

        <div className="w-[min(620px,88vw)] mb-3">
          <TextDisperse className="text-[clamp(1.8rem,6vw,4.5rem)] font-black text-white tracking-tighter">
            LAUNCH&SCALE
          </TextDisperse>
        </div>

        <p className="text-[10px] tracking-widest mb-10" style={{ color: GREEN_DIM }}>
          // hover pour animer
        </p>

        <p className="text-center text-sm md:text-base text-white/60 max-w-lg leading-relaxed mb-4 tracking-wide">
          2 étudiants. 12 mois. 12 businesses.<br />
          Objectif : <span style={{ color: GREEN }} className="font-bold">1 000 000 €</span>. Documenté sur YouTube.
        </p>

        {/* Month / Revenue counters */}
        <div className="flex items-center gap-8 mb-10 font-mono text-center">
          <div>
            <div className="text-2xl font-bold" style={{ color: GREEN }}>
              {String(stats.currentMonth).padStart(2, '0')}
            </div>
            <div className="text-[10px] tracking-widest text-white/30 uppercase">Mois en cours</div>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div>
            <div className="text-2xl font-bold" style={{ color: GREEN }}>12</div>
            <div className="text-[10px] tracking-widest text-white/30 uppercase">Total mois</div>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div>
            <div className="text-2xl font-bold text-white">{formatCurrency(stats.totalRevenue)}</div>
            <div className="text-[10px] tracking-widest text-white/30 uppercase">Revenus cumulés</div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 mb-12">
          <a
            href="#videos"
            className="px-8 py-3 text-sm font-bold tracking-widest uppercase border transition-all duration-300"
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
            Voir les vidéos
          </a>
          <a
            href="#challenge"
            className="px-8 py-3 text-sm font-bold tracking-widest uppercase border transition-all duration-300"
            style={{ borderColor: 'rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.6)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = GREEN
              e.currentTarget.style.color = GREEN
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'
              e.currentTarget.style.color = 'rgba(255,255,255,0.6)'
            }}
          >
            Suivre le défi
          </a>
        </div>

        {/* Scroll hint */}
        <a
          href="#challenge"
          className="flex flex-col items-center gap-1 text-white/20 hover:text-white/50 transition-colors duration-300"
        >
          <span className="text-[10px] tracking-widest uppercase">Scroll</span>
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </a>
      </div>

      {/* Bottom status bar */}
      <div className="relative z-20 w-full border-t border-white/10 bg-black/60 backdrop-blur-sm">
        <div className="flex items-center justify-between px-4 h-6">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold" style={{ color: GREEN }}>▶ RUNNING</span>
            <span className="cursor-blink text-[10px] font-bold" style={{ color: GREEN }}>|</span>
          </div>
          <span className="text-[10px] tracking-widest" style={{ color: GREEN_DIM }}>
            L&amp;S // 2025
          </span>
        </div>
      </div>
    </section>
  )
}
