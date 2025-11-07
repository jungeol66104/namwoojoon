"use server";

import { createSession, verifyPassword } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  const password = formData.get("password") as string;

  if (!password) {
    return { success: false, error: "Password is required" };
  }

  if (!verifyPassword(password)) {
    return { success: false, error: "Invalid password" };
  }

  await createSession();
  return { success: true };
}
