import Image from "next/image";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getServerSession } from "next-auth";

import {
  IoBasketOutline,
  IoCalendarOutline,
  IoCheckboxOutline,
  IoCodeWorkingOutline,
  IoListOutline,
  IoPersonOutline,
} from "react-icons/io5";
import { CiLogout } from "react-icons/ci";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { SideBarItem } from "./SideBarItem";
import LogoutButton from "./LogoutButton";

const menuItems = [
  { title: "Dashboard", href: "/dashboard", icon: <IoCalendarOutline /> },
  {
    title: "Rest Todos",
    href: "/dashboard/rest-todos",
    icon: <IoCheckboxOutline />,
  },
  {
    title: "Server Actions",
    href: "/dashboard/server-todos",
    icon: <IoListOutline />,
  },
  {
    title: "Cookies",
    href: "/dashboard/cookies",
    icon: <IoCodeWorkingOutline />,
  },
  {
    title: "Products",
    href: "/dashboard/products",
    icon: <IoBasketOutline />,
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: <IoPersonOutline />,
  },
];

export async function SideBar() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }
  const userName = session.user?.name ?? "No Name";
  const avartarUrl =
    session.user?.image ??
    "https://tailus.io/sources/blocks/stats-cards/preview/images/second_user.webp";
  const roles = session.user?.roles ?? [];

  return (
    <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
      <div>
        <div className="-mx-6 px-6 py-4">
          <Link href="/dashboard" title="home">
            <Image
              src="https://tailus.io/sources/blocks/stats-cards/preview/images/logo.svg"
              className="w-32"
              width={100}
              height={100}
              alt="tailus logo"
            />
          </Link>
        </div>

        <div className="mt-8 text-center">
          <Image
            src={avartarUrl}
            className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
            width={100}
            height={100}
            alt=""
          />
          <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">
            {userName}
          </h5>
          <span className="hidden text-gray-400 lg:block capitalize">
            {roles.join(",")}
          </span>
        </div>

        <ul className="space-y-2 tracking-wide mt-8">
          {menuItems.map((item, index) => (
            <SideBarItem
              key={index}
              title={item.title}
              path={item.href}
              icon={item.icon}
            />
          ))}
        </ul>
      </div>

      <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
        <LogoutButton />
      </div>
    </aside>
  );
}
