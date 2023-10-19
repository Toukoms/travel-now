import { NextResponse } from "next/server";
import prismaClient from "@/lib/prismadb";

export async function POST(request: Request) {
  try {
    const {
      cooperative,
      departure,
      arrival,
      departureDate,
      departureTime,
      price,
      maxPlace,
    } = await request.json();

    if (
      !departure &&
      !arrival &&
      !cooperative &&
      !departureDate &&
      !departureTime &&
      !maxPlace &&
      !price
    ) {
      return NextResponse.json(
        { message: "Invalide Credentials" },
        { status: 401 }
      );
    }

    prismaClient.$connect();
    const sameTravel = await prismaClient.travel.findFirst({
      where: {
        cooperative: cooperative,
        departure: departure,
        arrival: arrival,
        departureDate: departureDate,
        departureTime: departureTime,
      },
    });

    if (sameTravel) {
      return NextResponse.json(
        { message: "Same travel already exist." },
        { status: 409 }
      );
    }

    const travel = await prismaClient.travel.create({
      data: {
        cooperative,
        departure,
        arrival,
        departureDate,
        departureTime,
        price,
        maxPlace,
        availablePlace: maxPlace,
        expireAfter: new Date(`${departureDate}T${departureTime}:00`),
      },
    });

    return NextResponse.json(travel, { status: 201 });
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
