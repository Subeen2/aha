"use client";

import React, { useActionState, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useInput } from "@/shared/ui/useInput";
import InputField from "@/shared/ui/InputFeild";
import { emailRegEx } from "@/shared/config/regex";
import { useAuthStore } from "@/entities/lib/supabase/zustand/authStore";

export interface FormState {
  success: boolean;
  message: string;
}

const initialState: FormState = {
  success: false,
  message: "",
};

export default function LogIn() {
  const dispatch = useDispatch();
  const router = useRouter();
  const saveUser = useAuthStore((state) => state.saveUser);

  const [error, setError] = useState({
    emailError: "",
    passwordError: "",
  });

  const { values: input, handler: onChangeInput } = useInput({
    email: "",
    password: "",
  });

  const [passwordHide, setPasswordHide] = useState(true);

  const { email, password } = input;

  // `useActionState` 사용
  // const [state, signupAction, pending] = useActionState(signup, {
  //   loading: false,
  //   error: null,
  // });

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const loginData = { email, password };

    // 이메일 유효성 체크
    if (!emailRegEx.test(email)) {
      setError((prev) => ({
        ...prev,
        emailError: "정확하지 않은 이메일입니다.",
      }));
      return;
    }

    // 로그인 요청
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/login`,
        loginData
      );

      const userInfo = response.data.result;

      if (userInfo !== null) {
        saveUser(userInfo);
        // dispatch(login(response.data.result.nickname)); // 로그인 성공 시 Redux에 사용자 정보 저장
        router.push("/"); // 로그인 후 메인 페이지로 리디렉션
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSignupRedirect = () => {
    router.push("/signup"); // 회원가입 페이지로 리디렉션
  };

  return (
    <div className="flex flex-col text-center py-xl pt-16 pb-16">
      <h1 className="text-3xl font-bold mb-[70px]">로그인</h1>
      <div className="flex flex-row w-full justify-center text-left">
        <form
          className="flex flex-col justify-center gap-6 w-full mb-6 max-w-lg"
          onSubmit={handleLoginSubmit}
        >
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
            로그인
          </button>
          <button
            type="button"
            className="flex items-center justify-center text-lg border border-gray-200 py-2 rounded-3xl font-medium w-full sm:py-2 sm:text-base md:text-md"
            onClick={handleSignupRedirect}
          >
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
}
