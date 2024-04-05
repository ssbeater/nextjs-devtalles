"use server";

import prisma from "@/lib/prisma";

export async function getStockBySlug(slug: string) {
  try {
    const product = await prisma.product.findFirst({
      select: { inStock: true },
      where: { slug },
    });

    return product?.inStock ?? 0;
  } catch (error) {
    console.log(error);
    return 0;
  }
}
