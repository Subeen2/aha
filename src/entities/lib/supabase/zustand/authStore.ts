import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@supabase/supabase-js";

interface userState {
  user: User | null;
  saveUser: (info: User | null) => void;
}

export const useAuthStore = create(
  persist<userState>(
    (set) => ({
      user: null,
      saveUser: (info) => set({ user: info }),
    }),
    {
      name: "user-storage", // 로컬스토리지에서 데이터를 저장할 이름
      getStorage: () => localStorage, // localStorage를 저장소로 사용
    }
  )
);
