import SelectPersonality from "@/components/dashboard/SelectPersonality";
import SummaryCard from "@/components/dashboard/SummaryCard";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";
import React from "react";
import { prisma } from "@/lib/db";

type Props = {};

const DashboardPage = async (props: Props) => {
  const session = await getAuthSession();
  if (!session?.user) {
    redirect("/");
  }

  const userPersonality = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      name: true,
      personalities: true,
    },
  });

  return (
    <main className="p-8 mx-auto max-w-7xl">
      <div className="flex items-center">
        <h2 className="mr-2 text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <div className="grid gap-4 mt-4 md:grid-cols-2 lg:grid-cols-1">
        {!userPersonality?.personalities ? (
          <SelectPersonality />
        ) : (
          <SummaryCard userId={session?.user.id} />
        )}
      </div>
      {/* <div className="grid gap-4 mt-4 md:grid-cols-2 lg:grid-cols-7">
        <SelectPersonality />
      </div> */}
    </main>
  );
};

export default DashboardPage;
