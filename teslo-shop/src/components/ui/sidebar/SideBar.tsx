"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

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
import { logout } from "@/actions";
import { SideBarItem } from "./SideBarItem";

const defaultItems = [
  {
    title: "Profile",
    icon: <IoPersonOutline size={30} />,
    href: "/profile",
  },
  {
    title: "Orders",
    icon: <IoTicketOutline size={30} />,
    href: "/orders",
  },
];

const adminItems = [
  {
    title: "Products",
    icon: <IoShirtOutline size={30} />,
    href: "/admin/product",
  },
  {
    title: "Orders",
    icon: <IoTicketOutline size={30} />,
    href: "/admin/orders",
  },
  {
    title: "Users",
    icon: <IoPeopleOutline size={30} />,
    href: "/admin/users",
  },
];

export const SideBar = () => {
  const { isSideMenuOpen, closeSideMenu } = useUIStore();
  const { data: session } = useSession();
  const isAuthenticated = !!session?.user;
  const isAdmin = session?.user.role === "admin";

  const closeSession = () => {
    logout();
    closeSideMenu();
    window.location.replace("/");
  };

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

        {/* Log In Item */}
        {!isAuthenticated && (
          <SideBarItem
            title="Log In"
            href="/auth/login"
            icon={<IoLogInOutline size={30} />}
            closeMenu={closeSideMenu}
          />
        )}

        {/* Default Items */}
        {isAuthenticated && (
          <>
            {defaultItems.map((item) => (
              <SideBarItem
                key={item.title}
                closeMenu={closeSideMenu}
                {...item}
              />
            ))}

            <button
              onClick={closeSession}
              className="flex w-full items-center mt-2 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <IoLogOutOutline size={30} />
              <span className="ml-3 text-xl">Log Out</span>
            </button>
          </>
        )}

        {/* Separator */}
        <div className="w-full h-px bg-gray-200 my-5" />

        {isAdmin && <span className="text-xl font-bold">Admin Options</span>}

        {/* Admin Items */}
        {isAdmin &&
          adminItems.map((item) => (
            <SideBarItem key={item.title} closeMenu={closeSideMenu} {...item} />
          ))}
      </nav>
    </div>
  );
};
