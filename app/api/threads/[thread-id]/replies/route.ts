import { getImageMetadata, uploadImageToS3 } from "@/utility/functions";
import { prisma } from "@/utility/prisma";
import { RecaptchaEnterpriseServiceClient } from "@google-cloud/recaptcha-enterprise";
import { NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: NextApiResponse) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get('id')

    const post = await prisma.post.findUnique({
      where: {
        id: Number(id),
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

function getReplyIds(comment: string) {
  let left = 0;
  let count = 0;
  let replyIds = [];

  for (let i = 0; i < comment.length; i++) {
    if (comment[i] === '>' && count < 2) {
      count++;
    } else if (comment[i].charCodeAt(0) >= 48 && comment[i].charCodeAt(0) <= 57 && count >= 2) {
      count++;
      if (comment.length === i + 1) {
        replyIds.push(comment.slice(left + 2, i + 1));
      }
    } else {
      if (count >= 2) {
        replyIds.push(comment.slice(left + 2, i));
        left = i + 1;
        count = 0;
      }
      left = i + 1;
      count = 0;
    }
  }

  return replyIds;
}

export async function POST(req: Request, res: NextApiResponse) {
  try {
    const formData = await req.formData();
    // const token = formData.get('token') as string;
    // const client = new RecaptchaEnterpriseServiceClient();
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

    const url = new URL(req.url);
    const postId = Number(url.pathname.split('/')[3]);
    const comment = formData.get('comment') as string;

    const image = formData.get('file') as unknown as File;

    let imageData;

    if (image) {
      imageData = await uploadImageToS3({ file: image, type: 'reply', fileName: formData.get('fileName') as string });
    }

    const newReplyId = await prisma.threadReplies.create({
      data: {
        image: imageData?.imageLink || null,
        comment,
        postId,
        imageResolution: imageData?.resolution,
        imageName: imageData?.fileName || null,
        imageSize: imageData?.fileSize || null,
      },
      select: {
        id: true,
      }
    })

    const allReplyIdsInComment = getReplyIds(comment);

    const allThreadReplies = await prisma.threadReplies.findMany({
      where: {
        postId,
      },
      select: {
        id: true,
      }
    })

    const replyMapping = new Map();

    for (const reply of allThreadReplies) {
      const replyKey = reply.id.toString() as keyof typeof replyMapping;
      replyMapping.set(replyKey, reply);
    }

    for (const replyId of allReplyIdsInComment) {
      const reply = replyMapping.get(replyId);
      if (reply && reply.id < newReplyId.id) {
        await prisma.threadReplies.update({
          where: {
            id: Number(replyId),
          },
          data: {
            replyReferences: {
              push: newReplyId.id,
            },
          },
        })

      } else if (Number(replyId) === postId) {
        await prisma.post.update({
          where: {
            id: postId,
          },
          data: {
            directReplies: {
              push: newReplyId.id,
            },
          },
        })
      }
    }

    await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        replies: {
          increment: 1,
        },
        images: {
          increment: !image ? 0 : 1,
        },
        updatedAt: new Date(),
      },
    })

    return NextResponse.json({ message: "Hello World" });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error creating new post" });
  }
}