"use client";

import { useAuthStore } from "@/entities/lib/supabase/zustand/authStore";
import { PropsWithChildren, useEffect } from "react";
import { getUser } from "./api/v1/users/auth/auth";

function GetUserProvider({ children }: PropsWithChildren) {
  const saveUser = useAuthStore((state) => state.saveUser);

  // 새로고침 후 user 데이터를 저장할 때 로컬 스토리지를 사용하도록 설정
  useEffect(() => {
    getUser().then((res) => {
      if (res.data.user) {
        saveUser(res.data.user);
      }
    });
  }, [saveUser]);

  return <>{children}</>;
}

export default GetUserProvider;
