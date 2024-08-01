import { prisma } from "@/api/prisma";
import { NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: NextApiResponse) {
  try {
    await prisma.threadReplies.findMany()
    return NextResponse.json({ message: "Hello World" });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "Error creating new reply" });
  }
}

export async function POST(req: Request, res: NextApiResponse) {
  try {
    // console.log(req.query.id)
    const formData = await req.formData();

    const image = formData.get('file') as unknown as File;

    if (!image) {
      return NextResponse.json({ message: "No image uploaded" });
    }

    // const imagelink = await uploadImageToS3({ file: image });

    // await prisma.threadReplies.create({
    //   data: {
    //     image: imagelink,
    //     comment: formData.get('comment') as string,
    //     postId: parseInt(req.query.id as string),
    //   },
    // })

    return NextResponse.json({ message: "Hello World" });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error creating new post" });
  }
}