/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: '*.amazonaws.com' },
      { protocol: 'https', hostname: 'images.pexels.com' },
      { protocol: 'https', hostname: 'storage.googleapis.com' },
    ],
  },

  async rewrites() {
    // Proxy transparente: el browser llama a /api/* en localhost y Next.js
    // reenvía la request al backend. La cookie jwt viaja de vuelta como
    // same-origin → el browser la almacena sin bloqueo Secure/cross-origin.
    const backend = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '')
    return [
      {
        source: '/api/:path*',
        destination: `${backend}/api/:path*`,
      },
    ]
  },
}

export default nextConfig
