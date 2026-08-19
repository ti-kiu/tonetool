import type { Metadata } from "next";
import Page from "./PageClient";

export const metadata: Metadata = {
  title: "Tinnitus Frequency Finder [Free] — Find My Tinnitus Pitch Matching (2025)",
  description: "Find your tinnitus frequency with our free online pitch matching tool. Identify the exact Hz of your ringing, buzzing, or hissing. Tinnitus frequency finder — try now.",
  alternates: {
    canonical: "https://tonetool.org/tinnitus-frequency",
  },
  openGraph: {
    title: "Tinnitus Frequency Finder [Free] — Find My Tinnitus Pitch Matching (2025)",
    description: "Find your tinnitus frequency with our free online pitch matching tool. Identify the exact Hz of your ringing, buzzing, or hissing. Tinnitus frequency finder — try now.",
    url: "https://tonetool.org/tinnitus-frequency",
    siteName: "Tone Generator",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tinnitus Frequency Finder [Free] — Find My Tinnitus Pitch Matching (2025)",
    description: "Find your tinnitus frequency with our free online pitch matching tool. Identify the exact Hz of your ringing, buzzing, or hissing. Tinnitus frequency finder — try now.",
  },
};

export default function Page_tinnitus_frequency() {
  return <Page />;
}
