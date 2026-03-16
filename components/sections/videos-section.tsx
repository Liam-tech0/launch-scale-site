'use client'

import { useEffect, useState } from 'react'
import { type YouTubeApiResponse } from '@/lib/youtube'
import { VideoCard, VideoCardSkeleton } from '@/components/ui/video-card'
import { SectionHeader } from '@/components/ui/section-header'
import { AlertCircle, Youtube } from 'lucide-react'

const GREEN = '#00FF41'
const GREEN_DIM = 'rgba(0,255,65,0.4)'

function EmptyState({ isNotConfigured }: { isNotConfigured: boolean }) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
      <div
        className="w-16 h-16 border flex items-center justify-center mb-6"
        style={{ borderColor: GREEN_DIM }}
      >
        <Youtube className="w-8 h-8" style={{ color: GREEN_DIM }} />
      </div>
      {isNotConfigured ? (
        <>
          <p className="text-white/40 text-sm mb-2 font-mono">
            // YouTube API non configurée
          </p>
          <p className="text-white/20 text-xs max-w-sm">
            Ajoute <code className="text-white/40">YOUTUBE_API_KEY</code> et{' '}
            <code className="text-white/40">YOUTUBE_CHANNEL_ID</code> dans{' '}
            <code className="text-white/40">.env.local</code> pour afficher les vidéos.
          </p>
        </>
      ) : (
        <>
          <p className="text-white/40 text-sm mb-2 font-mono">// Aucune vidéo publiée</p>
          <p className="text-white/20 text-xs max-w-sm">
            Les vidéos apparaîtront ici automatiquement dès leur publication sur YouTube.
          </p>
        </>
      )}
    </div>
  )
}

function ErrorState({ message }: { message: string }) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
      <AlertCircle className="w-10 h-10 mb-4" style={{ color: 'rgba(255,80,80,0.6)' }} />
      <p className="text-white/40 text-sm font-mono">{message}</p>
    </div>
  )
}

export function VideosSection() {
  const [data, setData] = useState<YouTubeApiResponse | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/youtube')
      .then((r) => r.json())
      .then((d: YouTubeApiResponse) => setData(d))
      .catch(() => setData({ videos: [], error: 'Erreur réseau.' }))
      .finally(() => setLoading(false))
  }, [])

  const isNotConfigured = data?.configured === false
  const hasError = !!data?.error && !isNotConfigured
  const hasVideos = (data?.videos?.length ?? 0) > 0

  return (
    <section id="videos" className="relative bg-[#030303] py-20 px-4 sm:px-6 border-t border-white/5">
      <div className="relative max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <SectionHeader
            tag="// vidéos youtube"
            title="LES ÉPISODES"
            subtitle="Chaque business, documenté de zéro à la première vente."
          />
          {hasVideos && data?.channelTitle && (
            <a
              href={process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_URL ?? 'https://youtube.com'}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase transition-colors duration-200 self-start sm:self-auto mb-10 sm:mb-0"
              style={{ color: GREEN_DIM }}
              onMouseEnter={(e) => { e.currentTarget.style.color = GREEN }}
              onMouseLeave={(e) => { e.currentTarget.style.color = GREEN_DIM }}
            >
              <Youtube className="w-4 h-4" />
              Voir la chaîne →
            </a>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => <VideoCardSkeleton key={i} />)
          ) : hasError ? (
            <ErrorState message={data!.error!} />
          ) : !hasVideos ? (
            <EmptyState isNotConfigured={isNotConfigured} />
          ) : (
            data!.videos.map((video) => <VideoCard key={video.id} video={video} />)
          )}
        </div>
      </div>
    </section>
  )
}
