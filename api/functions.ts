import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
  region: process.env.AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  }
})

export async function uploadImageToS3({ file, type }: { file: File, type?: string }) {
  const buffer = Buffer.from(await file.arrayBuffer());

  const date = new Date();
  const key = type === 'thread' ? `threads/${date.getTime()}` : `replies/${date.getTime()}`;

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