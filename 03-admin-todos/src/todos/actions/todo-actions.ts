"use server";

import { revalidatePath } from "next/cache";
import { Todo } from "@prisma/client";
import prisma from "@/lib/prisma";

export const sleep = async(seconds:number = 0) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, seconds * 1000);
  })!
}

export async function toogleTodo(id: string, complete: boolean): Promise<Todo> {
  // await sleep(3);
  const todo = await prisma.todo.findFirst({ where: { id } });

  if (!todo) {
    throw new Error("Todo not found");
  }

  const updatedTodo = await prisma.todo.update({
    where: { id },
    data: { complete },
  });

  revalidatePath("/dashboard/server-todos");
  return updatedTodo;
}

export async function addTodo (description:string): Promise<Todo|Error> {
  try {
    const todo = await prisma.todo.create({data:{description}});
    revalidatePath("/dashboard/server-todos");
    return todo;
  } catch (error) {
    return new Error("Error creating todo");
  }
}

export async function deleteCompleted(): Promise<void> {
  try {
    await prisma.todo.deleteMany({ where: { complete: true } });
    revalidatePath("/dashboard/server-todos");
  } catch (error) {
    console.log("Error deleting completed todos", error);
  }
}
