import { Reservation } from "@prisma/client";

export const countReservations = (reservations: Reservation[]) => {
  let total = 0;

  reservations.forEach((reservation) => {
    total += reservation.nbPlace;
  });

  return total;
};
