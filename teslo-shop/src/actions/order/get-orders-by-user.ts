"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

interface PaginationOptions {
  page?: number;
  take?: number;
}

export async function getOrdersByUser({
  page = 1,
  take = 10,
}: PaginationOptions) {
  const session = await auth();

  if (!session?.user)
    return { ok: false, message: "You are not authenticated", totalPages: 0 };

  const orders = await prisma.order.findMany({
    where: { userId: session.user.id },
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

  const totalProducts = await prisma.order.count({
    where: { userId: session.user.id },
  });
  const totalPages = Math.ceil(totalProducts / take);

  return {
    ok: true,
    orders,
    totalPages,
  };
}
