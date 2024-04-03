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
import Link from "next/link";
import { Button } from "@/components/ui/button";

type Props = {
  params: { userId: string };
};

const ProfilePage = async ({ params: { userId } }: Props) => {
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
    },
  });

  return (
    <main className="p-8 mx-auto max-w-7xl">
      {!userPersonality?.personalities[0] ? (
        <div className=" flex-col items-center justify-center align-middle ">
          <h2 className="mr-2 text-3xl font-bold tracking-tight">
            Kamu belum pilih kepribadian
          </h2>
          <Button variant="link">
            <Link href="/selection">pilih kepribadianmu disini</Link>
          </Button>{" "}
        </div>
      ) : (
        <>
          <div className="flex items-center">
            <h2 className="mr-2 text-3xl font-bold tracking-tight">
              Your Personality
            </h2>
          </div>
          <div
            className={`grid gap-4 mt-4 md:grid-cols-2 lg:grid-cols-${userPersonality?.personalities.length}`}
          >
            {userPersonality?.personalities.map((personality) => (
              <Card key={personality.id}>
                <CardHeader>
                  <CardTitle className=" font-semibold">
                    {personality.category.title.toUpperCase()}
                  </CardTitle>
                  {/* <CardDescription>
                this is what your selection about your personality
              </CardDescription> */}
                </CardHeader>
                <CardContent>
                  <p>{personality.name}</p>
                  <Image
                    src={personality.image ?? ""}
                    alt={personality.name}
                    width={200}
                    height={200}
                  ></Image>
                </CardContent>
              </Card>
            ))}
          </div>
          <Button variant="link">
            <Link href="/selection">pilih kepribadian baru</Link>
          </Button>{" "}
        </>
      )}
    </main>
  );
};

export default ProfilePage;
