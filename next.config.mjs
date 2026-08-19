/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  env: {
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASS: process.env.EMAIL_PASS,
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
