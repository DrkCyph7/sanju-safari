import { getGalleryImages } from '@/lib/gallery'
import SanjuSafariHome from './SanjuSafariHome'

export const dynamic = 'force-dynamic'

export default function Page() {
  const initialGallery = getGalleryImages()
  return <SanjuSafariHome initialGallery={initialGallery} />
}
