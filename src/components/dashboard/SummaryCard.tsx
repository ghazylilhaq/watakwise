"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { BrainCircuit } from "lucide-react";

type Props = {
  userId: string;
};

const SummaryCard = ({ userId }: Props) => {
  const router = useRouter();
  return (
    <Card
      className="hover:cursor-pointer hover:opacity-75"
      onClick={() => {
        router.push(`/content/summary/${userId}`);
      }}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-2xl font-bold">Siapakah dirimu?</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          lihat ringkasan kepribadianmu dan ketahui dirimu lebih dalam
        </p>
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
