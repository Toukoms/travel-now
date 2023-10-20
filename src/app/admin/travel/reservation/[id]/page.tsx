"use client";
import UserCard from "@/components/UserCard";
import { TRAVELS_ROUTE } from "@/routes/api.routes";
import { Reservation, User } from "@prisma/client";
import React, { useEffect, useState } from "react";

type Reservations = (Reservation & { user: User })[];

const getReservationByTravel = async (id: string) => {
  try {
    const res = await fetch(TRAVELS_ROUTE + `/reservation/${id}`, {
      cache: "no-cache",
    });
    return res.json();
  } catch (error) {
    console.error(error);
  }
};

const ReservationPage = ({ params }: { params: { id: string } }) => {
  const [reservations, setReservations] = useState<Reservations | null>(null);

  console.log(params.id);

  useEffect(() => {
    getReservationByTravel(params.id)
      .then((reservations) => setReservations(reservations))
      .catch((err) => {
        console.error(err);
        throw new Error(err.message);
      });
  }, [params.id]);

  if (!reservations) return <p>Loading...</p>;

  return reservations.length === 0 ? (
    <p>Aucun reservation</p>
  ) : (
    <div className="p-8 pt-2">
      <h2 className="mb-6 text-2xl font-bold">Liste de réservation</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:mx-auto">
        {reservations.map((reservation) => (
          <UserCard
            key={reservation.id}
            user={reservation.user}
            nbPlace={reservation.nbPlace}
            totalPrice={reservation.totalPrice}
          ></UserCard>
        ))}
      </div>
    </div>
  );
};

export default ReservationPage;
