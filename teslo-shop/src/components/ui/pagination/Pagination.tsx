"use client";

import Link from "next/link";
import { redirect, usePathname, useSearchParams } from "next/navigation";
import clsx from "clsx";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import { generatePaginationNumbers } from "@/utils";

interface Props {
  totalPages: number;
}

export function Pagination({ totalPages }: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page") || 1);
  if (currentPage < 1 || isNaN(+currentPage)) redirect(pathname);

  const paginationNumbers = generatePaginationNumbers(totalPages, currentPage);

  const createPageUrl = (pageNum: number | string) => {
    const params = new URLSearchParams(searchParams);

    if (pageNum === "...") {
      return `${pathname}?${params.toString()}`;
    }

    if (+pageNum <= 0) {
      return `${pathname}`;
    }

    if (+pageNum > totalPages) {
      return `${pathname}?${params.toString()}`;
    }

    params.set("page", pageNum.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="flex text-center justify-center mt-10 mb-32">
      <nav aria-label="Page navigation example">
        <ul className="flex list-style-none">
          <li className="page-item">
            <Link
              className="page-link relative block py-1.5 px-3  border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
              href={createPageUrl(currentPage - 1)}
            >
              <IoChevronBackOutline size={30} />
            </Link>
          </li>

          {paginationNumbers.map((page, index) => (
            <li key={`${page}-${index}`} className="page-item active">
              <Link
                className={clsx(
                  "page-link relative block py-1.5 px-3  border-0 outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-300 focus:shadow-none",
                  {
                    "bg-blue-600 shadow-sm text-white hover:bg-blue-700 hover:text-white":
                      page === currentPage,
                  }
                )}
                href={createPageUrl(page)}
              >
                {page}
              </Link>
            </li>
          ))}

          <li className="page-item">
            <Link
              className="page-link relative block py-1.5 px-3  border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
              href={createPageUrl(currentPage + 1)}
            >
              <IoChevronForwardOutline size={30} />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
