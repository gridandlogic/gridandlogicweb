/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // All imagery is local. next/image automatically skips optimization for
    // `.svg` sources (the logo), so the raster screenshots get resized and
    // served as WebP while the vector mark passes through untouched.
    formats: ["image/webp"],
  },
};

export default nextConfig;
