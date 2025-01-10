import { createClient } from "@supabase/supabase-js";

// 환경 변수가 올바르게 설정되어 있는지 확인
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
  throw new Error(
    "Supabase URL or API key is missing in the environment variables."
  );
}

const supabaseUrl: string = process.env.SUPABASE_URL;
const supabaseKey: string = process.env.SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);
