"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";

type Props = {
  children: React.ReactNode;
};

const Provide = ({ children }: Props) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default Provide;
