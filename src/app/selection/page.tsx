import SelectPersonalityForm from "@/components/selection/SelectPersonalityForm";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";
import React from "react";

type Props = {};

const SelectionPage = async (props: Props) => {
  const session = await getAuthSession();
  if (!session?.user) {
    redirect("/");
  }

  return (
    <section className="">
      <SelectPersonalityForm userId={session?.user.id} />;
    </section>
  );
};

export default SelectionPage;
