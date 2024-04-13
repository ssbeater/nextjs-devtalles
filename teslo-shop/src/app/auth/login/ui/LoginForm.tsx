"use client";
import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import Link from "next/link";

import { IoInformationOutline } from "react-icons/io5";
import clsx from "clsx";

import { authenticate } from "@/actions";

export const LoginForm = () => {
  const [state, dispatch] = useFormState(authenticate, undefined);

  useEffect(() => {
    if (state === "Success") window.location.replace("/");
  }, [state]);

  return (
    <form action={dispatch} className="flex flex-col">
      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        name="email"
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
      />

      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        name="password"
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
      />
      <div
        className="flex h-8 items-end space-x-1"
        aria-live="polite"
        aria-atomic="true"
      >
        {state === "Invalid credentials." && (
          <div className="mb-2 flex flex-row">
            <IoInformationOutline className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-500">Invalid credentials</p>
          </div>
        )}
      </div>

      <LoginButton />

      {/* divisor l ine */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link href="/auth/new-account" className="btn-secondary text-center">
        Create Account
      </Link>
    </form>
  );
};

function LoginButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={clsx({ "btn-primary": !pending, "btn-disabled": pending })}
    >
      Login
    </button>
  );
}
