import bcrypt from "bcrypt";
import pool from "@/shared/api/db";
import { createClient } from "@/entities/lib/supabase/server";

export async function POST(request: Request) {
  const { email, password } = await request.json();
  const supabase = createClient();

  try {
    // 데이터베이스에서 이메일로 사용자 찾기
    const { data: users, error: selectError } = await supabase
      .from("user")
      .select("id, nickname, email, password")
      .eq("email", email)
      .limit(1);

    if (selectError) {
      throw selectError;
    }

    if (!users || users.length === 0) {
      return new Response(
        JSON.stringify({
          message: "유저가 존재하지 않음.",
          result: null,
        }),
        {
          status: 404,
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
          },
        }
      );
    }

    // 비밀번호 검증
    const user = users[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return new Response(
        JSON.stringify({
          message: "비밀번호가 일치하지 않음.",
          result: null,
        }),
        {
          status: 401,
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
          },
        }
      );
    }

    // 로그인 성공 시 세션 생성 또는 JWT 발급 등을 진행
    return new Response(
      JSON.stringify({
        message: "로그인 성공",
        result: {
          user_uid: user.id,
          nickname: user.nickname,
          email: user.email,
        },
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
      }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({
        message: "서버 오류가 발생했습니다.",
        result: null,
        error: error.message || error,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
      }
    );
  }
}
