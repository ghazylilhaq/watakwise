import Link from "next/link";
import React from "react";
import SignInButton from "./SignInButton";
import { getAuthSession } from "@/lib/nextauth";
import UserAccountNav from "./UserAccountNav";

const Navbar = async () => {
  const session = await getAuthSession();

  return (
    <div className="fixed inset-x-0 top-0 bg-white dark:bg-gray-950 z-[10] h-fit border-b border-zinc-300  py-2 ">
      <div className="flex items-center justify-between h-full gap-2 px-8 mx-auto max-w-7xl">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <Link href={"/"} className="flex items-center gap-2">
            <p className="rounded-lg border-2 border-b-4 border-r-4 border-black px-2 py-1 text-xl font-bold transition-all hover:-translate-y-[2px] md:block dark:border-white">
              WatakWise
            </p>
          </Link>
          <p className="mr-2 ml-2 text-xl font-bold tracking-tight">
            {session ? `Halo! ${session?.user?.name}` : ""}
          </p>
        </div>

        {session?.user ? (
          <div className="flex items-center gap-4">
            <Link
              className="mr-2 text-l font-bold tracking-tight"
              href="/dashboard"
            >
              Dasboard
            </Link>
            <Link
              className="mr-2 text-l font-bold tracking-tight"
              href={`/profile/${session?.user.id}`}
            >
              Profile
            </Link>
            <UserAccountNav user={session.user} />
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <SignInButton  text={"Sign In"} />{" "}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
