import type { Metadata } from "next";
import Page from "./PageClient";

export const metadata: Metadata = {
  title: "440 Hz Tuning Tone — Free Online Standard Pitch Reference",
  description: "Generate a precise 440 Hz A4 reference tone online. Standard tuning pitch for musical instruments. Free, no signup required.",
  alternates: {
    canonical: "https://tonetool.org/440hz",
  },
  openGraph: {
    title: "440 Hz Tuning Tone — Free Online Standard Pitch Reference",
    description: "Generate a precise 440 Hz A4 reference tone online. Standard tuning pitch for musical instruments. Free, no signup required.",
    url: "https://tonetool.org/440hz",
    siteName: "Tone Generator",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "440 Hz Tuning Tone — Free Online Standard Pitch Reference",
    description: "Generate a precise 440 Hz A4 reference tone online. Standard tuning pitch for musical instruments. Free, no signup required.",
  },
};

export default function Page_440hz() {
  return <Page />;
}
