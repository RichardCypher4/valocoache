/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.valorant-api.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  compiler: {
    styledComponents: true,
  },
  // Silence the workspace root warning
  experimental: {
    turbo: {
      root: __dirname,
    },
  },
};

module.exports = nextConfig;