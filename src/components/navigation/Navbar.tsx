import Link from "next/link";
import React from "react";
import SignInButton from "./SignInButton";
import { getAuthSession } from "@/lib/nextauth";
import UserAccountNav from "./UserAccountNav";

const Navbar = async () => {
  const session = await getAuthSession();

  return (
    <div className="flex items-center sm:justify-between  gap-0 lg:gap-2 px-8 mx-auto max-w-7xl fixed inset-x-0 top-0 bg-white dark:bg-gray-950 z-[10] h-fit border-b border-zinc-300  py-2">
      {/* Logo */}
      <div className="flex items-center gap-4">
        <Link href={"/"} className="flex items-center gap-2">
          <p className="lg:text-xl rounded-lg border-2 border-b-4 border-r-4 border-black px-2 py-1  font-bold transition-all hover:-translate-y-[2px] md:block dark:border-white md:text-sm">
            WatakWise
          </p>
        </Link>
        <p className="mr-2 ml-2 lg:text-xl md:opacity-100 font-bold tracking-tight opacity-0 text-[0px]">
          {session ? `Halo! ${session?.user?.name}` : ""}
        </p>
      </div>

      {session?.user ? (
        <div className="flex items-center lg:gap-4 gap-1 ">
          <div className="">
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
          </div>

          <UserAccountNav user={session?.user} />
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <SignInButton text={"Sign In"} />{" "}
        </div>
      )}
    </div>
  );
};

export default Navbar;
