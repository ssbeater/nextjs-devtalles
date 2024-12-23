export const dynamic = "force-dynamic";
export const revalidate = 0;

import prisma from "@/lib/prisma";
import { NewTodoForm, TodosGrid } from "@/todos";
import { getUserServerSession } from "@/auth/actions/auth-actions";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Todos list",
  description: "Todos list",
};

export default async function ServerTodosPage() {
  const user = await getUserServerSession();

  if (!user) redirect("/api/auth/signin");

  const todos = await prisma.todo.findMany({
    where: { userId: user.id },
    orderBy: { description: "asc" },
  });

  return (
    <>
      <span className="text-3xml mb-10">Server Actions</span>
      <div className="w-full px-3 mx-5 mb-5">
        <NewTodoForm />
      </div>
      <TodosGrid todos={todos} />
    </>
  );
}
