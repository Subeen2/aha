"use client";

import InputField from "@/components/inputField/field/InputField";
import { useInput } from "@/hooks/useInput";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function SignUp() {
  // use client + next + router 사용 시 navigation 임포트 해야 함.
  const httpURL = "http://localhost:3000/api/v1/users";

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

  // const handleSignupSubmit = async () => {
  //   try {
  //     await axios
  //       .post(`${httpURL}/signup`, { nickname, email, password })
  //       .then((res) => {

  //         if (res.data.result !== null) {
  //           // redux에 저장

  //           // 새로고침 시 데이터 날아감 방지
  //           // localStorage.setItem(
  //           //   "reduxState",
  //           //   JSON.stringify({ uid: res.data.result, email: loginData.email })
  //           // );

  //           // 메인페이지로 리디렉션
  //           router.push("/login");
  //         }
  //       });
  //   } catch (err) {
  //     return { error: err };
  //   }
  // };

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    nickname: "",
  });

  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSignupSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError({ ...error, passwordError: "" });
    setSuccess("");

    try {
      const response = await axios.post(`${httpURL}/signup`, input);
      if (response.status === 200) {
        setSuccess("회원가입 성공! 로그인 페이지로 이동합니다.");
        setTimeout(() => router.push("/login"), 2000); // 2초 후 로그인 페이지로 리디렉션
      }
    } catch (err) {
      setError({
        ...error,
        passwordError: "회원가입에 실패했습니다. 다시 시도해주세요.",
      });
    }
  };

  return (
    <div className="flex flex-col text-center py-xl">
      <h1 className="text-3xl font-bold  mb-[70px]">회원가입</h1>
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
      {error && (
        <p className="text-red-500 mt-4">
          {error.nicknameError + error.emailError + error.passwordError}
        </p>
      )}
      {success && <p className="text-green-500 mt-4">{success}</p>}
    </div>
  );
}
