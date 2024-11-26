import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      // 이거 명칭 기존대로 하는게 좋을까?
      main100: "rgb(231 250 255)",
      main200: "#CAF4FF",
      main300: "#A0DEFF",
      main400: "#5AB2FF",
      second100: "rgb(255 251 224)",
      second200: "#FFF9D0",
      white: "#FFFFFF",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        bubble: {
          "0%": {
            transform: "scale(0.5)", // 시작 크기
            opacity: "0.5", // 살짝 투명
          },
          "50%": {
            transform: "scale(1)", // 중간 크기
            opacity: "1", // 완전히 보임
          },
          "100%": {
            transform: "scale(1.5)", // 최종 크기
            opacity: "0", // 투명하게 사라짐
          },
        },
        reveal: {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
      },
      animation: {
        wiggle: "wiggle 1s ease-in-out infinite",
        bubble: "bubble 3s ease-in-out infinite",
        reveal: "reveal 3s cubic-bezier(0.77, 0, 0.175, 1) forwards infinite",
      },
    },
  },
  plugins: [],
};
export default config;
