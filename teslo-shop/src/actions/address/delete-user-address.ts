"use server";

import prisma from "@/lib/prisma";

export async function deleteUserAddress(userId: string) {
  try {
    await prisma.userAddress.delete({
      where: { userId },
    });

    return {
      ok: true,
      message: "Address deleted",
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "An error occurred while setting the address",
    };
  }
}
