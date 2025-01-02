"use client";

import React, { useActionState, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useInput } from "@/shared/ui/useInput";
import InputField from "@/shared/ui/InputFeild";
import { emailRegEx } from "@/shared/config/regex";
import { login } from "@/shared/model/redux/features/users/userSlice";
import { signup } from "@/shared/api/signup";

export default function LogIn() {
  const dispatch = useDispatch();

  const [state, action, pending] = useActionState(signup);
  // 클라이언트에서만 사용
  // const dispatch = useDispatch();

  // use client + next + router 사용 시 navigation 임포트 해야 함.
  const router = useRouter();

  const [error, setError] = useState({
    emailError: "",
    passwordError: "",
  });

  const { values: input, handler: onChangeInput } = useInput({
    email: "",
    password: "",
  });

  // 비밀번호 show & hide
  const [passwordHide, setPasswordHide] = useState(true);

  const { email, password } = input;

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const loginData = { email, password };

    if (!emailRegEx.test(email)) {
      setError((prev) => ({
        ...prev,
        emailError: "정확하지 않은 이메일입니다.",
      }));

      return;
    }

    // mock API 호출
    try {
      await axios
        .post(`${process.env.NEXT_PUBLIC_HTTP_LOCAL}/login`, loginData)
        .then((res) => {
          console.log(loginData);
          console.log(res.data.result);

          if (res.data.result !== null) {
            dispatch(login(res.data.result.nickname));
            // redux에 저장
            // dispatch(
            //   login({
            //     user_uid: res.data.result.user_uid,
            //     email: loginData.email,
            //     nickname: res.data.result.nickname,
            //   })
            // );

            // 새로고침 시 데이터 날아감 방지
            // localStorage.setItem(
            //   "reduxState",
            //   JSON.stringify({ uid: res.data.result, email: loginData.email })
            // );

            // 메인페이지로 리디렉션
            router.push("/");
          }
        });
    } catch (err) {
      return { error: err };
    }
  };

  const handleSignupRedirect = async () => {
    router.push("/signup");
  };

  return (
    <div className="flex flex-col text-center py-xl mt-10">
      <h1 className="text-3xl font-bold  mb-[70px]">로그인</h1>
      <div className="flex flex-row w-full justify-center text-left">
        <form
          className="flex flex-col justify-center gap-6 w-full mb-6 max-w-lg"
          onSubmit={handleLoginSubmit}
          action={action}
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
          {state?.errors?.email && <p>{state.errors.email}</p>}
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
          {state?.errors?.password && <p>{state.errors.password}</p>}
          <button
            type="submit"
            disabled={pending}
            className="w-full mt-1 py-3 text-lg bg-main400 text-white rounded-lg"
          >
            {pending ? "처리중..." : "로그인"}
          </button>
          <button
            type="button"
            className="flex items-center justify-center text-lg border border-gray-2 py-2 rounded-3xl font-medium w-full sm:py-2 sm:text-base md:text-md"
            onClick={handleSignupRedirect}
          >
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
}
