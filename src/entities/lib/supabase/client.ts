// import { Database } from "@/entities/config/supabase/supabase";
import { Database } from "@/entities/config/supabase/types_db";
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
