import prismaClient from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { departure, arrival, departureDate } = await request.json();

    if (!departure && !arrival && !departureDate) {
      return NextResponse.json(
        { message: "Invalide Credentials" },
        { status: 401 }
      );
    }

    prismaClient.$connect();
    const travels = await prismaClient.travel.findMany({
      where: {
        departure: departure,
        arrival: arrival,
        departureDate: departureDate,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return NextResponse.json(travels || []);
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  } finally {
    prismaClient.$disconnect();
  }
}
