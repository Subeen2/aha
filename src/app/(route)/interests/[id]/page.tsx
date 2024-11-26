"use client";

import { RootState } from "@/app/lib/store";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import * as THREE from "three";

export default function UserInterestsPage({
  params,
}: {
  params: { id: string };
}) {
  // Redux에서 user 정보를 가져옵니다.
  const user = useSelector((state: RootState) => state.userAuth);
  const { id } = params;
  const router = useRouter();

  console.log("안녕하세요");
  return (
    <div className="grid grid-cols-1 grid-rows-2 gap-5 px-44 py-10">
      <p>목록</p>
      <div>
        <button
          type="button"
          className="flex items-center justify-center text-lg border border-gray-2 py-2 rounded-3xl font-medium w-full sm:py-2 sm:text-base md:text-md"
        >
          추가
        </button>
      </div>
    </div>
  );
}
