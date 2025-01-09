/** @type {import('next').NextConfig} */
// next.config.mjs
module.exports = {
  reactStrictMode: true, // React Strict Mode 활성화
  swcMinify: true, // SWC를 사용한 빌드 최적화
  // Optional: Vercel에서 사용할 환경 변수 설정
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  // API Routes 등도 App Router에서 사용 가능
  experimental: {
    appDir: true,
  },
};
