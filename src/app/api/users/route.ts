import prismaClient from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    prismaClient.$connect();
    const users = await prismaClient.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!users) {
      return new NextResponse("No users found", { status: 404 });
    }

    return NextResponse.json(users);
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  } finally {
    prismaClient.$disconnect();
  }
}
