/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { typedRoutes: true },
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24,
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'source.unsplash.com' },
      { protocol: 'https', hostname: 'images.pexels.com' },
      { protocol: 'https', hostname: 'news.remaxdoors.com' },
      { protocol: 'https', hostname: 'miro.medium.com' },
      { protocol: 'https', hostname: 'hips.hearstapps.com' },
      { protocol: 'https', hostname: 'static.independent.co.uk' },
      { protocol: 'https', hostname: 'images.hindustimes.com' },
      { protocol: 'https', hostname: 'qz.com' },
      { protocol: 'https', hostname: 'images.stockcake.com' },
      { protocol: 'https', hostname: 'archello.s3.eu-central-1.amazonaws.com' },
      { protocol: 'https', hostname: 'img.classistatic.de' },
      { protocol: 'https', hostname: 'purepng.com' },
      { protocol: 'https', hostname: 'images.rawpixel.com' },
      { protocol: 'https', hostname: 'images.fastcompany.com' },
      { protocol: 'https', hostname: 'images.dealersync.com' },
      { protocol: 'https', hostname: 'www.getac.com' }
    ]
  }
}
export default nextConfig
