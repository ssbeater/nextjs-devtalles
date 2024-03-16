import prisma from "@/lib/prisma";
import { NewTodoForm, TodosGrid } from "@/todos";

export const metadata = {
  title: "Todos list",
  description: "Todos list",
};

export default async function RestTodosPage() {
  const todos = await prisma.todo.findMany({ orderBy: { description: "asc" } });

  return (
    <div>
      <div className="w-full px-3 mx-5 mb-5">
        <NewTodoForm />
      </div>
      <TodosGrid todos={todos} />
    </div>
  );
}
