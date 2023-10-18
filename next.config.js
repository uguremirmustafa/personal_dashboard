/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '4004',
        pathname: '/uploads/**',
      },
    ],
  },
};

module.exports = nextConfig;
