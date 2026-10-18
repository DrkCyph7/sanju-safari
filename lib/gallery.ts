import fs from 'fs'
import path from 'path'

export interface GalleryItem {
  src: string
  alt: string
  category: string
}

const VALID_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.webp', '.avif', '.svg'])

/**
 * Automatically retrieves all image files from `public/assets/gallery/`
 * and dynamically extracts clean alt labels and categories.
 */
export function getGalleryImages(): GalleryItem[] {
  const galleryDir = path.join(process.cwd(), 'public', 'assets', 'gallery')

  if (!fs.existsSync(galleryDir)) {
    return []
  }

  try {
    const files = fs.readdirSync(galleryDir)
    // Sort naturally so Gallery2 comes before Gallery10, etc.
    files.sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))

    const images: GalleryItem[] = []

    for (const file of files) {
      if (file.startsWith('.')) continue // Skip .gitkeep, .DS_Store, etc.

      const ext = path.extname(file).toLowerCase()
      if (!VALID_EXTENSIONS.has(ext)) continue

      const baseName = path.basename(file, ext)

      // Format alt text: replace hyphens/underscores with spaces and capitalize words
      const cleanedWords = baseName.replace(/[-_]+/g, ' ').trim()
      const alt = cleanedWords.charAt(0).toUpperCase() + cleanedWords.slice(1)

      // Deduce category based on keywords in filename
      const lower = baseName.toLowerCase()
      let category = 'Landscapes'

      if (lower.includes('elephant') || lower.includes('tusker') || lower.includes('herd')) {
        category = 'Elephants'
      } else if (lower.includes('bird') || lower.includes('kingfisher') || lower.includes('eagle') || lower.includes('stork') || lower.includes('peacock')) {
        category = 'Birds'
      } else if (lower.includes('jeep') || lower.includes('vehicle') || lower.includes('track') || lower.includes('driver')) {
        category = 'Jeeps'
      } else if (lower.includes('landscape') || lower.includes('lake') || lower.includes('sunrise') || lower.includes('sunset') || lower.includes('grass') || lower.includes('road')) {
        category = 'Landscapes'
      }

      images.push({
        src: `/assets/gallery/${encodeURIComponent(file)}`,
        alt,
        category,
      })
    }

    return images
  } catch (error) {
    console.error('Failed to read gallery directory:', error)
    return []
  }
}
