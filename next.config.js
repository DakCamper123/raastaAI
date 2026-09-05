/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['three', 'katex'],
  images: {
    unoptimized: true
  }
};

module.exports = nextConfig;
