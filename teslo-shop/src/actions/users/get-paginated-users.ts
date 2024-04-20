"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

interface PaginationOptions {
  page?: number;
  take?: number;
}

export async function getPaginatedUsers({
  page = 1,
  take = 10,
}: PaginationOptions) {
  const session = await auth();

  if (session?.user.role !== "admin")
    return { ok: false, message: "You are not authenticated", totalPages: 0 };

  const users = await prisma.user.findMany({
    orderBy: { name: "desc" },
    take,
    skip: (page - 1) * take,
  });

  const totalUsers = await prisma.order.count();
  const totalPages = Math.ceil(totalUsers / take);

  return {
    ok: true,
    users,
    totalPages,
  };
}
