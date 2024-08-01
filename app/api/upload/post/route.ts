import { NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { prisma } from "@/api/prisma";

const s3Client = new S3Client({
  region: process.env.AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  }
})

async function uploadImageToS3({ file }: { file: File }) {
  const buffer = Buffer.from(await file.arrayBuffer());

  const date = new Date();
  const key = `uploads/${date.getTime()}`;

  const params = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: key,
    Body: buffer,
    ContentType: file.type || '',
  }

  const command = new PutObjectCommand(params);
  const response = await s3Client.send(command);

  if (response['$metadata'].httpStatusCode !== 200) {
    throw new Error('Failed to upload image to S3');
  }

  return `https://${process.env.AWS_S3_BUCKET}.s3.amazonaws.com/${key}`;
}

export async function POST(req: Request, res: NextApiResponse) {
  try {
    const formData = await req.formData();

    const image = formData.get('file') as unknown as File;

    if (!image) {
      return NextResponse.json({ message: "No image uploaded" });
    }

    const imagelink = await uploadImageToS3({ file: image });

    await prisma.post.create({
      data: {
        image: imagelink,
        subject: formData.get('subject') as string,
        comment: formData.get('comment') as string,
      },
    })

    return NextResponse.json({ message: "Hello World" });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error creating new post" });
  }
}