import { getServerSession } from "next-auth";
import bcrypt from "bcryptjs";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

export async function getUserServerSession() {
  const session = await getServerSession(authOptions);
  return session?.user;
}

export async function signInEmailPassword(email: string, password: string) {
  if (!email || !password) return null;

  const user = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });

  if (!user) {
    const dbUser = await createUser(email, password);
    return dbUser;
  }

  if (!bcrypt.compareSync(password, user.password ?? "")) {
    return null;
  }

  return user;
}

export async function createUser(email: string, password: string) {
  const user = await prisma.user.create({
    data: {
      email,
      password: bcrypt.hashSync(password, 10),
      name: email.split("@")[0],
    },
  });

  return user;
}
