import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: {
    NEXTAUTH_SECRET: "some_long_random_string",
  },
};

export default nextConfig;
