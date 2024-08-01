import { getImageMetadata, uploadImageToS3 } from "@/api/functions";
import { prisma } from "@/api/prisma";
import { NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: NextApiResponse) {
  try {
    const url = new URL(req.url);
    const id = Number(url.pathname.split('/')[3]);
    const post = await prisma.post.findUnique({
      where: {
        id,
      },
      include: {
        ThreadReplies: {
          orderBy: {
            createdAt: "asc",
          }
        }

      }
    })

    if (!post) {
      return NextResponse.json({ message: "Post not found" });
    }

    const imageMetadata = await getImageMetadata(post.image);

    return NextResponse.json({post, imageMetadata});
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "Error getting thread and replies" });
  }
}

export async function POST(req: Request, res: NextApiResponse) {
  try {
    const url = new URL(req.url);
    const id = Number(url.pathname.split('/')[3]);
    const formData = await req.formData();

    const image = formData.get('file') as unknown as File;

    if (!image) {
      return NextResponse.json({ message: "No image uploaded" });
    }

    const imagelink = await uploadImageToS3({ file: image, type: 'reply' });

    await prisma.threadReplies.create({
      data: {
        image: imagelink,
        comment: formData.get('comment') as string,
        postId: id,
      },
    })

    return NextResponse.json({ message: "Hello World" });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error creating new post" });
  }
}