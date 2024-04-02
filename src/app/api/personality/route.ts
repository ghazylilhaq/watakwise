import { personalitySchema } from "@/schemas/form/personality";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export const POST = async (req: Request, res: Response) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json(
        { error: "You must be logged in to get a summary of your profile" },
        {
          status: 401,
        }
      );
    }

    const body = await req.json();
    const { mbti, zodiac } = personalitySchema.parse(body);
    return NextResponse.json({ hello: "world" });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
  }
};
