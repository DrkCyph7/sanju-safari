import { NextResponse } from 'next/server'
import { getGalleryImages } from '@/lib/gallery'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const images = getGalleryImages()
    return NextResponse.json({ images })
  } catch (error) {
    console.error('Error fetching gallery images:', error)
    return NextResponse.json({ images: [] }, { status: 500 })
  }
}
