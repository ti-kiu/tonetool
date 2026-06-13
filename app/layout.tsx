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
    google: "notranslate",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth notranslate" suppressHydrationWarning translate="no">
      <head>
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-L7CZQ8T37C" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-L7CZQ8T37C');
            `
          }}
        />
        {/* Microsoft Bing Verification */}
        <meta name="msvalidate.01" content="8D5AE51845CFE08F58F54A68CFF76D57" />
        {/* Schema.org Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Tone Generator",
              "url": "https://tonetool.org",
              "description": "Free online tone generator. Generate sine, square, triangle, and sawtooth waves from 1Hz to 20kHz. Perfect for testing headphones, speakers, and hearing.",
              "applicationCategory": "MultimediaApplication",
              "operatingSystem": "Web Browser",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "featureList": [
                "Generate frequencies from 1Hz to 20kHz",
                "4 waveform types: sine, square, triangle, sawtooth",
                "Frequency sweep testing",
                "WAV file download",
                "Mobile-friendly design",
                "No signup required"
              ],
              "screenshot": "https://tonetool.org/assets/og-image.png",
              "softwareHelp": {
                "@type": "CreativeWork",
                "url": "https://tonetool.org/#faq"
              }
            })
          }}
        />
      </head>
      <body className="antialiased bg-[#08080F] text-[#E8ECF0] font-['DM_Sans',sans-serif]" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
