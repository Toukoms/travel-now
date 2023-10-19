import prismaClient from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { travelId: string } }
) {
  try {
    const travelId = params.travelId;
    if (!travelId) {
      return new NextResponse("Missing user ID", { status: 400 });
    }

    prismaClient.$connect();
    const travel = await prismaClient.travel.findUnique({
      where: { id: travelId },
    });

    if (!travel) {
      return new NextResponse(`Couldn't find conversation ${travelId}`, {
        status: 404,
      });
    }

    return NextResponse.json(travel, { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  } finally {
    prismaClient.$disconnect();
  }
}
