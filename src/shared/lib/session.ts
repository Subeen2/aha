"server only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

const key = new TextEncoder().encode(process.env.SECRET);

const cookie = {
  name: "session",
  options: { httpOnly: true, secure: true, sameSide: "lax", path: "/" },
  duration: 24 * 60 * 60 * 1000,
};

export async function encrypt(payload: any) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1day")
    .sign(key);
}

export async function decrypt(session: any) {
  try {
    const { payload } = await jwtVerify(session, key, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    return null;
  }
}
export async function createSession(userId: string) {
  const expires = new Date(Date.now() + cookie.duration);
  const session = await encrypt({ userId, expires });

  cookies().set(cookie.name, session, { ...cookie.options, expires });
  // 리디렉션을 NextResponse를 사용해 처리합니다.
  return NextResponse.redirect(
    new URL("/", process.env.NEXT_PUBLIC_HTTP_LOCAL || "http://localhost:3000")
  );
}

export async function verifySession() {
  const cookieValue = cookies().get(cookie.name)?.value;
  const session = await decrypt(cookieValue);
  if (!session?.userId) {
    // 리디렉션을 NextResponse를 사용해 처리합니다.
    return NextResponse.redirect(
      new URL(
        "/login",
        process.env.NEXT_PUBLIC_HTTP_LOCAL || "http://localhost:3000"
      )
    );
  }

  return { userId: session.userId };
}

export async function deleteSession() {
  cookies().delete(cookie.name);
  // 리디렉션을 NextResponse를 사용해 처리합니다.
  return NextResponse.redirect(
    new URL(
      "/login",
      process.env.NEXT_PUBLIC_HTTP_LOCAL || "http://localhost:3000"
    )
  );
}
