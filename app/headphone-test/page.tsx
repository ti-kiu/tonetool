import type { Metadata } from "next";
import Page from "./PageClient";

export const metadata: Metadata = {
  title: "Headphone Test Online — Check Left/Right Channel Balance Free",
  description: "Test your headphones online. Check left/right channel balance, stereo separation, and driver alignment. Free audio test tool, no signup.",
  alternates: {
    canonical: "https://tonetool.org/headphone-test",
  },
};

export default function Page_headphone_test() {
  return <Page />;
}
