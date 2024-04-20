"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

interface PaginationOptions {
  page?: number;
  take?: number;
}

export async function getPaginatedOrders({
  page = 1,
  take = 10,
}: PaginationOptions) {
  const session = await auth();

  if (session?.user.role !== "admin")
    return { ok: false, message: "You are not authenticated", totalPages: 0 };

  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      OrderAddress: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },
    take,
    skip: (page - 1) * take,
  });

  const totalOrders = await prisma.order.count();
  const totalPages = Math.ceil(totalOrders / take);

  return {
    ok: true,
    orders,
    totalPages,
  };
}
