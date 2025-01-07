"use server";

import { SignUpFormSchema } from "../config/SignUpFormSchema";
import bcrypt from "bcrypt";
import { createSession } from "../lib/session";
import { Pool } from "pg"; // PostgreSQL 클라이언트 임포트

// PostgreSQL 연결 풀 설정 (환경 변수로 DB 연결 정보 설정)
const pool = new Pool({
  host: process.env.NEXT_PUBLIC_DB_HOST,
  port: Number(process.env.NEXT_PUBLIC_DB_LOCAL_PORT),
  database: process.env.NEXT_PUBLIC_DB_DATABASE,
  user: process.env.NEXT_PUBLIC_DB_USER,
  password: process.env.NEXT_PUBLIC_DB_PASSWORD,
});

export type ActionState = {
  loading: boolean;
  error: string | null;
};

type SignupResponse =
  | {
      errors: {
        message: string;
      };
    }
  | {
      user: {
        name?: string[];
        email?: string[];
        password?: string[];
      };
    }
  | undefined;

export async function signup(
  formData: FormData,
  state: ActionState
): Promise<SignupResponse> {
  // 로딩 상태 설정
  state.loading = true;

  // FormData에서 값을 추출하여 객체로 변환
  const formObject = {
    name: formData.get("name") as string | null, // null을 처리하는 로직 추가
    email: formData.get("email") as string | null,
    password: formData.get("password") as string | null,
  };

  // 검증
  const validationResult = SignUpFormSchema.safeParse(formObject);

  if (!validationResult.success) {
    // 로딩 상태 종료
    state.loading = false;
    // 필드 오류 반환
    return {
      errors: {
        message: validationResult.error.flatten().fieldErrors as string,
      },
    };
  }

  const { name, email, password } = validationResult.data;

  // 사용자 생성: 비밀번호 암호화
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // PostgreSQL에 사용자 데이터 삽입
    const client = await pool.connect();

    const result = await client.query(
      `INSERT INTO user (name, email, password) VALUES ($1, $2, $3) RETURNING id`,
      [name, email, hashedPassword]
    );

    const user = result.rows[0]; // 삽입된 사용자 데이터 반환

    // 세션 생성
    await createSession(user.id);

    // 연결 종료
    client.release();

    // 로딩 상태 종료
    state.loading = false;

    // 성공적인 결과 반환
    return undefined; // 오류가 없으면 undefined 반환
  } catch (err) {
    // 오류 발생 시
    console.error(err);
    state.loading = false;
    return {
      errors: {
        message: "회원가입에 실패했습니다. 다시 시도해주세요.",
      },
    };
  }
}
