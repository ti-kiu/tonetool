import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tone Generator - Free Online Frequency Generator",
  description: "Free online tone generator. Generate sine, square, triangle, and sawtooth waves from 1Hz to 20kHz. Perfect for testing headphones, speakers, and hearing.",
  keywords: ["tone generator", "frequency generator", "online tone generator", "test headphones", "audio frequency", "sine wave", "tinnitus matcher"],
  authors: [{ name: "Tone Generator" }],
  creator: "Tone Generator",
  publisher: "Tone Generator",
  robots: "index, follow",
  alternates: {
    canonical: "https://tonetool.org",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://tonetool.org",
    siteName: "Tone Generator",
    title: "Tone Generator - Free Online Frequency Generator",
    description: "Free online tone generator. Generate sine, square, triangle, and sawtooth waves from 1Hz to 20kHz.",
    images: [
      {
        url: "https://tonetool.org/assets/og-image.png",
        width: 1200,
        height: 630,
        alt: "Tone Generator - Free Online Frequency Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tone Generator - Free Online Frequency Generator",
    description: "Free online tone generator. Generate sine, square, triangle, and sawtooth waves from 1Hz to 20kHz.",
    images: ["https://tonetool.org/assets/og-image.png"],
  },
  verification: {
    google: "6f7527c3b9e8a1b2",
  },
  other: {
    "msapplication-TileColor": "#08080F",
    "theme-color": "#08080F",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=DM+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500;700&display=swap" 
          rel="stylesheet" 
        />
        {/* Favicon */}
        <link rel="icon" href="/assets/logo.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/assets/logo.png" />
        {/* Sitemap */}
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
      </head>
      <body className="antialiased bg-[#08080F] text-[#E8ECF0] font-['DM_Sans',sans-serif]">
        {children}
        {/* GA4 - loaded at end of body to avoid hydration issues */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-L7CZQ8T37C', {
                  'anonymize_ip': true,
                  'allow_google_signals': false,
                  'restricted_data_processing': true
                });
                gtag('consent', 'default', {
                  'analytics_storage': 'denied',
                  'ad_storage': 'denied',
                  'ad_user_data': 'denied',
                  'ad_personalization': 'denied'
                });
              } catch(e) {}
            `,
          }}
        />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-L7CZQ8T37C"
        />
        {/* Global error handler */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.onerror = function(msg, url, line, col, error) {
                console.error('[GlobalError]', msg, url, line, col);
                return false;
              };
              window.addEventListener('unhandledrejection', function(e) {
                console.error('[UnhandledPromise]', e.reason);
              });
            `,
          }}
        />
      </body>
    </html>
  );
}
