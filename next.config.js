/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['three', 'katex'],
  images: {
    unoptimized: true
  },
  async redirects() {
    return [
      {
        source: '/architecture',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
