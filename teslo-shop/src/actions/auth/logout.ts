"use server";

import { signOut } from "@/auth.config";

export async function logout() {
  try {
    await signOut({ redirect: false });
  } catch (error) {
    console.log(error);
  }
}
