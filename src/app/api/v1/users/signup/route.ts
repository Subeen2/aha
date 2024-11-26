// pages/api/signup.ts

import bcrypt from "bcrypt";

export async function POST(request: Request) {
  const { email, password, nickname } = await request.json();

  // 필수 값 확인
  if (
    !email ||
    !password ||
    !nickname ||
    email === "" ||
    password === "" ||
    nickname === ""
  ) {
    return new Response(
      JSON.stringify({
        message: "필수 입력 사항이 누락되었습니다.",
        result: null,
      }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
      }
    );
  }

  // 비밀번호 해싱
  const hashedPassword = await bcrypt.hash(password, 10);

  // 디비에 저장

  return new Response(
    JSON.stringify({
      message: "회원가입 성공!",
      result: {
        user: {
          uid: Math.random(),
          email: email,
          nickname: nickname,
        },
      },
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
    }
  );
}
