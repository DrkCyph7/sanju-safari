# Sanju Safari Asset Directory

All static assets are organized here under `public/assets/` so they are automatically served by Next.js at `/assets/...`.

## Folder Structure

```
public/assets/
├── logo/        # Brand logos (header, footer, dark/light variants, SVG / PNG)
│                # Accessed at: /assets/logo/filename.ext
│
├── gallery/     # Photo gallery images (wildlife, landscapes, jeeps, park views)
│                # Accessed at: /assets/gallery/filename.ext
│
├── favicon/     # Favicons & app icons (favicon.ico, icon-32x32.png, apple-icon.png, etc.)
│                # Accessed at: /assets/favicon/filename.ext
│
├── hero/        # Hero section backgrounds, headers, and banner images
│                # Accessed at: /assets/hero/filename.ext
│
├── icons/       # Custom vector icons, feature badges, wildlife badges
│                # Accessed at: /assets/icons/filename.ext
│
└── safaris/     # Tour package cards & safari category showcase photos
                 # Accessed at: /assets/safaris/filename.ext
```

## Usage in Next.js

```tsx
import Image from 'next/image'

// Logo
<Image src="/assets/logo/sanju-safari-logo.svg" alt="Sanju Safari" width={180} height={50} />

// Gallery
<Image src="/assets/gallery/udawalawe-elephants.jpg" alt="Elephants at Udawalawe" width={600} height={400} />

// Favicon in app/layout.tsx
icons: {
  icon: '/assets/favicon/favicon.ico',
  apple: '/assets/favicon/apple-icon.png',
}
```
