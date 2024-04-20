"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export async function updateUserRole(userId: string, role: string) {
  console.log("updateUserRole")
  const session = await auth();

  if (session?.user.role !== "admin")
    return { ok: false, message: "You are not authenticated" };

  try {
    const newRole = role === "admin" ? "admin" : "user";

    await prisma.user.update({
      where: { id: userId },
      data: { role: newRole },
    });

    revalidatePath("/admin/users");

    return { ok: true };
  } catch (error) {
    return { ok: false, message: "Can not update user role" };
  }
}
