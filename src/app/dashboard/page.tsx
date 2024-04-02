import SelectPersonality from "@/components/dashboard/SelectPersonality";
import { getAuthSession } from "@/lib/nextauth";
import { auth, currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

type Props = {};

const DashboardPage = async (props: Props) => {
  const session = await getAuthSession();
  if (!session?.user) {
    redirect("/");
  }

  return (
    <main className="p-8 mx-auto max-w-7xl">
      <div className="flex items-center">
        <h2 className="mr-2 text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <div className="grid gap-4 mt-4 md:grid-cols-2 lg:grid-cols-1">
        <SelectPersonality />
      </div>
      {/* <div className="grid gap-4 mt-4 md:grid-cols-2 lg:grid-cols-7">
        <SelectPersonality />
      </div> */}
    </main>
  );
};

export default DashboardPage;
