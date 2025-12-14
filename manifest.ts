import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "飞机博彩第一门户",
    short_name: "飞机博彩第一门户",
    description:
      "飞博娱乐城在招保赔下，力争打造飞机博彩第一门户，为广大玩家提供最公平最有保障的好游戏",
    start_url: "/",
    display: "standalone",
    background_color: "#fff",
    theme_color: "#fff",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
