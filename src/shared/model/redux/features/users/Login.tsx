"use client";

import { useDispatch, UseDispatch, useSelector } from "react-redux";
import { login, logout } from "./userSlice";
import Image from "next/image";
import { RootState } from "../../store";
import { useAuthStore } from "@/entities/lib/supabase/zustand/authStore";
import { useEffect, useState } from "react";

const Login = () => {
  const user = useAuthStore((state) => state.user);
  const saveUser = useAuthStore((state) => state.saveUser);
  const [isClient, setIsClient] = useState(false);
  // const dispatch = useDispatch();
  // const { isLoggedIn, userInfo } = useSelector(
  //   (state: RootState) => state.user
  // );

  const handleLogout = () => {
    saveUser(null);
    // dispatch(logout());
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className="md:block">
      {user ? (
        <ul className="container mx-auto w-full max-w-[1024px] flex items-center justify-end gap-5 py-[18px] text-[13px] text-gray-4 text-black px-[16px] lg:px-0">
          <li>
            <a href={`/profile/${user?.id}`} className="group cursor-pointer">
              내 프로필
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </a>
          </li>
          <li className="flex gap-1 group cursor-pointer">
            <button onClick={handleLogout}>로그아웃</button>

            <Image
              src="/icons/log-out.svg"
              alt="로그아웃 아이콘"
              width={11}
              height={11}
              className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none"
            />
          </li>
        </ul>
      ) : (
        <ul className="container mx-auto w-full max-w-[1024px] flex items-center justify-end gap-5 py-[18px] text-[13px] text-gray-4 text-black px-[16px] lg:px-0">
          <li>
            <a href="/login">로그인</a>
          </li>
          <li>
            <a href="/signup">회원가입</a>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Login;
