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

type ActionState = {
  loading: boolean;
  error: string | null;
};

export async function signup(
  state: ActionState,
  formData: FormData
): Promise<ActionState> {
  state.loading = true;
  state.error = null; // 오류 초기화

  const formObject = {
    name: formData.get("name") as string | null,
    email: formData.get("email") as string | null,
    password: formData.get("password") as string | null,
  };

  const validationResult = SignUpFormSchema.safeParse(formObject);

  if (!validationResult.success) {
    state.loading = false;

    // 각 필드별로 에러를 처리
    const errors: string[] = [];

    state.error = errors.join(", "); // 모든 에러 메시지를 하나의 문자열로 합침
    return state;
  }

  const { name, email, password } = validationResult.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const client = await pool.connect();

    const result = await client.query(
      `INSERT INTO user (name, email, password) VALUES ($1, $2, $3) RETURNING id`,
      [name, email, hashedPassword]
    );

    const user = result.rows[0];

    await createSession(user.id);

    client.release();

    state.loading = false;
    return { loading: false, error: null }; // 성공적으로 완료된 상태 반환
  } catch (err) {
    state.loading = false;
    state.error = "회원가입에 실패했습니다. 다시 시도해주세요.";
    return state;
  }
}
