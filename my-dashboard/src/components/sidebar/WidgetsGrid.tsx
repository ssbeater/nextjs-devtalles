"use client";

import { IoCartOutline } from "react-icons/io5";
import { useAppSelector } from "@/store";

import { SimpleWidget } from "../dashboard/SimpleWidget";

export function WidgetsGrid() {
  const count = useAppSelector((state) => state.counter.count);

  return (
    <div className="flex flex-wrap w-full p-2 items-center justify-center">
      <SimpleWidget
        title={`${count}`}
        subtitle="Cart"
        label="Counter"
        icon={<IoCartOutline size={50} className="text-blue-600"/>}
        href="/dashboard/counter"
      />
    </div>
  );
}
