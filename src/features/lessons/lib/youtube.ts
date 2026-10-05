export function getYouTubeEmbedUrl(url: string): string {
  const videoId = url.includes('watch?v=')
    ? url.split('watch?v=')[1].split('&')[0]
    : url.split('/').pop()

  return `https://www.youtube.com/embed/${videoId}`
}
