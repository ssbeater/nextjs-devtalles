"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export async function getOrderById(orderId: string) {
  const session = await auth();

  if (!session?.user) {
    return {
      ok: false,
      message: "You need to be logged in to perform this action",
    };
  }

  try {
    const order = await prisma.order.findFirst({
      where: { id: orderId },
      include: {
        OrderAddress: true,
        OrderItem: {
          select: {
            price: true,
            quantity: true,
            size: true,
            product: {
              select: {
                title: true,
                slug: true,
                ProductImage: {
                  select: {
                    url: true,
                  },
                  take: 1,
                },
              },
            },
          },
        },
      },
    });

    if (!order) throw new Error("Order not found");

    if (session.user.role === "user") {
      if (order.userId !== session.user.id) {
        throw new Error("This order does not belong to you");
      }
    }

    return {
      ok: true,
      order,
    };
  } catch (error: any) {
    console.log(error);
    return {
      ok: false,
      message: error.message,
    };
  }
}
