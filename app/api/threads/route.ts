import { NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { prisma } from "@/api/prisma";
import { uploadImageToS3 } from "@/api/functions";

export async function POST(req: Request, res: NextApiResponse) {
  try {
    const formData = await req.formData();

    const image = formData.get('file') as unknown as File;

    if (!image) {
      return NextResponse.json({ message: "No image uploaded" });
    }

    const imagelink = await uploadImageToS3({ file: image });

    const thread = await prisma.post.create({
      data: {
        image: imagelink,
        subject: formData.get('subject') as string,
        comment: formData.get('comment') as string,
      },
      select: {
        id: true,
      }
    })

    return NextResponse.json({ thread });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error creating new post" });
  }
}

export async function GET(req: Request, res: NextApiResponse) {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        updatedAt: "desc",
      }
    });
    return NextResponse.json(posts);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error retrieving posts" });
  }
}