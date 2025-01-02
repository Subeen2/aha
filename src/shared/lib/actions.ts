"use server";

import { verifySession } from "./session";

export async function banUser() {
  const session = await verifySession();
  const role = session?.role;

  if (role !== "admin") {
    return { error: "Unauthorized" };
  }
}
