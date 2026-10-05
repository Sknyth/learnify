import { Play } from 'lucide-react'
import { getYouTubeEmbedUrl } from '../lib/youtube'

type Props = {
  videoUrl: string | null
}

export default function LessonPlayer({ videoUrl }: Props) {
  return (
    <div className="flex-1 bg-black flex items-center justify-center">
      {videoUrl ? (
        <iframe
          src={getYouTubeEmbedUrl(videoUrl)}
          className="w-full h-full"
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      ) : (
        <div className="flex flex-col items-center gap-3 text-gray-500">
          <Play className="w-12 h-12" />
          <p>No video available</p>
        </div>
      )}
    </div>
  )
}
