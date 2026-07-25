import type { Metadata } from "next";
import Page from "./PageClient";

export const metadata: Metadata = {
  title: "432 Hz Tone Generator [Free] — Compare 432Hz vs 440Hz Online (2025)",
  description: "Generate a pure 432 Hz tone instantly in your browser. Compare 432Hz vs 440Hz tuning side by side. Try it free — no signup, works on any device.",
  alternates: {
    canonical: "https://tonetool.org/432hz",
  },
  openGraph: {
    title: "432 Hz Tone Generator [Free] — Compare 432Hz vs 440Hz Online (2025)",
    description: "Generate a pure 432 Hz tone instantly in your browser. Compare 432Hz vs 440Hz tuning side by side. Try it free — no signup, works on any device.",
    url: "https://tonetool.org/432hz",
    siteName: "Tone Generator",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "432 Hz Tone Generator [Free] — Compare 432Hz vs 440Hz Online (2025)",
    description: "Generate a pure 432 Hz tone instantly in your browser. Compare 432Hz vs 440Hz tuning side by side. Try it free — no signup, works on any device.",
  },
};

export default function Page_432hz() {
  return <Page />;
}
