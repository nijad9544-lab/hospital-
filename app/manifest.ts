import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "CARELET - Care Beyond Borders",
    short_name: "CARELET",
    description:
      "CARELET connects international patients with NABH & JCI accredited hospitals, doctors and Ayurveda wellness centers in Kerala, India.",
    start_url: "/",
    display: "standalone",
    background_color: "#F7F9F9",
    theme_color: "#0057B8",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
