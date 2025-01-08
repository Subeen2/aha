/** @type {import('next').NextConfig} */
// next.config.mjs
const nextConfig = {
  images: {
    domains: ["", "another-domain.com"], // 허용할 외부 이미지 도메인
  },
};

export default nextConfig;
