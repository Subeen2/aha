"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Header() {
  const router = useRouter();

  const userUID = 1;

  const handleLogout = () => {
    router.push("/login");
  };

  return (
    <header className="bg-second100">
      <div className="hidden md:block">
        {true ? (
          <ul className="container mx-auto w-full max-w-[1024px] flex items-center justify-end gap-5 py-[18px] text-[13px] text-gray-4 text-black px-[16px] lg:px-0">
            <li>
              <a href={`/profile/${userUID}`} className="group">
                내 프로필
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                  -&gt;
                </span>
              </a>
            </li>
            <li className="flex gap-1 group">
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
      <div className="container mx-auto w-full max-w-[1024px] flex justify-between items-center py-[18px] px-[16px] lg:px-0">
        <h1 className="text-[30px] font-extrabold">
          <a href="/">
            <Image
              alt="아하 로고"
              loading="lazy"
              width="110"
              height="42"
              decoding="async"
              data-nimg="1"
              src="/logos/AHA.png"
            />
          </a>
        </h1>
        <div className="flex items-center">
          <nav className="hidden md:block">
            <h2 className="hidden">주메뉴</h2>
            <ul className="flex gap-[34px] items-center text-[18px] font-bold">
              {/* <li>
                <a className="hover:text-main-7 text-black" href="/mustpost">
                  메뉴1
                </a>
              </li>
              <li>
                <a className="hover:text-main-7 text-black" href="/grouppost">
                  메뉴2
                </a>
              </li> */}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
