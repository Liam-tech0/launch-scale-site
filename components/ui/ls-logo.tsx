export function LSLogo({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center select-none ${className}`}>
      <span className="font-black text-white leading-none tracking-tighter">L</span>
      <span className="font-black leading-none mx-1" style={{ color: '#00FF41' }}>/</span>
      <span className="font-black text-white leading-none tracking-tighter">S</span>
    </div>
  )
}
