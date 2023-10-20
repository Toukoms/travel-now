import { NextResponse } from "next/server";
import prismaClient from "@/lib/prismadb";

export async function POST(request: Request) {
  try {
    const { userId, nbPlace, totalPrice, expireAfter, travelId } =
      await request.json();

    await prismaClient.$connect();
    const reservationAlreadyExist = await prismaClient.reservation.findFirst({
      where: {
        userId: userId,
        travelId: travelId,
      },
    });

    if (reservationAlreadyExist) {
      return NextResponse.json(
        { message: "Reservation already exist." },
        { status: 409 }
      );
    }

    const reservation = await prismaClient.reservation.create({
      data: {
        userId,
        nbPlace,
        totalPrice,
        expireAfter,
        travelId,
      },
    });

    return NextResponse.json(reservation, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  } finally {
    await prismaClient.$disconnect();
  }
}
