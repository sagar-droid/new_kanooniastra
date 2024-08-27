/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  env: {
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASS: process.env.EMAIL_PASS,
  },
  domains: ["kanooniastra.com"],
  images: {
    unoptimized: true,
    domains: ["kanooniastra.com"],
  },
};

export default nextConfig;
