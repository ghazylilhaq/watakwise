import React from "react";
import { redirect } from "next/navigation";

type Props = {};

const page = (props: Props) => {
  redirect("/");
  return <div>page</div>;
};

export default page;
