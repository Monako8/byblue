/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // This allows both quality 70 and 75
    qualities: [70, 75],
  },
}

export default nextConfig