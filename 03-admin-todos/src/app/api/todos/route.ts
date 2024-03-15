import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import * as yup from "yup";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const take = Number(searchParams.get("take") ?? "10");
  const skip = Number(searchParams.get("skip") ?? "0");

  if (isNaN(skip) || isNaN(take)) {
    return NextResponse.json(
      { message: "Invalid query params" },
      { status: 400 }
    );
  }

  const list = await prisma.todo.findMany({ take, skip });

  return NextResponse.json(list);
}

const postSchema = yup.object({
  description: yup.string().required(),
  complete: yup.boolean().optional().default(false),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { description, complete } = await postSchema.validate(body);

    const todo = await prisma.todo.create({ data: { description, complete } });

    return NextResponse.json(todo, { status: 201 });
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}