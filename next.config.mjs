/** @type {import('next').NextConfig} */
const staticExport = process.env.COVER_STATIC_EXPORT === "1";
const basePath = staticExport ? (process.env.NEXT_PUBLIC_BASE_PATH || "") : "";
const nextConfig = {
  devIndicators: false,
  poweredByHeader: false,
  reactStrictMode: true,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  ...(staticExport ? { output: "export", basePath, trailingSlash: true, images: { unoptimized: true } } : {})
};

export default nextConfig;
