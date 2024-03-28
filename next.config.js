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
  async headers() {
    const cspHeader = `
      default-src 'self';
      img-src 'self' data: https://pbs.twimg.com https://assets.coingecko.com;
      script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com;
      style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
      font-src 'self' https://fonts.gstatic.com;
      connect-src 'self' https://www.google-analytics.com ${process.env.NEXT_PUBLIC_BASE_URL};
      frame-ancestors 'self';
    `;

    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Content-Security-Policy',
            value: cspHeader.replace(/\s{2,}/g, ' ').trim(),
          },
        ],
      },
    ];
  },
  images: {
    domains: ['pbs.twimg.com', 'assets.coingecko.com'],
  },
};

module.exports = nextConfig;