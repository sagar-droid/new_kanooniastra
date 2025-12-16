/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  env: {
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASS: process.env.EMAIL_PASS,
  },
  images: {
    unoptimized: true,
    domains: ["kanooniastra.com"],
  },
};

export default nextConfig;
