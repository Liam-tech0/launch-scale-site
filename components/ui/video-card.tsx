import { type YouTubeVideo, formatDuration, formatViews } from '@/lib/youtube'
import { Play, Eye, Clock } from 'lucide-react'

const GREEN = '#00FF41'

interface VideoCardProps {
  video: YouTubeVideo
}

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(iso))
}

export function VideoCard({ video }: VideoCardProps) {
  const watchUrl = `https://www.youtube.com/watch?v=${video.id}`
  const duration = video.duration ? formatDuration(video.duration) : null

  return (
    <a
      href={watchUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group block border border-white/10 bg-black hover:border-[#00FF41]/30 transition-all duration-300 overflow-hidden"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden bg-white/5">
        {video.thumbnailUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={video.thumbnailUrl}
            alt={video.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Play className="w-10 h-10 text-white/20" />
          </div>
        )}

        {/* Play overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center border-2 transition-transform duration-200 group-hover:scale-110"
            style={{ borderColor: GREEN, backgroundColor: GREEN + '20' }}
          >
            <Play className="w-5 h-5 ml-1" style={{ color: GREEN }} />
          </div>
        </div>

        {/* Duration badge */}
        {duration && (
          <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/80 text-[10px] font-mono font-bold text-white">
            {duration}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-sm font-bold text-white leading-snug mb-2 line-clamp-2 group-hover:text-[#00FF41] transition-colors duration-200">
          {video.title}
        </h3>

        <div className="flex items-center gap-4 text-[10px] font-mono text-white/30">
          {video.viewCount && (
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {formatViews(video.viewCount)}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {formatDate(video.publishedAt)}
          </span>
        </div>
      </div>
    </a>
  )
}

// Loading skeleton
export function VideoCardSkeleton() {
  return (
    <div className="border border-white/10 overflow-hidden animate-pulse">
      <div className="aspect-video bg-white/5" />
      <div className="p-4 space-y-2">
        <div className="h-3 bg-white/10 rounded w-full" />
        <div className="h-3 bg-white/10 rounded w-3/4" />
        <div className="h-2 bg-white/5 rounded w-1/2 mt-3" />
      </div>
    </div>
  )
}
