import SelectPersonality from "@/components/dashboard/SelectPersonality";
import { exportUserData } from "@/lib/clerk";
import React from "react";

type Props = {};

const DashboardPage = (props: Props) => {
  exportUserData();

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
