import { getAuthSession } from "@/lib/nextauth";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import axios from "axios";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const POST = async (req: Request, res: Response) => {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return NextResponse.json(
        { error: "You must be logged in to create a content " },
        {
          status: 401,
        }
      );
    }

    const personalities = await prisma.user.findUnique({
      where: {
        id: session?.user.id,
      },
      select: {
        personalities: true,
      },
    });

    const personalityNames = personalities?.personalities.map((p) => p.name);

    const { contentType } = await req.json();
    const { data } = await axios.post(
      `${process.env.API_URL}/api/${contentType}`,
      {
        personality: personalityNames,
      }
    );

    const existingContent = await prisma.content.findFirst({
      where: {
        contentCategoryTitle: contentType,
        user: {
          id: session?.user?.id,
        },
      },
    });

    if (!existingContent) {
      const newContent = await prisma.content.create({
        data: {
          title: data.content.title,
          description: data.content.description,
          updatedAt: new Date(),
          createdAt: new Date(),
          contentCategory: {
            connect: {
              title: contentType,
            },
          },
          user: {
            connect: {
              id: session?.user?.id,
            },
          },
        },
      });
      revalidatePath("/content", "layout");
      return NextResponse.json(
        { content: newContent, message: "new content has been created" },
        { status: 200 }
      );
    } else {
      const newContent = await prisma.content.updateMany({
        where: {
          contentCategoryTitle: contentType,
          user: {
            id: session?.user?.id,
          },
        },
        data: {
          title: data.content.title,
          description: data.content.description,
          updatedAt: new Date(),
        },
      });
      revalidatePath("/content", "layout");
      return NextResponse.json(
        { content: newContent, message: "new content has been created" },
        { status: 200 }
      );
      // Do something with summary if needed
    }
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
