import { strict_output } from "@/lib/gpt";
import { getAuthSession } from "@/lib/nextauth";
import { personalitySchema } from "@/schemas/form/personality";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export const runtime = "nodejs";
export const maxDuration = 500;

export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json();
    const { personality = [] } = personalitySchema.parse(body);
    let summary: any;

    summary = await strict_output(
      "You are a helpful AI that is able to generate a content that summarize combination of personality and create content out of it in bahasa indonesia. the content have a cathcy title that show the overall personality, a body content that explain the user persoality, store the content with title and body in a JSON array",
      `You are to generate an article that have the personnality combination of ${personality?.join(
        " and "
      )}`,
      {
        title: "a catchy title with max length of 150 characters",
        description:
          "body content that explain the user persoality with max length of 2200 characters",
      }
    );

    return NextResponse.json(
      {
        content: summary, 
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: error.issues },
        {
          status: 400,
        }
      );
    } else {
      console.error("elle gpt error", error);
      return NextResponse.json(
        { error: "An unexpected error occurred." },
        {
          status: 500,
        }
      );
    }
  }
}
