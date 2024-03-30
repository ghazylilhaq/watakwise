"use client";

import Link from "next/link";
import React from "react";

import SignInButton from "./SignInButton";
import { UserButton, useUser } from "@clerk/nextjs";
import { is } from "@xata.io/client";

const Navbar = () => {
  const { user, isLoaded } = useUser();

  return (
    <div className="fixed inset-x-0 top-0 bg-white dark:bg-gray-950 z-[10] h-fit border-b border-zinc-300  py-2 ">
      <div className="flex items-center justify-between h-full gap-2 px-8 mx-auto max-w-7xl">
        {/* Logo */}
        <Link href={"/"} className="flex items-center gap-2">
          <p className="rounded-lg border-2 border-b-4 border-r-4 border-black px-2 py-1 text-xl font-bold transition-all hover:-translate-y-[2px] md:block dark:border-white">
            WatakWise
          </p>
        </Link>
        <div className="flex items-center gap-4">
          {isLoaded && user && (
            <>
              <Link
                className="mr-2 text-l font-bold tracking-tight"
                href="/dashboard"
              >
                Dasboard
              </Link>
              <UserButton afterSignOutUrl="/" />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
