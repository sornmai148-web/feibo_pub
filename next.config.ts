import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: "127.0.0.1" },
      { hostname: "localhost" },
      { protocol: "https", hostname: "**" }, //-- allow all domain
    ],
  },
  allowedDevOrigins: ["3a17d2dbeb4c.ngrok-free.app"],
};

export default nextConfig;
