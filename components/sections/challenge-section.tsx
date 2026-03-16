'use client'

import { useState } from 'react'
import { CHALLENGE_BUSINESSES, getChallengeStats, formatCurrency, type Business } from '@/lib/challenge-data'
import { SectionHeader } from '@/components/ui/section-header'
import { CheckCircle2, Circle, Loader2, Lock, TrendingUp, Target, Calendar } from 'lucide-react'

const GREEN = '#00FF41'
const GREEN_DIM = 'rgba(0,255,65,0.4)'

function ProgressBar({ value, max }: { value: number; max: number }) {
  const pct = Math.min((value / max) * 100, 100)
  return (
    <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-1000"
        style={{ width: `${pct}%`, backgroundColor: GREEN, boxShadow: `0 0 8px ${GREEN}80` }}
      />
    </div>
  )
}

function StatusIcon({ status }: { status: Business['status'] }) {
  if (status === 'completed') return <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: GREEN }} />
  if (status === 'in_progress') return <Loader2 className="w-4 h-4 flex-shrink-0 animate-spin" style={{ color: GREEN }} />
  return <Lock className="w-4 h-4 flex-shrink-0 text-white/20" />
}

function BusinessCard({ business, isSelected, onClick }: {
  business: Business
  isSelected: boolean
  onClick: () => void
}) {
  const isLocked = business.status === 'upcoming'
  const pct = business.target > 0 ? Math.min((business.revenue / business.target) * 100, 100) : 0

  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-3 sm:p-4 border transition-all duration-200 ${
        isSelected
          ? 'border-[#00FF41]/40 bg-[#00FF41]/5'
          : 'border-white/5 bg-white/2 hover:border-white/15 hover:bg-white/5'
      } ${isLocked ? 'opacity-40' : ''}`}
    >
      <div className="flex items-center gap-3 mb-2">
        <span
          className="text-[10px] font-mono font-bold px-2 py-0.5 border"
          style={{
            color: isSelected ? GREEN : 'rgba(255,255,255,0.3)',
            borderColor: isSelected ? GREEN + '40' : 'rgba(255,255,255,0.1)',
          }}
        >
          M{String(business.month).padStart(2, '0')}
        </span>
        <StatusIcon status={business.status} />
        <span className={`text-sm font-bold truncate ${isLocked ? 'text-white/30' : 'text-white'}`}>
          {business.name}
        </span>
      </div>
      <ProgressBar value={business.revenue} max={business.target} />
      <div className="flex justify-between items-center mt-1.5">
        <span className="text-[10px] font-mono" style={{ color: GREEN_DIM }}>
          {formatCurrency(business.revenue)}
        </span>
        <span className="text-[10px] font-mono text-white/20">
          / {formatCurrency(business.target)}
        </span>
      </div>
    </button>
  )
}

function BusinessDetail({ business }: { business: Business }) {
  const pct = business.target > 0 ? Math.min((business.revenue / business.target) * 100, 100) : 0
  const isLocked = business.status === 'upcoming'

  const statusLabel = {
    completed: 'TERMINÉ',
    in_progress: 'EN COURS',
    upcoming: 'VERROUILLÉ',
  }[business.status]

  const statusColor = {
    completed: GREEN,
    in_progress: GREEN,
    upcoming: 'rgba(255,255,255,0.2)',
  }[business.status]

  return (
    <div className="border border-white/10 bg-black/40 p-6 h-full">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono tracking-widest" style={{ color: GREEN_DIM }}>
              MOIS {String(business.month).padStart(2, '0')} / 12
            </span>
            <span
              className="text-[9px] font-mono font-bold px-2 py-0.5 border"
              style={{ color: statusColor, borderColor: statusColor + '40' }}
            >
              {statusLabel}
            </span>
          </div>
          <h3 className="text-2xl font-black text-white tracking-tight">
            {isLocked ? '???' : business.name}
          </h3>
        </div>
        <div className="text-right">
          <div className="text-2xl font-mono font-bold" style={{ color: GREEN }}>
            {formatCurrency(business.revenue)}
          </div>
          <div className="text-[10px] text-white/30 font-mono">revenus</div>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-white/50 leading-relaxed mb-6">
        {isLocked ? 'Ce business sera révélé dans une prochaine vidéo YouTube.' : business.description}
      </p>

      {/* Stats grid */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="border border-white/5 p-3 text-center">
          <Target className="w-4 h-4 mx-auto mb-1 text-white/30" />
          <div className="text-sm font-mono font-bold text-white">{formatCurrency(business.target)}</div>
          <div className="text-[9px] text-white/30 uppercase tracking-wider">Objectif</div>
        </div>
        <div className="border border-white/5 p-3 text-center">
          <TrendingUp className="w-4 h-4 mx-auto mb-1" style={{ color: pct > 0 ? GREEN : 'rgba(255,255,255,0.3)' }} />
          <div className="text-sm font-mono font-bold" style={{ color: pct > 0 ? GREEN : 'rgba(255,255,255,0.3)' }}>
            {pct.toFixed(0)}%
          </div>
          <div className="text-[9px] text-white/30 uppercase tracking-wider">Progression</div>
        </div>
        <div className="border border-white/5 p-3 text-center">
          <Calendar className="w-4 h-4 mx-auto mb-1 text-white/30" />
          <div className="text-xs font-mono font-bold text-white/60">{business.startDate}</div>
          <div className="text-[9px] text-white/30 uppercase tracking-wider">Début</div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-2">
        <div className="flex justify-between text-[10px] font-mono mb-1.5">
          <span style={{ color: GREEN_DIM }}>Progression</span>
          <span className="text-white/30">{pct.toFixed(1)}%</span>
        </div>
        <ProgressBar value={business.revenue} max={business.target} />
      </div>

      {/* Category tag */}
      <div className="mt-4">
        <span className="text-[10px] font-mono tracking-widest text-white/20 uppercase">
          # {business.category}
        </span>
      </div>
    </div>
  )
}

export function ChallengeSection() {
  const [selectedMonth, setSelectedMonth] = useState(1)
  const stats = getChallengeStats()
  const selected = CHALLENGE_BUSINESSES.find((b) => b.month === selectedMonth) ?? CHALLENGE_BUSINESSES[0]
  const overallPct = (stats.totalRevenue / stats.totalTarget) * 100

  return (
    <section id="challenge" className="relative bg-black py-20 px-4 sm:px-6">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `linear-gradient(rgba(0,255,65,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,65,0.05) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        <SectionHeader
          tag="// défi en cours"
          title="12 MOIS, 12 BUSINESSES"
          subtitle="Chaque mois, un nouveau business est lancé, documenté et chiffré en temps réel."
        />

        {/* Global stats bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {[
            { label: 'Revenus cumulés', value: formatCurrency(stats.totalRevenue), accent: true },
            { label: 'Objectif final', value: formatCurrency(stats.totalTarget), accent: false },
            { label: 'Mois en cours', value: `${stats.currentMonth} / 12`, accent: true },
            { label: 'Terminés', value: `${stats.businessesCompleted}`, accent: false },
          ].map((stat) => (
            <div key={stat.label} className="border border-white/10 bg-white/2 p-4 text-center">
              <div
                className="text-xl md:text-2xl font-mono font-bold mb-1"
                style={{ color: stat.accent ? GREEN : 'white' }}
              >
                {stat.value}
              </div>
              <div className="text-[10px] tracking-widest text-white/30 uppercase">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Global progress */}
        <div className="mb-10">
          <div className="flex justify-between text-[10px] font-mono mb-2">
            <span style={{ color: GREEN_DIM }}>Progression globale vers €1M</span>
            <span className="text-white/30">{overallPct.toFixed(2)}%</span>
          </div>
          <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-1000"
              style={{
                width: `${Math.max(overallPct, 0.5)}%`,
                backgroundColor: GREEN,
                boxShadow: `0 0 12px ${GREEN}60`,
              }}
            />
          </div>
        </div>

        {/* Main grid: list + detail */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Business list */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-2">
            {CHALLENGE_BUSINESSES.map((b) => (
              <BusinessCard
                key={b.month}
                business={b}
                isSelected={selectedMonth === b.month}
                onClick={() => setSelectedMonth(b.month)}
              />
            ))}
          </div>

          {/* Detail panel */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <BusinessDetail business={selected} />
          </div>
        </div>
      </div>
    </section>
  )
}
