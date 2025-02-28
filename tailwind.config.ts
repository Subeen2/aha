import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{html,js,ts,jsx,tsx,css}",
  ],
  theme: {
    colors: {
      // 이거 명칭 기존대로 하는게 좋을까?
      main100: "rgb(231 250 255)",
      main200: "#CAF4FF",
      main300: "#A0DEFF",
      main400: "#5AB2FF",
      main500: "rgb(165 236 255)",
      second100: "rgb(255 251 224)",
      second200: "#FFF9D0",
      white: "#FFFFFF",
      grey900: "#191f28",
      grey800: "#666666",
      red100: "red",
      back: "#303030b0",
    },
    extend: {
      boxShadow: {
        custom: "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",
      },
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
          "0%": { transform: "translateY(120%)" },
          "100%": { transform: "translateY(0)" },
        },
        bounce: {
          "0%": { transform: "translateY(0)" },
          "50%": {
            transform: "translateY(-5px)",
          },
          "100%": {
            transform: "translateY(0)",
          },
        },
        spin: {
          to: {
            transform: "rotate(1turn)", // 360도 회전
          },
        },
        spinColor: {
          "0%, 100%": { borderColor: "blue" },
          "50%": { borderColor: "red" },
        },
      },
      animation: {
        wiggle: "wiggle 1s ease-in-out infinite",
        bubble: "bubble 3s ease-in-out infinite",
        reveal: "reveal 2.5s cubic-bezier(0.77, 0, 0.175, 1) forwards infinite",
        bounce: "bounce 1s ease infinite both",
        spin: "spin 0.8s infinite ease-in-out",
      },
    },
  },
  plugins: [require("./tailwind-plugin")],
};
export default config;
