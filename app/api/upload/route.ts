import { NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function POST(res: NextApiResponse) {
  return NextResponse.json({ message: "Hello World" });
}