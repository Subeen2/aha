import { createClient } from "@/entities/lib/supabase/server";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  const { email, password, nickname } = await request.json();
  const supabase = createClient();

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

  try {
    // Supabase에서 사용자 생성
    const { data: user, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      throw error;
    }

    // 사용자 정보 추가

    const { error: insertError } = await supabase.from("user").insert([
      {
        user_id: user.user?.id,
        nickname,
        email,
        password: hashedPassword,
      },
    ]);

    if (insertError) {
      throw insertError;
    }
    return new Response(JSON.stringify({ message: "회원가입 성공!" }), {
      status: 200,
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
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
