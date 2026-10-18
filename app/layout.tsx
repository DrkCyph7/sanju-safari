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
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: 'Sanju Safari', description: 'Private jeep safaris in Udawalawe National Park.' },
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/assets/favicon/favicon.svg',
        type: 'image/svg+xml',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/assets/favicon/favicon.svg',
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
