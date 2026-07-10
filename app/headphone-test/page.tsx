import type { Metadata } from "next";
import Page from "./PageClient";

export const metadata: Metadata = {
  title: "Headphone Test Online — Check Left/Right Channel Balance Free",
  description: "Test your headphones online. Check left/right channel balance, stereo separation, and driver alignment. Free audio test tool, no signup.",
  alternates: {
    canonical: "https://tonetool.org/headphone-test",
  },
  openGraph: {
    title: "Headphone Test Online — Check Left/Right Channel Balance Free",
    description: "Test your headphones online. Check left/right channel balance, stereo separation, and driver alignment. Free audio test tool, no signup.",
    url: "https://tonetool.org/headphone-test",
    siteName: "Tone Generator",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Headphone Test Online — Check Left/Right Channel Balance Free",
    description: "Test your headphones online. Check left/right channel balance, stereo separation, and driver alignment. Free audio test tool, no signup.",
  },
};

export default function Page_headphone_test() {
  return <Page />;
}
