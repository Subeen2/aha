// pages/api/signup.ts

import { createSession } from "@/shared/lib/session";
import bcrypt from "bcrypt";
import pool from "@/shared/api/db";

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

  try {
    const result = await pool.query(
      `INSERT INTO "user" (name, email, password) VALUES ($1, $2, $3) RETURNING id`,
      [nickname, email, hashedPassword]
    );

    const user = result.rows[0]; // 삽입된 사용자 데이터 반환
    console.log("User inserted:", user);

    //세션 생성
    await createSession(user.id);
    console.log("Session created.");

    // 성공적인 결과 반환
    return new Response(JSON.stringify({ message: "회원가입 성공!" }), {
      status: 200,
    });
  } catch (err) {
    console.error("Error during signup:", err);
    return new Response(
      JSON.stringify({
        message: "회원가입에 실패했습니다. 다시 시도해주세요.",
      }),
      { status: 500 }
    );
  }
}
