import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { prisma } from "@/lib/db";
import Image from "next/image";
import { cn } from "@/lib/utils";

type Props = {
  params: { userId: string };
};

const summaryPage = async ({ params: { userId } }: Props) => {
  const session = await getAuthSession();
  if (!session?.user) {
    redirect("/");
  }

  if (session.user && session.user.id !== userId) {
    return <p>The id in the URL does not match the user id.</p>;
  }

  const userPersonality = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      personalities: {
        select: {
          id: true,
          name: true,
          category: true,
          image: true,
        },
      },
      contents: {
        select: {
          title: true,
          description: true,
        },
        where: {
          contentCategoryTitle: "summary",
        },
      },
    },
  });

  const content = userPersonality?.contents[0];

  return (
    <main className="p-8 mx-auto max-w-7xl">
      <div className={`grid gap-4 mt-4 md:grid-cols-1 lg:grid-cols-1`}>
        <Card className="">
          <CardHeader>
            <CardTitle className="mr-2 lg:text-3xl font-bold tracking-tight text-base">
              {content?.title}
            </CardTitle>
            {/* <CardDescription>
              this is what your selection about your personality
            </CardDescription> */}
          </CardHeader>
          <CardContent className="">
            <p className="lg:text-lg md:text-base text-sm ">
              {content?.description}
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default summaryPage;
