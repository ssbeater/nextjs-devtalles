"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { CiBookmarkCheck } from "react-icons/ci";

interface SideBarItemProps {
  title: string;
  path: string;
  icon: React.ReactNode;
}

export function SideBarItem({ title, path, icon }: SideBarItemProps) {
  const pathname = usePathname();
  const linkStyle =
    path === pathname
      ? "rounded-xl text-white bg-gradient-to-r from-sky-600 to-cyan-400"
      : "rounded-md text-gray-600 group";

  return (
    <li>
      <Link
        href={`${path}`}
        className={`
          relative px-4 py-3 flex items-center space-x-4 ${linkStyle}
        hover:bg-sky-600 hover:text-white
        `}
      >
        {icon}
        <span className="-mr-1 font-medium">{title}</span>
      </Link>
    </li>
  );
}
