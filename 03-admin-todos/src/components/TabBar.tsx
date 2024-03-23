"use client";

import { useState } from "react";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";

interface TabBarProps {
  currentTab?: number;
  tabOptions?: number[];
}

export function TabBar({
  currentTab = 1,
  tabOptions = [1, 2, 3, 4],
}: TabBarProps) {
  const router = useRouter();
  const [selected, setSelected] = useState(currentTab);
  const onTabSelected = (tab: number) => {
    setSelected(tab);
    setCookie("selectedTab", tab.toString());
    router.refresh();
  };

  return (
    <div
      className={`
      grid w-full space-x-2 rounded-xl bg-gray-200 p-2
      grid-cols-${tabOptions.length.toString()}
    `}
    >
      {tabOptions.map((tab, index) => (
        <div key={index}>
          <input
            checked={selected === tab}
            onChange={() => {}}
            type="radio"
            id={tab.toString()}
            className="peer hidden"
          />
          <label
            onClick={() => onTabSelected(tab)}
            htmlFor={tab.toString()}
            className="transition-all block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white"
          >
            {tab}
          </label>
        </div>
      ))}
    </div>
  );
}
