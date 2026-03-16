import { Youtube, Twitter, Instagram } from 'lucide-react'

const GREEN = '#00FF41'
const GREEN_DIM = 'rgba(0,255,65,0.4)'

export function FooterSection() {
  const year = new Date().getFullYear()

  return (
    <footer id="contact" className="relative bg-black border-t border-white/10 py-12 px-4 sm:px-6 font-[family-name:var(--font-rubik)]">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl font-black text-white">L</span>
              <span className="text-xl font-black" style={{ color: GREEN }}>/</span>
              <span className="text-xl font-black text-white">S</span>
              <span className="text-xs font-mono tracking-widest text-white/30 ml-2 uppercase">
                Launch &amp; Scale
              </span>
            </div>
            <p className="text-sm text-white/30 leading-relaxed max-w-xs">
              2 étudiants. 12 businesses. 12 mois. Le défi du million d&rsquo;euros, documenté sur YouTube.
            </p>
          </div>

          {/* Nav */}
          <div>
            <p className="text-[10px] font-mono tracking-widest uppercase mb-4" style={{ color: GREEN_DIM }}>
              Navigation
            </p>
            <ul className="space-y-2">
              {[
                { label: 'Le Défi', href: '#challenge' },
                { label: 'Vidéos', href: '#videos' },
                { label: 'Contact', href: '#contact' },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-sm text-white/30 hover:text-white transition-colors duration-200"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <p className="text-[10px] font-mono tracking-widest uppercase mb-4" style={{ color: GREEN_DIM }}>
              Réseaux
            </p>
            <div className="flex items-center gap-4">
              {[
                { Icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
                { Icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
                { Icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 border border-white/10 flex items-center justify-center text-white/30 hover:border-[#00FF41]/40 hover:text-[#00FF41] transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-[11px] font-mono text-white/20">
            © {year} Launch &amp; Scale — Tous droits réservés
          </span>
          <span className="text-[11px] font-mono" style={{ color: GREEN_DIM }}>
            L&amp;S // {year}
          </span>
        </div>
      </div>
    </footer>
  )
}
