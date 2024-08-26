/** @type {import('next').NextConfig} */
const nextConfig = {
  //   output: "export",
  env: {
    EMAIL_USER: process.env.EMAIL_USER,
  },
};

export default nextConfig;
