const GREEN = '#00FF41'
const GREEN_DIM = 'rgba(0,255,65,0.5)'

interface SectionHeaderProps {
  tag: string
  title: string
  subtitle?: string
}

export function SectionHeader({ tag, title, subtitle }: SectionHeaderProps) {
  return (
    <div className="mb-10">
      <span className="text-[11px] font-mono tracking-widest uppercase mb-3 block" style={{ color: GREEN_DIM }}>
        {tag}
      </span>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4 leading-none">
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm md:text-base text-white/40 max-w-xl leading-relaxed">{subtitle}</p>
      )}
      <div className="mt-4 h-px w-16" style={{ backgroundColor: GREEN }} />
    </div>
  )
}
