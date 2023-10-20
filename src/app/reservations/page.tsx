"use client";
import TravelCard from "@/components/TravelCard";
import { RESERVATIONS_ROUTE } from "@/routes/api.routes";
import { Reservation, Travel } from "@prisma/client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

type Reservations = (Reservation & { travel: Travel })[];

const getReservationByUser = async (id: string) => {
  try {
    const res = await fetch(RESERVATIONS_ROUTE + `/reservation/${id}`, {
      cache: "no-cache",
    });
    return res.json();
  } catch (error) {
    console.error(error);
  }
};

const ReservationPage = () => {
  const session = useSession();
  const [reservations, setReservations] = useState<Reservations | null>(null);

  useEffect(() => {
    if (session.status !== "loading") {
      if (session.status === "authenticated" && session.data.user) {
        getReservationByUser(session.data.user.id)
          .then((reservations) => setReservations(reservations))
          .catch((err) => {
            console.error(err);
            throw new Error(err.message);
          });
      }
    }
  }, [session.data, session.status]);

  if (!reservations) return <p>Loading...</p>;

  if (session.status === "loading") return <p>Loading...</p>;

  return reservations.length === 0 ? (
    <p>Aucun reservation</p>
  ) : (
    <div className="p-8 pt-2">
      <h2 className="mb-6 text-2xl font-bold">Liste de réservation</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:mx-auto">
        {reservations.map((reservation) => (
          <TravelCard
            key={reservation.id}
            travel={reservation.travel}
            totalPrice={reservation.totalPrice}
            nbPLace={reservation.nbPlace}
          ></TravelCard>
        ))}
      </div>
    </div>
  );
};

export default ReservationPage;
