"use client";

import { createClient } from "@/entities/lib/supabase/client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthProvider({ accessToken, children }) {
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const {
      data: { subscription: authListner },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log(session);
      if (session?.access_token !== accessToken) {
        router.refresh();
      }
    });

    return () => {
      authListner.unsubscribe();
    };
  }, [accessToken, supabase, router]);

  return children;
}
