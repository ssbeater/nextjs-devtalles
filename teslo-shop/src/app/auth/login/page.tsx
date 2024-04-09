import { Metadata } from "next";
import { titleFont } from "@/config/fonts";
import { LoginForm } from "./ui/LoginForm";

export const metadata: Metadata = {
  title: "Login",
  description: "Teslo shop's Login page",
};

export default function LoginPage() {
  return (
    <main className="flex flex-col min-h-screen pt-32 sm:pt-52">
      <h1 className={`${titleFont.className} text-4xl mb-5`}>Login</h1>
      <LoginForm />
    </main>
  );
}
