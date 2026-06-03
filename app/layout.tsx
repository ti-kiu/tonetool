import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tone Generator - Free Online Frequency Generator",
  description: "Free online tone generator. Generate sine, square, triangle, and sawtooth waves from 1Hz to 20kHz. Perfect for testing headphones, speakers, and hearing.",
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
        {/* GA4 with consent mode */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX', {
                'anonymize_ip': true,
                'allow_google_signals': false,
                'restricted_data_processing': true
              });
              // Default deny all
              gtag('consent', 'default', {
                'analytics_storage': 'denied',
                'ad_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied'
              });
            `,
          }}
        />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
        />
        {/* AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
          crossOrigin="anonymous"
        />
      </head>
      <body className="antialiased bg-[#08080F] text-[#E8ECF0] font-['DM_Sans',sans-serif]">
        {children}
      </body>
    </html>
  );
}
