import type { Metadata } from "next";
import Page from "./PageClient";

export const metadata: Metadata = {
  title: "Headphone Test Online [Free] — Check Left/Right Balance Instantly (2025)",
  description: "Test your headphones now — check left/right balance, stereo separation, and driver alignment instantly. Free online audio test, no signup needed.",
  alternates: {
    canonical: "https://tonetool.org/headphone-test",
  },
  openGraph: {
    title: "Headphone Test Online [Free] — Check Left/Right Balance Instantly (2025)",
    description: "Test your headphones now — check left/right balance, stereo separation, and driver alignment instantly. Free online audio test, no signup needed.",
    url: "https://tonetool.org/headphone-test",
    siteName: "Tone Generator",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Headphone Test Online [Free] — Check Left/Right Balance Instantly (2025)",
    description: "Test your headphones now — check left/right balance, stereo separation, and driver alignment instantly. Free online audio test, no signup needed.",
  },
};

export default function Page_headphone_test() {
  return <Page />;
}
