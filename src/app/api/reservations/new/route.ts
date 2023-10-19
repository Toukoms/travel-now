import { NextResponse } from "next/server";
import prismaClient from "@/lib/prismadb";

export async function POST(request: Request) {
  try {
    const { userId, nbPlace, totalPrice, expireAfter, travelId } =
      await request.json();

    prismaClient.$connect();
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

    if (reservation) {
      const travel = await prismaClient.travel.findUnique({
        where: {
          id: travelId,
        },
        include: {
          Reservation: true,
        },
      });

      console.log(travelId);

      const availablePlace = travel?.availablePlace! - reservation.nbPlace;

      console.log(availablePlace);

      const updatedTravel = await prismaClient.travel.update({
        where: {
          id: travelId,
        },
        data: {
          availablePlace: { set: availablePlace },
          Reservation: { set: [...travel?.Reservation!, reservation] },
        },
      });

      console.log(updatedTravel);

      if (!updatedTravel) {
        return NextResponse.json(
          { message: "Failed to update travel." },
          { status: 400 }
        );
      }
    }

    return NextResponse.json(reservation, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  } finally {
    prismaClient.$disconnect();
  }
}
