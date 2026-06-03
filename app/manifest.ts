import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Tone Generator - Free Online Frequency Generator",
    short_name: "Tone Generator",
    description: "Free online tone generator. Generate sine, square, triangle, and sawtooth waves from 1Hz to 20kHz.",
    start_url: "/",
    display: "standalone",
    background_color: "#08080F",
    theme_color: "#08080F",
    icons: [
      {
        src: "/assets/logo.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/assets/logo.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
