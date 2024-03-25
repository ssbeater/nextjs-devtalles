"use client";

import Link from "next/link";
import clsx from "clsx";
import {
  IoCloseOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoSearchOutline,
  IoShirtOutline,
  IoTicketOutline,
} from "react-icons/io5";
import { useUIStore } from "@/store";

export const SideBar = () => {
  const { isSideMenuOpen, closeSideMenu } = useUIStore();

  return (
    <div>
      {/* Background black */}
      {isSideMenuOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30" />
      )}

      {/* Blur */}
      {isSideMenuOpen && (
        <div className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm" />
      )}

      {/* Side Menu */}
      <nav
        //todo slide efect
        className={clsx(
          "fixed p-5 right-0 top-0 w-screen sm:w-[400px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300",
          {
            "translate-x-full": !isSideMenuOpen,
          }
        )}
      >
        <IoCloseOutline
          size={50}
          className="absolute top-2 right-5 cursor-pointer"
          onClick={closeSideMenu}
        />

        {/* Input */}
        <div className="relative mt-14 mb-6">
          <IoSearchOutline size={20} className="absolute top-2 left-2" />
          <input
            type="text"
            placeholder="Search ..."
            className="w-full bg-gray-50 pl-10 py-1 pr-10 border-b-2 text-xll border-gray-200 focus:outline-none focus:border-blue-500"
          />
        </div>

        <Link
          href="/"
          className="flex items-center mt-2 p-2 hover:bg-gray-100 rounded transition-all"
        >
          <IoPersonOutline size={30} />
          <span className="ml-3 text-xl">Profile</span>
        </Link>
        <Link
          href="/orders"
          className="flex items-center mt-2 p-2 hover:bg-gray-100 rounded transition-all"
        >
          <IoTicketOutline size={30} />
          <span className="ml-3 text-xl">Orders</span>
        </Link>
        <Link
          href="/"
          className="flex items-center mt-2 p-2 hover:bg-gray-100 rounded transition-all"
        >
          <IoLogInOutline size={30} />
          <span className="ml-3 text-xl">Log In</span>
        </Link>
        <Link
          href="/"
          className="flex items-center mt-2 p-2 hover:bg-gray-100 rounded transition-all"
        >
          <IoLogOutOutline size={30} />
          <span className="ml-3 text-xl">Log Out</span>
        </Link>

        {/* Separator */}
        <div className="w-full h-px bg-gray-200 my-5" />

        <Link
          href="/"
          className="flex items-center mt-2 p-2 hover:bg-gray-100 rounded transition-all"
        >
          <IoShirtOutline size={30} />
          <span className="ml-3 text-xl">Products</span>
        </Link>
        <Link
          href="/"
          className="flex items-center mt-2 p-2 hover:bg-gray-100 rounded transition-all"
        >
          <IoTicketOutline size={30} />
          <span className="ml-3 text-xl">Orders</span>
        </Link>
        <Link
          href="/"
          className="flex items-center mt-2 p-2 hover:bg-gray-100 rounded transition-all"
        >
          <IoPeopleOutline size={30} />
          <span className="ml-3 text-xl">Users</span>
        </Link>
      </nav>
    </div>
  );
};
