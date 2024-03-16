import { Todo } from "@prisma/client";

export async function updateTodo(id: string, complete: boolean): Promise<Todo> {
  const body = { complete };
  const todo = await fetch(`/api/todos/${id}`, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

  return todo;
}

export async function createTodo(description: string): Promise<Todo> {
  const body = { description };
  const todo = await fetch(`/api/todos`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

  return todo;
}

export async function deleteCompleted(): Promise<boolean> {
  await fetch(`/api/todos`, {
    method: "DELETE",
  });

  return true;
}
