"use server";

import { SignUpFormSchema } from "../config/SignUpFormSchema";
import bcrypt from "bcrypt";
import { createSession } from "../lib/session";

type ActionState = {
  loading: boolean;
  error: string | null;
};

export async function signup(state: ActionState, formData: FormData) {
  const validateionResult = SignUpFormSchema.safeParse({
    name: formData.get("name"),
    eamil: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validateionResult.success) {
    return {
      errors: validateionResult.error.flatten().fieldErrors,
    };
  }

  const { name, email, password } = validateionResult.data;

  // create user
  const hashedPassword = await bcrypt.hash(password, 10);

  const data = await db
    .insert(users)
    .values({ email, password: hashedPassword })
    .returning({ id: users.id });

  const user = data[0];

  await createSession(user.id);
}
