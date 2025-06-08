import type { NextConfig } from "next";
import { i18n } from "./next-i18next.config.js";

const nextConfig: NextConfig = {
  i18n,
  reactStrictMode: true,
  output: "standalone"
};

export default nextConfig;
