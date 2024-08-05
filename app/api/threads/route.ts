import { NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { prisma } from "@/utility/prisma";
import { uploadImageToS3 } from "@/utility/functions";
import { RecaptchaEnterpriseServiceClient } from "@google-cloud/recaptcha-enterprise";
import fs from "fs";
import axios from "axios";

export async function POST(req: Request, res: NextApiResponse) {
  try {
    const formData = await req.formData();

    const token = formData.get('token') as string;

    const res = await axios.post(`https://recaptchaenterprise.googleapis.com/v1/projects/bran-1722634856780/assessments?key=${process.env.NEXT_PUBLIC_RECAPTCHA_KEY}`, 
      {
        event: {
          token: token,
          expectedAction: "USER_ACTION",
          siteKey: "6Lf1-h0qAAAAACGCdIwjjJdMJA751Y53cugFR6mq",
        }
      }, { 
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    });

    console.log(res.data);

    if (res && res.data?.success && res.data?.score > 0.5) {
      console.log('success');

      // const client = new RecaptchaEnterpriseServiceClient({ credentials: credentials });
      
      // const projectPath = client.projectPath('bran-1722634856780');
      // const request = ({
      //   assessment: {
      //     event: {
      //       token: token,
      //       expectedAction: "USER_ACTION",
      //       siteKey: process.env.NEXT_PUBLIC_RECAPTCHA_KEY,
      //     }
      //   },
      //   parent: projectPath
      // })

      // const [ response ] = await client.createAssessment(request);

      // if (!response || !response.riskAnalysis || !response.riskAnalysis.score) {
      //   return NextResponse.json({ message: "Failed to verify recaptcha" });
      // }

      // if (response.riskAnalysis.score < 0.5) {
      //   return NextResponse.json({ message: "Failed to verify recaptcha" });
      // }

      const image = formData.get('file') as unknown as File;

      if (!image) {
        return NextResponse.json({ message: "No image uploaded" });
      }

      const imageData = await uploadImageToS3({ file: image, type: 'thread', fileName: formData.get('fileName') as string });

      const thread = await prisma.post.create({
        data: {
          image: imageData.imageLink,
          subject: formData.get('subject') as string,
          comment: formData.get('comment') as string,
          imageSize: imageData.fileSize,
          imageResolution: imageData.resolution,
          imageName: imageData.fileName,
        },
        select: {
          id: true,
        }
      })

      return NextResponse.json({ thread });
    } else {
      return NextResponse.json({ message: "Failed to verify recaptcha" });
    }
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