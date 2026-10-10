import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Udawalawe Safaris | Private Jeep Safari in Sri Lanka',
  description: 'Private jeep safaris in Udawalawe National Park, shaped by local knowledge and a deep respect for wild places.',
  metadataBase: new URL('https://udawalawesafaris.lk'),
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Udawalawe Safaris | Private Jeep Safari in Sri Lanka',
    description: 'Quiet roads. Wild places. A local view of Udawalawe.',
    url: 'https://udawalawesafaris.lk',
    siteName: 'Udawalawe Safaris',
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: 'Udawalawe Safaris', description: 'Private jeep safaris in Udawalawe National Park.' },
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
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
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
