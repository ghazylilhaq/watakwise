import { getAuthSession } from "@/lib/nextauth";
import { personalitySchema } from "@/schemas/form/personality";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import axios from "axios";

export const POST = async (req: Request, res: Response) => {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return NextResponse.json(
        { error: "You must be logged in to update your profile" },
        {
          status: 401,
        }
      );
    }

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

    // Update the user's personalities in the database
    const user = await prisma.user.update({
      where: { id: session?.user?.id },
      data: {
        personalities: {
          set: matchedPersonalities.map((p) => ({ id: p.id })),
        },
      },
    });

    revalidatePath(`/profile/[userId]`, "page");

    // Return success response
    return NextResponse.json({ user: user }, { status: 200 });
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

export const GET = async (req: Request, res: Response) => {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return NextResponse.json(
        { error: "You must be logged in to get user data" },
        {
          status: 401,
        }
      );
    }
    const userPersonality = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        name: true,
        personalities: {
          select: {
            name: true,
          },
        },
      },
    });
    return NextResponse.json({ user: userPersonality }, { status: 200 });
  } catch (error) {
    console.error("An unexpected error occurred:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
};
