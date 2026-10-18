import type { MetadataRoute } from 'next'
import { getGalleryImages } from '@/lib/gallery'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://udawalawesafaris.lk'
  const gallery = getGalleryImages()

  const siteImages = [
    `${baseUrl}/assets/hero/hero.png`,
    `${baseUrl}/assets/safaris/morning-safari.png`,
    `${baseUrl}/assets/safaris/afternoon-safari.png`,
    `${baseUrl}/assets/safaris/full-day-safari.png`,
    `${baseUrl}/assets/safaris/safari-transit-home.png`,
    ...gallery.map((item) => `${baseUrl}${item.src}`),
  ]

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
      images: siteImages,
    },
  ]
}
