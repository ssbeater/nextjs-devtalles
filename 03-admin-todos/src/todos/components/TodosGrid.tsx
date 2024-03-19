"use client";

import { Todo } from "@prisma/client";
import { todoActions } from "@/todos";
import { TodoItem } from "./TodoItem";

interface TodosGridProps {
  todos?: Todo[];
}

export function TodosGrid({ todos = [] }: TodosGridProps) {
  // const router = useRouter();
  // const toggleTodo = async (id: string, complete: boolean) => {
  //   await todosApi.updateTodo(id, complete);
  //   router.refresh();
  // };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleTodo={todoActions.toogleTodo}
        />
      ))}
    </div>
  );
}
