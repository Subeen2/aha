import { createClient } from "./client";

export const getAuthToken = async () => {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    return session.access_token;
  }
  console.log(session);
  return null;
};
