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

    await prismaClient.$connect();
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
    await prismaClient.$disconnect();
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { travelId: string } }
) {
  try {
    const travelId = params.travelId;
    const { reservationId } = await request.json();

    await prismaClient.$connect();

    const reservation = await prismaClient.reservation.findFirst({
      where: {
        id: reservationId,
      },
    });

    const travel = await prismaClient.travel.findUnique({
      where: {
        id: travelId,
      },
      include: {
        Reservation: true,
      },
    });

    console.log(reservation);

    const availablePlace = travel?.availablePlace! - reservation?.nbPlace!;

    console.log(availablePlace);

    const updatedTravel = await prismaClient.travel.update({
      where: {
        id: travelId,
      },
      data: {
        availablePlace,
      },
    });

    console.log(updatedTravel);

    if (!updatedTravel) {
      return NextResponse.json(
        { message: "Failed to update travel." },
        { status: 400 }
      );
    }

    return NextResponse.json(updatedTravel);
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  } finally {
    await prismaClient.$disconnect();
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { travelId: string } }
) {
  try {
    const travelId = params.travelId;
    await prismaClient.$connect();
    const travel = await prismaClient.travel.delete({
      where: {
        id: travelId,
      },
    });

    return NextResponse.json(travel);
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  } finally {
    await prismaClient.$disconnect();
  }
}
