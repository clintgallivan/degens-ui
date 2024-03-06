/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async redirects() {
    return [
      {
        source: '/tokens',
        destination: '/',
        permanent: true,
      },
    ];
  },
  images: {
    domains: ['pbs.twimg.com', 'assets.coingecko.com'],
  },
};

module.exports = nextConfig;
