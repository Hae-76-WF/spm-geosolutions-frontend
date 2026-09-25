import type { Metadata } from 'next';
import { Providers } from './providers';
import '../src/index.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://spmgeosolutions.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'SPM Geosolutions | Geomatics & GIS Consultancy', template: '%s | SPM Geosolutions' },
  description: 'SPM Geosolutions (U) Ltd - Geomatics, Cadastral SLAAC & GIS Platform. Uganda\'s Leading Geodetic Processing Portal & GIS Consultancy.',
  icons: {
    icon: [
      { url: '/logo.png', type: 'image/png' },
      { url: '/favicon.ico' },
    ],
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    title: 'SPM Geosolutions | Geomatics & GIS Consultancy',
    description: 'SPM Geosolutions (U) Ltd - Geomatics, Cadastral SLAAC & GIS Platform. Uganda\'s Leading Geodetic Processing Portal & GIS Consultancy.',
    siteName: 'SPM Geosolutions',
    images: [
      {
        url: `${siteUrl}/logo.png`,
        width: 1200,
        height: 630,
        alt: 'SPM Geosolutions Logo',
        type: 'image/png',
      },
      {
        url: '/logo.png',
        width: 600,
        height: 600,
        alt: 'SPM Geosolutions Logo',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SPM Geosolutions | Geomatics & GIS Consultancy',
    description: 'SPM Geosolutions (U) Ltd - Geomatics, Cadastral SLAAC & GIS Platform. Uganda\'s Leading Geodetic Processing Portal & GIS Consultancy.',
    images: [`${siteUrl}/logo.png`],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const logoUrl = `${siteUrl}/logo.png`;

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png" type="image/png" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo.png" />
        
        {/* OpenGraph & Social Media Sharing (WhatsApp, Telegram, Facebook, Twitter) */}
        <meta property="og:title" content="SPM Geosolutions | Geomatics & GIS Consultancy" />
        <meta property="og:description" content="SPM Geosolutions (U) Ltd - Geomatics, Cadastral SLAAC & GIS Platform. Uganda's Leading Geodetic Processing Portal & GIS Consultancy." />
        <meta property="og:image" content={logoUrl} />
        <meta property="og:image:secure_url" content={logoUrl} />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="SPM Geosolutions Logo" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="SPM Geosolutions" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="SPM Geosolutions | Geomatics & GIS Consultancy" />
        <meta name="twitter:description" content="SPM Geosolutions (U) Ltd - Geomatics, Cadastral SLAAC & GIS Platform." />
        <meta name="twitter:image" content={logoUrl} />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
