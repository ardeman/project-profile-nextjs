import { MetadataRoute } from 'next'

export const dynamic = 'force-static'
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://ardeman.com', priority: 1 },
    { url: 'https://ardeman.com/archive', priority: 0.7 },
  ]
}
