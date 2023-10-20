import prismaClient from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    if (!id) {
      return new NextResponse("Missing travel ID", { status: 400 });
    }

    await prismaClient.$connect();
    const reservations = await prismaClient.reservation.findMany({
      where: {
        userId: id,
      },
      include: {
        travel: true,
      },
    });

    return NextResponse.json(reservations, { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  } finally {
    await prismaClient.$disconnect();
  }
}
