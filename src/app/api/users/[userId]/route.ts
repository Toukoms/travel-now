import prismaClient from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = params.userId;
    if (!userId) {
      return new NextResponse("Missing user ID", { status: 400 });
    }

    prismaClient.$connect();
    const user = await prismaClient.user.findUniqueOrThrow({
      where: { id: userId },
    });

    if (!user) {
      return new NextResponse(`Couldn't find conversation ${userId}`, {
        status: 404,
      });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  } finally {
    prismaClient.$disconnect();
  }
}
