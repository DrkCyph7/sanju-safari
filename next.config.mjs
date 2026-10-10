/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: [
    '192.168.1.148',
    '192.168.*.*',
    '10.*.*.*',
    '172.16.*.*',
    '*.local',
  ],
}

export default nextConfig
