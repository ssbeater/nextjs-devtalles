"use server";

import prisma from "@/lib/prisma";

export async function setTransactionId(orderId: string, transactionId: string) {
  try {
    const order = await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        transactionId,
      },
    });

    if (!order) throw new Error(`Order ${orderId} not found`);

    return { ok: true };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message: "Failed to set transaction id",
    };
  }
}
