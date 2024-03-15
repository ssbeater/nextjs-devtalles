import prisma from "@/lib/prisma";
import { Todo } from "@prisma/client";
import { get } from "http";
import { NextResponse } from "next/server";
import * as yup from "yup";

interface Segments {
  params: {
    id: string;
  };
}

const getTodo = async (id: string): Promise<Todo | undefined> => {
  const todo = await prisma.todo.findFirst({ where: { id } });
  return todo || undefined;
};

export async function GET(request: Request, { params }: Segments) {
  const todo = await getTodo(params.id);

  if (!todo) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  return NextResponse.json(todo);
}

const putSchema = yup.object({
  description: yup.string().optional(),
  complete: yup.boolean().optional(),
});

export async function PUT(request: Request, { params }: Segments) {
  try {
    const todo = await getTodo(params.id);

    if (!todo) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    const body = await request.json();
    const { description, complete } = await putSchema.validate(body);
    const updatedTodo = await prisma.todo.update({
      where: { id: params.id },
      data: { description, complete },
    });

    return NextResponse.json(updatedTodo, { status: 201 });
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}
