1|import type { Metadata } from "next";
2|import Page from "./PageClient";
3|
4|export const metadata: Metadata = {
5|  title: "White Noise Generator [Free] — Sleep, Focus & Study Sounds (2025)",
6|  description: "Generate white noise, pink noise, and brown noise for sleep, focus, and studying. Instant playback in your browser — try free, no signup required.",
7|  alternates: {
8|    canonical: "https://tonetool.org/white-noise",
9|  },
10|  openGraph: {
11|    title: "White Noise Generator [Free] — Sleep, Focus & Study Sounds (2025)",
12|    description: "Generate white, pink, and brown noise online. Perfect for sleep, focus, studying, and tinnitus relief. Free, works on any device.",
13|    url: "https://tonetool.org/white-noise",
14|    siteName: "Tone Generator",
15|    locale: "en_US",
16|    type: "website",
17|  },
18|  twitter: {
19|    card: "summary_large_image",
20|    title: "White Noise Generator [Free] — Sleep, Focus & Study Sounds (2025)",
21|    description: "Generate white, pink, and brown noise online. Perfect for sleep, focus, studying, and tinnitus relief. Free, works on any device.",
22|  },
23|};
24|
25|export default function Page_white_noise() {
26|  return <Page />;
27|}
28|