import { titleFont } from "@/config/fonts";
import Link from "next/link";

export const Footer = () => {
  return (
    <div className="flex w-full justify-center text-xs mb-10">
      <Link href="/">
        <span className={`${titleFont.className} font-bold`}>Teslo </span>
        <span>| Shop </span>
        <span>C {new Date().getFullYear()}</span>
      </Link>
      <Link href="/" className="mx-3">
        Privacity & Legal
      </Link>
      <Link href="/" className="mx-3">
        Locations
      </Link>
    </div>
  );
};
