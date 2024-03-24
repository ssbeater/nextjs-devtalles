export const dynamic = "force-dynamic";
export const revalidate = 0;

import { getUserServerSession } from "@/auth/actions/auth-actions";
import prisma from "@/lib/prisma";
import { NewTodoForm, TodosGrid } from "@/todos";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Todos list",
  description: "Todos list",
};

export default async function RestTodosPage() {
  const user = await getUserServerSession();

  if (!user) redirect("/api/auth/signin");

  const todos = await prisma.todo.findMany({
    where: { userId: user.id },
    orderBy: { description: "asc" },
  });

  return (
    <div>
      <div className="w-full px-3 mx-5 mb-5">
        <NewTodoForm />
      </div>
      <TodosGrid todos={todos} />
    </div>
  );
}
