/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: process.env.API_URL,
    CUSTOM_NODEJS_SERVER: process.env.CUSTOM_NODEJS_SERVER,
  },
};

module.exports = nextConfig;
