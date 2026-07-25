import type { Metadata } from "next";
import Page from "./PageClient";

export const metadata: Metadata = {
  title: "440 Hz Reference Tone [Free] — Standard Tuning Pitch Online (2025)",
  description: "Generate a precise 440 Hz A4 reference tone instantly. Standard tuning pitch for guitar, piano, and all instruments. Try free — no signup required.",
  alternates: {
    canonical: "https://tonetool.org/440hz",
  },
  openGraph: {
    title: "440 Hz Reference Tone [Free] — Standard Tuning Pitch Online (2025)",
    description: "Generate a precise 440 Hz A4 reference tone instantly. Standard tuning pitch for guitar, piano, and all instruments. Try free — no signup required.",
    url: "https://tonetool.org/440hz",
    siteName: "Tone Generator",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "440 Hz Reference Tone [Free] — Standard Tuning Pitch Online (2025)",
    description: "Generate a precise 440 Hz A4 reference tone instantly. Standard tuning pitch for guitar, piano, and all instruments. Try free — no signup required.",
  },
};

export default function Page_440hz() {
  return <Page />;
}
