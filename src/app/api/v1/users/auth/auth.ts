import { createClient } from "@/entities/lib/supabase/client";

export async function getUser() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  console.log(data);

  if (data.user) {
    const userId = data.user.id as unknown as number;
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (profile) return { data, error: profileError };

    const noProfile = profileError?.code === "PGRST116";

    if (noProfile) {
      await supabase
        .from("profiles")
        .insert([{ user_id: userId, nickname: "me" }]);
    }
  }

  return { data, error };
}

export async function googleLogin() {
  const supabase = createClient();
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: process.env.NEXT_PUBLIC_SITE_URL,
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });

  if (error) return { error: "구글 로그인 실패" };

  return { error };
}

export async function kakaoLogin() {
  const supabase = createClient();
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "kakao",
    options: {
      redirectTo: process.env.NEXT_PUBLIC_SITE_URL,
    },
  });

  if (error) return { error: "카카오 로그인 실패" };

  return { error };
}
