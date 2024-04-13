"use client";

import Link from "next/link";

interface Props {
  title: string;
  icon: React.ReactNode;
  href: string;
  closeMenu?: () => void;
}

export function SideBarItem({ title, icon, href, closeMenu }: Props) {
  return (
    <Link
      href={href}
      onClick={closeMenu}
      className="flex items-center mt-2 p-2 hover:bg-gray-100 rounded transition-all"
    >
      {icon}
      <span className="ml-3 text-xl">{title}</span>
    </Link>
  );
}
