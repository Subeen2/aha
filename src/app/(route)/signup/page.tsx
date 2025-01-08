"use client";

import InputField from "@/shared/ui/InputFeild";
import { useInput } from "@/shared/ui/useInput";
import { z } from "zod"; // Zod 임포트
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

// Zod로 스키마 정의
const signupSchema = z.object({
  nickname: z
    .string()
    .min(3, { message: "닉네임은 최소 3자 이상이어야 합니다." }),
  email: z.string().email({ message: "유효한 이메일 주소를 입력해주세요." }),
  password: z
    .string()
    .min(6, { message: "비밀번호는 최소 6자 이상이어야 합니다." }),
});

export default function SignUp() {
  const router = useRouter();

  const [error, setError] = useState({
    nicknameError: "",
    emailError: "",
    passwordError: "",
  });

  const { values: input, handler: onChangeInput } = useInput({
    nickname: "",
    email: "",
    password: "",
  });

  const [passwordHide, setPasswordHide] = useState(true);

  const { nickname, email, password } = input;

  const [success, setSuccess] = useState("");

  const handleSignupSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError({ nicknameError: "", emailError: "", passwordError: "" }); // 초기화
    setSuccess("");

    // Zod로 검증
    const result = signupSchema.safeParse(input);
    console.log(input, result);

    if (!result.success) {
      // 검증 실패 시 에러 메시지 설정
      const errorMessages = result.error.errors.reduce(
        (acc: any, error: any) => ({
          ...acc,
          [`${error.path[0]}Error`]: error.message,
        }),
        {}
      );
      setError(errorMessages);
      return;
    }

    // Zod 검증을 통과한 후 회원가입 API 호출
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/signup`,
        input
      );
      if (response.status === 200) {
        setSuccess("회원가입 성공! 로그인 페이지로 이동합니다.");
        setTimeout(() => router.push("/login"), 2000); // 2초 후 로그인 페이지로 리디렉션
      }
    } catch (err) {
      console.log(err);
      setError({
        ...error,
        passwordError: "회원가입에 실패했습니다. 다시 시도해주세요.",
      });
    }
  };

  return (
    <div className="flex flex-col text-center py-xl pt-16">
      <h1 className="text-3xl font-bold mb-[70px]">회원가입</h1>
      <div className="flex flex-row w-full justify-center text-left">
        <form
          onSubmit={handleSignupSubmit}
          className="flex flex-col justify-center gap-6 w-full mb-6 max-w-lg"
        >
          <div className="flex flex-col">
            <InputField
              label="닉네임"
              type={"text"}
              value={nickname}
              name="nickname"
              placeholder="사용할 닉네임을 입력해주세요"
              onChange={onChangeInput}
              error={error.nicknameError}
            />
          </div>
          <div className="flex flex-col">
            <InputField
              label="이메일"
              type="text"
              value={email}
              name="email"
              placeholder="이메일 주소를 입력해주세요"
              onChange={onChangeInput}
              error={error.emailError}
            />
          </div>
          <div className="flex flex-col">
            <InputField
              label="비밀번호"
              type={passwordHide ? "password" : "text"}
              value={password}
              name="password"
              placeholder="비밀번호를 입력해주세요"
              onChange={onChangeInput}
              error={error.passwordError}
              setPasswordHide={setPasswordHide}
            />
          </div>
          <button
            type="submit"
            className="w-full mt-1 py-3 text-lg bg-main400 text-white rounded-lg"
          >
            가입하기
          </button>
        </form>
      </div>

      {success && <p className="text-green-500 mt-4">{success}</p>}
    </div>
  );
}
