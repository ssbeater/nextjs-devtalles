import { Metadata } from "next";

import { titleFont } from "@/config/fonts";
import { RegisterForm } from "./ui/RegisterForm";

export const metadata: Metadata = {
  title: "New Account",
  description: "Create an account for Teslo shop",
};

export default function NewAccountPage() {
  return (
    <main className="flex flex-col min-h-screen pt-32 sm:pt-52">
      <h1 className={`${titleFont.className} text-4xl mb-5`}>New Account</h1>
      <RegisterForm />
    </main>
  );
}
