"use server";

import { auth } from "@/auth.config";
import { Address, Size } from "@/interfaces";
import prisma from "@/lib/prisma";
import { ok } from "assert";

interface ProductToOrder {
  productId: string;
  quantity: number;
  size: Size;
}

export async function placeOrder(
  productIds: ProductToOrder[],
  address: Address
) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId)
    return {
      ok: false,
      error: "There are no user session.",
    };

  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productIds.map((p) => p.productId),
      },
    },
  });

  // Calculate total quantity, tax, subtotal, total
  const itemsInOrder = productIds.reduce((count, p) => count + p.quantity, 0);
  const { subTotal, tax, total } = productIds.reduce(
    (totals, item) => {
      const productQuantity = item.quantity;
      const product = products.find((p) => p.id === item.productId);

      if (!product) throw new Error(`${item.productId} not found - 500 `);

      const subTotal = product.price * productQuantity;
      totals.subTotal += subTotal;
      totals.tax += subTotal * 0.15;
      totals.total += subTotal * 1.15;

      return totals;
    },
    { subTotal: 0, tax: 0, total: 0 }
  );

  try {
    const prismaTx = await prisma.$transaction(async (tx) => {
      // 1. Update stock
      const updatedProductsPromises = products.map((product) => {
        const productQuantity = productIds
          .filter((p) => p.productId === product.id)
          .reduce((acc, item) => item.quantity + acc, 0);

        if (productQuantity === 0)
          throw new Error(`Product ${product.id} has 0 quantity`);

        return tx.product.update({
          where: { id: product.id },
          data: {
            inStock: {
              decrement: productQuantity,
            },
          },
        });
      });

      const updatedProducts = await Promise.all(updatedProductsPromises);

      updatedProducts.forEach((product) => {
        if (product.inStock < 0)
          throw new Error(`${product.title} is out of stock.`);
      });

      // 2. Create order - header & details
      const order = await tx.order.create({
        data: {
          userId,
          itemsInOrder: itemsInOrder,
          subTotal: subTotal,
          tax: tax,
          total: total,

          OrderItem: {
            createMany: {
              data: productIds.map((p) => ({
                quantity: p.quantity,
                size: p.size,
                productId: p.productId,
                price: products.find((x) => x.id === p.productId)?.price ?? 0,
              })),
            },
          },
        },
      });

      // 3. Create order address
      const { country: countryId, ...restAddress } = address;

      const orderAddress = await tx.orderAddress.create({
        data: {
          ...restAddress,
          countryId,
          orderId: order.id,
        },
      });

      return {
        order,
        orderAddress,
        updatedProducts,
      };
    });

    return {
      ok: true,
      order: prismaTx.order,
      prismaTx,
    }
  } catch (error: any) {
    return {
      ok: false,
      message: error.message,
    };
  }
}
