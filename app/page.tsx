import { HeroSection } from '@/components/sections/hero-section'
import { ChallengeSection } from '@/components/sections/challenge-section'
import { VideosSection } from '@/components/sections/videos-section'
import { FooterSection } from '@/components/sections/footer-section'

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <ChallengeSection />
      <VideosSection />
      <FooterSection />
    </main>
  )
}
