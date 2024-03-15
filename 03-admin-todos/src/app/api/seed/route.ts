import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: Request) {
  await prisma.todo.deleteMany({});
  await prisma.todo.createMany({
    data: [
      { description: "Soul stone", complete: true },
      { description: "Power stone" },
      { description: "Time stone" },
      { description: "Space stone" },
      { description: "Reality stone" },
    ],
  });

  return NextResponse.json({ message: "seed executed" });
}
