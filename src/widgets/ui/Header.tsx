"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import LogIn from "@/app/(route)/login/page";
export default function Header() {
  const router = useRouter();

  const userUID = 1;

  const handleLogout = () => {
    router.push("/login");
  };

  return (
    <header className="bg-second100">
      <LogIn />
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
              src="/logos/AHA!.svg"
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
