import { getAuthSession } from "@/lib/nextauth";
import { personalitySchema } from "@/schemas/form/personality";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { PrismaClient } from "@prisma/client";
import axios from "axios";

const prisma = new PrismaClient();

export const POST = async (req: Request, res: Response) => {
  try {
    const session = await getAuthSession();

    // if (!session?.user) {
    //   return NextResponse.json(
    //     { error: "You must be logged in to get a summary of your profile" },
    //     {
    //       status: 401,
    //     }
    //   );
    // }

    const body = await req.json();
    const { personality = [] } = personalitySchema.parse(body);

    // Retrieve the names of the personalities from the request
    const personalityNames = personality;

    // Check if the personalities exist in the database
    const matchedPersonalities = await prisma.personality.findMany({
      where: { name: { in: personalityNames } },
    });

    if (matchedPersonalities.length !== personalityNames.length) {
      const missingPersonalities = personalityNames.filter(
        (name) => !matchedPersonalities.some((p) => p.name === name)
      );
      return NextResponse.json(
        {
          error: `The following personalities were not found in the database: ${missingPersonalities.join(
            ", "
          )}`,
        },
        {
          status: 404,
        }
      );
    }

    // Connect the matched personalities to the user in the database
    const user = await prisma.user.update({
      where: { id: session?.user?.id },
      data: {
        personalities: {
          connect: matchedPersonalities.map((p) => ({ id: p.id })),
        },
      },
    });

    const { data } = await axios.post(`${process.env.API_URL}/api/summary`, {
      personality,
    });

    const content = await prisma.content.create({
      data: {
        title: data.summary.title,
        description: data.summary.description,
        contentCategoryTitle: "Summary",
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: session?.user?.id ?? "", // Add null check for session and provide default value
      },
    });

    return NextResponse.json({ user: user, content: content }, { status: 200 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    } else {
      console.error("An unexpected error occurred:", error);
      return NextResponse.json(
        { error: "An unexpected error occurred." },
        { status: 500 }
      );
    }
  }
};
