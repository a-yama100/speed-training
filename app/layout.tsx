import type { Metadata } from 'next'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://speed.phtechai.com'),
  title: {
    default: 'Speed Processing Training - Cognitive Training Based on the ACTIVE Study',
    template: '%s | Speed Processing Training'
  },
  description: 'Free adaptive speed-of-processing training inspired by the landmark ACTIVE study. Train your visual attention and processing speed to build cognitive reserve.',
  keywords: ['cognitive training', 'speed of processing', 'ACTIVE study', 'brain training', 'visual attention', 'processing speed', 'cognitive reserve', 'dementia prevention', 'free brain training'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'ja_JP',
    url: 'https://speed.phtechai.com',
    siteName: 'Speed Processing Training',
    title: 'Speed Processing Training - Free Cognitive Training Based on the ACTIVE Study',
    description: 'Free adaptive speed-of-processing training inspired by the ACTIVE study. Train your visual attention and processing speed to build cognitive reserve.',
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
  },
  robots: { index: true, follow: true },
  twitter: {
    card: 'summary_large_image',
    title: 'Speed Processing Training - Cognitive Training Based on the ACTIVE Study',
    description: 'Free adaptive speed-of-processing training. Train visual attention and processing speed to build cognitive reserve.',
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased bg-gray-50 text-gray-900">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Speed Processing Training",
              "url": "https://speed.phtechai.com",
              "description": "Free adaptive cognitive speed-of-processing training inspired by the ACTIVE study. Train visual attention and processing speed.",
              "applicationCategory": "HealthApplication",
              "operatingSystem": "Web",
              "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
              "creator": { "@type": "Organization", "name": "PH Tech AI", "url": "https://www.phtechai.com" }
            })
          }}
        />
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
