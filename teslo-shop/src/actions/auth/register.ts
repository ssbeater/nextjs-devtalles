"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function registerUser(
  name: string,
  email: string,
  password: string
) {
  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: bcrypt.hashSync(password),
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return {
      ok: true,
      user,
      message: "User registered successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "An error occurred registering the user",
    };
  }
}
