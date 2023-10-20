import prismaClient from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await prismaClient.$connect();
    const travels = await prismaClient.travel.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        Reservation: true,
      },
    });

    return NextResponse.json(travels);
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  } finally {
    await prismaClient.$disconnect();
  }
}
