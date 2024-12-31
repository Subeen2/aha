import plugin from "tailwindcss/plugin";
import { colors, extend } from "./tailwind.config";

export default plugin(
  function ({ addBase, theme }) {
    // @layer base에서 설정한 값은 CSS가 아니라 여기서 이렇게 설정합니다.
    addBase({
      "*, *::before, *::after": {
        "box-sizing": "border-box",
      },
      "*": {
        margin: 0,
        fontFamily: "Pretendard",
      },
      // macOS에서만 다르게 나타나는 폰트 문제를 통일
      body: {
        "font-family": theme("fontFamily.sans"),
        "-webkit-font-smoothing": "antialiased",
        "-moz-osx-font-smoothing": "grayscale",
      },
      "img, picture, video, canvas, svg": {
        display: "block",
        "max-width": "100%",
      },
      "input, button, textarea, select": {
        font: "inherit",
      },
      // z-index 문제를 없애기 위해
      "#root, #__next": {
        isolation: "isolate",
      },
    });
  },
  // theme 설정으로 기본값을 덮어쓰거나 추가합니다.
  {
    theme: {
      colors,
      extend: {
        fontFamily: {
          sans: [
            '"Pretendard Variable"',
            "Pretendard",
            "-apple-system",
            "BlinkMacSystemFont",
            "system-ui",
            "Roboto",
            '"Helvetica Neue"',
            '"Segoe UI"',
            '"Apple SD Gothic Neo"',
            '"Noto Sans KR"',
            '"Malgun Gothic"',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
            "sans-serif",
          ],
        },
      },
    },
  }
);
