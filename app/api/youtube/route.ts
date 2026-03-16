import { NextResponse } from 'next/server'
import { fetchChannelVideos } from '@/lib/youtube'

export async function GET() {
  const apiKey = process.env.YOUTUBE_API_KEY
  const channelId = process.env.YOUTUBE_CHANNEL_ID

  if (!apiKey || !channelId) {
    return NextResponse.json(
      { videos: [], configured: false, error: 'YouTube API non configurée. Ajoutez YOUTUBE_API_KEY et YOUTUBE_CHANNEL_ID dans .env.local' },
      { status: 503 },
    )
  }

  const result = await fetchChannelVideos(channelId, apiKey, 12)
  return NextResponse.json({ ...result, configured: true })
}
