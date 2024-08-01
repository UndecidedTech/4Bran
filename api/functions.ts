import { GetObjectCommand, HeadObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import sharp from 'sharp';

const s3Client = new S3Client({
  region: process.env.AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  }
})

export async function uploadImageToS3({ file, type, fileName }: { file: File, type?: string, fileName?: string }) {
  const buffer = Buffer.from(await file.arrayBuffer());

  const imageMetadata = await sharp(buffer).metadata();
  const fileSize = imageMetadata.size;
  const resolution = `${imageMetadata.width}x${imageMetadata.height}`;

  if (!fileSize || !resolution || !fileName) {
    throw new Error('Failed to get image metadata');
  }


  const date = new Date();
  const key = type === 'thread' ? `threads/${date.getTime()}` : `replies/${date.getTime()}`;

  const params = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: key,
    Body: buffer,
    ContentType: file.type || '',
    Metadata: {
      fileSize: fileSize > 1024 * 1024 ? `${(fileSize / (1024 * 1024)).toFixed(2)} MB` : `${(fileSize / 1024).toFixed(2)} KB`,
      resolution,
      fileName,
    }
  }

  const command = new PutObjectCommand(params);
  const response = await s3Client.send(command);

  if (response['$metadata'].httpStatusCode !== 200) {
    throw new Error('Failed to upload image to S3');
  }

  return `https://${process.env.AWS_S3_BUCKET}.s3.amazonaws.com/${key}`;
}

export async function getImageMetadata(url: string) {
  const key = url.split('/').pop();
  const params = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: `threads/${key}`,
  }


  const command = new HeadObjectCommand(params);
  const headData = await s3Client.send(command);
  return headData.Metadata;
}