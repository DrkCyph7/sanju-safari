import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Sanju Safari | Private Jeep Safari in Sri Lanka',
  description: 'Private jeep safaris in Udawalawe National Park, shaped by local knowledge and a deep respect for wild places.',
  metadataBase: new URL('https://udawalawesafaris.lk'),
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Sanju Safari | Private Jeep Safari in Sri Lanka',
    description: 'Quiet roads. Wild places. A local view of Udawalawe.',
    url: 'https://udawalawesafaris.lk',
    siteName: 'Sanju Safari',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Sanju Safari - Private Jeep Safari in Udawalawe National Park',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sanju Safari | Private Jeep Safari in Sri Lanka',
    description: 'Quiet roads. Wild places. A local view of Udawalawe.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/assets/favicon/icon-dark-32x32.png', type: 'image/png', media: '(prefers-color-scheme: dark)' },
      { url: '/assets/favicon/icon-light-32x32.png', type: 'image/png', media: '(prefers-color-scheme: light)' },
      { url: '/assets/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/assets/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      { url: '/assets/favicon/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'icon', url: '/assets/favicon/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { rel: 'icon', url: '/assets/favicon/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TouristInformationCenter',
    name: 'Sanju Safari',
    description: 'Private jeep safaris in Udawalawe National Park, Sri Lanka, shaped by local knowledge and a deep respect for wild places.',
    url: 'https://udawalawesafaris.lk',
    telephone: '+94763080364',
    email: 'info@udawalawesafaris.lk',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Udawalawe',
      addressRegion: 'Sabaragamuwa Province',
      addressCountry: 'LK',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 6.4746,
      longitude: 80.8987,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '05:00',
      closes: '21:00',
    },
    priceRange: '$$',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: '128',
    },
  }

  return (
    <html lang="en">
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
