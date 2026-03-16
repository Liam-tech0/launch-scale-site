export interface YouTubeVideo {
  id: string
  title: string
  description: string
  thumbnailUrl: string
  publishedAt: string
  viewCount?: string
  likeCount?: string
  duration?: string
  channelTitle: string
}

export interface YouTubeApiResponse {
  videos: YouTubeVideo[]
  channelTitle?: string
  configured?: boolean
  error?: string
  errorCode?: 'quota_exceeded' | 'channel_not_found' | 'network_error' | 'unknown'
}

type YouTubeErrorCode = 'quota_exceeded' | 'channel_not_found' | 'network_error' | 'unknown'

class YouTubeApiError extends Error {
  constructor(public readonly code: YouTubeErrorCode, message: string) {
    super(message)
    this.name = 'YouTubeApiError'
  }
}

async function parseYouTubeError(res: Response): Promise<YouTubeApiError> {
  try {
    const body = await res.json()
    const reason = body?.error?.errors?.[0]?.reason as string | undefined
    if (res.status === 403 && reason === 'quotaExceeded') {
      return new YouTubeApiError('quota_exceeded', 'Quota YouTube API dépassé. Réessaie demain.')
    }
    if (res.status === 404) {
      return new YouTubeApiError('channel_not_found', 'Chaîne YouTube introuvable.')
    }
  } catch {
    // ignore JSON parse error
  }
  return new YouTubeApiError('unknown', `Erreur YouTube API (HTTP ${res.status})`)
}

// Fetches the uploads playlist ID from a channel
async function getUploadsPlaylistId(channelId: string, apiKey: string): Promise<string> {
  const url = `https://www.googleapis.com/youtube/v3/channels?id=${channelId}&part=contentDetails&key=${apiKey}`
  const res = await fetch(url, { next: { revalidate: 3600 } })
  if (!res.ok) throw await parseYouTubeError(res)
  const data = await res.json()
  const playlistId = data.items?.[0]?.contentDetails?.relatedPlaylists?.uploads ?? null
  if (!playlistId) throw new YouTubeApiError('channel_not_found', 'Chaîne introuvable.')
  return playlistId
}

// Fetches video IDs from the uploads playlist
async function getVideoIdsFromPlaylist(
  playlistId: string,
  apiKey: string,
  maxResults = 12,
): Promise<string[]> {
  const safeMax = Math.min(Math.max(1, Math.floor(maxResults)), 50)
  const url = `https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${playlistId}&part=contentDetails&maxResults=${safeMax}&key=${apiKey}`
  const res = await fetch(url, { next: { revalidate: 3600 } })
  if (!res.ok) throw await parseYouTubeError(res)
  const data = await res.json()
  return (data.items ?? []).map((item: { contentDetails: { videoId: string } }) => item.contentDetails.videoId)
}

// Fetches video details (title, thumbnail, stats, duration)
async function getVideoDetails(videoIds: string[], apiKey: string): Promise<YouTubeVideo[]> {
  if (videoIds.length === 0) return []
  const ids = videoIds.join(',')
  const url = `https://www.googleapis.com/youtube/v3/videos?id=${ids}&part=snippet,statistics,contentDetails&key=${apiKey}`
  const res = await fetch(url, { next: { revalidate: 3600 } })
  if (!res.ok) throw await parseYouTubeError(res)
  const data = await res.json()

  return (data.items ?? []).map((item: {
    id: string
    snippet: {
      title: string
      description: string
      thumbnails: { maxres?: { url: string }; high?: { url: string }; medium?: { url: string } }
      publishedAt: string
      channelTitle: string
    }
    statistics?: { viewCount?: string; likeCount?: string }
    contentDetails?: { duration?: string }
  }) => ({
    id: item.id,
    title: item.snippet.title,
    description: item.snippet.description,
    thumbnailUrl:
      item.snippet.thumbnails.maxres?.url ??
      item.snippet.thumbnails.high?.url ??
      item.snippet.thumbnails.medium?.url ??
      '',
    publishedAt: item.snippet.publishedAt,
    viewCount: item.statistics?.viewCount,
    likeCount: item.statistics?.likeCount,
    duration: item.contentDetails?.duration,
    channelTitle: item.snippet.channelTitle,
  }))
}

// Main export: fetch all videos for a channel
export async function fetchChannelVideos(
  channelId: string,
  apiKey: string,
  maxResults = 12,
): Promise<YouTubeApiResponse> {
  try {
    const playlistId = await getUploadsPlaylistId(channelId, apiKey)
    const videoIds = await getVideoIdsFromPlaylist(playlistId, apiKey, maxResults)
    const videos = await getVideoDetails(videoIds, apiKey)
    return { videos, channelTitle: videos[0]?.channelTitle }
  } catch (err) {
    if (err instanceof YouTubeApiError) {
      console.error('[youtube] API error:', err.code, err.message)
      return { videos: [], error: err.message, errorCode: err.code }
    }
    console.error('[youtube] Unexpected error:', err)
    return { videos: [], error: 'Erreur inattendue lors du chargement des vidéos.', errorCode: 'network_error' }
  }
}

// Format ISO 8601 duration (PT4M13S → 4:13)
export function formatDuration(iso: string): string {
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
  if (!match) return ''
  const h = parseInt(match[1] ?? '0')
  const m = parseInt(match[2] ?? '0')
  const s = parseInt(match[3] ?? '0')
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  return `${m}:${String(s).padStart(2, '0')}`
}

// Format view count (1234567 → 1.2M vues)
export function formatViews(count?: string): string {
  if (!count) return ''
  const n = parseInt(count)
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M vues`
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K vues`
  return `${n} vues`
}
