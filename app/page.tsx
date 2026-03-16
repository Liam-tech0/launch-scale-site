import { HeroSection } from '@/components/sections/hero-section'
import { ChallengeSection } from '@/components/sections/challenge-section'
import { VideosSection } from '@/components/sections/videos-section'
import { FooterSection } from '@/components/sections/footer-section'
import { FloatingNav } from '@/components/ui/floating-navbar'

const NAV_ITEMS = [
  { name: 'Le Défi', link: '#challenge' },
  { name: 'Vidéos', link: '#videos' },
  { name: 'Contact', link: '#contact' },
]

export default function HomePage() {
  return (
    <>
      <FloatingNav navItems={NAV_ITEMS} />
      <main>
        <HeroSection />
        <ChallengeSection />
        <VideosSection />
        <FooterSection />
      </main>
    </>
  )
}
