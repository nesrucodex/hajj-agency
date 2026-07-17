import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // allow serving media from Cloudinary (also required if next/image is used)
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/dlmkdgi9v/**",
      },
    ],
  },
};

export default nextConfig;
