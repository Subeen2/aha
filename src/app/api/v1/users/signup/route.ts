import { supabase } from "@/entities/lib/supabase/supabase";
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

  try {
    // Supabase에서 사용자 생성
    const { data, error } = await supabase.auth.signUp({
      email,
      password: hashedPassword,
      options: {
        data: {
          nickname,
        },
      },
    });

    if (error) {
      throw error;
    }

    const user = data.user;
    const session = data?.session;

    if (!user || !session) {
      throw new Error("사용자 또는 세션 정보가 없습니다.");
    }

    // 사용자 정보 추가: 회원가입된 사용자 정보로 'profiles' 테이블에 nickname 저장

    const { error: insertError } = await supabase
      .from("profiles") // "profiles" 테이블에 nickname 추가
      .insert([
        {
          id: user?.id,
          nickname,
        },
      ]);

    if (insertError) {
      throw insertError;
    }
    // 세션 생성 (access_token과 refresh_token을 포함한 객체 전달)
    const { error: sessionError } = await supabase.auth.setSession({
      access_token: session.access_token,
      refresh_token: session.refresh_token,
    });

    if (sessionError) {
      throw sessionError;
    }

    console.log("User created and session set.");

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
