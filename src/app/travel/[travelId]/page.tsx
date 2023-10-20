"use client";
import CardBooking from "@/components/CardBooking";
import { NEW_RESERVATION_ROUTE, TRAVELS_ROUTE } from "@/routes/api.routes";
import { formatMoney } from "@/utils/moneyFormater";
import { Travel } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { RiArrowLeftRightFill } from "react-icons/ri";

type Reservation = {
  userId: string;
  nbPlace: number;
  totalPrice: number;
  expireAfter?: Date;
  travelId: string;
};

const getTravelById = async (travelId: string) => {
  try {
    const res = await fetch(TRAVELS_ROUTE + `/${travelId}`);
    if (!(res.ok && res.status === 200)) {
      throw new Error(await res.json());
    }
    return (await res.json()) as Promise<Travel>;
  } catch (error) {
    console.error(error);
  }
};

const updateTravel = async (reservationId: string, travelId: string) => {
  try {
    const res = await fetch(TRAVELS_ROUTE + `/${travelId}`, {
      method: "put",
      body: JSON.stringify({ reservationId: reservationId }),
    });
    if (res.ok && res.status === 200) {
      console.log("Success updating travel");
    }
  } catch (error) {
    console.error();
  }
};

const ReservaTionPage = ({ params }: { params: { travelId: string } }) => {
  const session = useSession();
  const [travel, setTravel] = useState<Travel>();
  const [reservation, setReservation] = useState<Reservation>({
    userId: "",
    nbPlace: 0,
    totalPrice: 0,
    travelId: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    getTravelById(params.travelId)
      .then((travel) => setTravel(travel))
      .catch((err) => {
        console.error(err);
        throw new Error(err.message);
      });
  }, [params.travelId]);

  useEffect(() => {
    if (session.status === "authenticated" && session.data != null) {
      if (session.data.user.isAdmin) router.push("/admin/dashboard");
      reservation.userId = session.data?.user.id;
    }
  }, [reservation, router, session.data, session.status]);

  if (!travel) return <p>Loading...</p>;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    reservation.totalPrice = travel.price * reservation.nbPlace;
    reservation.expireAfter = travel.expireAfter;
    reservation.travelId = travel.id;
    const validNbPlace =
      0 < reservation.nbPlace && reservation.nbPlace <= travel.availablePlace!;
    if (
      reservation.userId &&
      validNbPlace &&
      reservation.totalPrice &&
      reservation.expireAfter &&
      reservation.travelId
    ) {
      try {
        const res = await fetch(NEW_RESERVATION_ROUTE, {
          method: "post",
          body: JSON.stringify(reservation),
        });
        if (res.ok && res.status === 201) {
          // const reservationCreated = await res.json();
          // await updateTravel(reservationCreated.id, params.travelId);
          setSuccess(true);
          // router.push("/reservations");
        } else {
          setError("Reservation échoué.");
        }
      } catch (error) {
        console.error();
      }
    } else {
      setError("Information manquante");
      if (!validNbPlace)
        setError(
          "Le nombre de place à réserver ne devrait pas dépasser le nombre de place disponible."
        );
    }
    setLoading(false);
    if (error) {
      setSuccess(false);
    } else {
      setSuccess(true);
    }
  };

  console.log(reservation);

  return (
    <div className="px-8 py-4 max-w-lg">
      <div className="w-full flex justify-between items-center gap-4 mb-4 flex-wrap">
        <div className="flex gap-2 items-baseline">
          <h2 className="text-xl font-bold">{travel.departure}</h2>
          <RiArrowLeftRightFill />
          <h2 className="text-xl font-bold">{travel.arrival}</h2>
        </div>
      </div>
      <CardBooking travel={travel} reservationBtn={false}></CardBooking>
      <form className="mt-6" onSubmit={handleSubmit}>
        <h2 className="text-2xl mb-3">
          Combien de place voulez vous réserver?
        </h2>
        <p className="mb-2">
          Nombre de place disponible: {travel.availablePlace!}
        </p>
        <label htmlFor="nb-place" className="flex flex-col mb-2 leading-8">
          <input
            type="number"
            required
            min={1}
            max={travel.availablePlace!}
            value={reservation?.nbPlace || ""}
            onChange={(event) =>
              setReservation({
                ...reservation,
                nbPlace: parseInt(event.target.value) || 0,
              } as Reservation)
            }
            name="nb-place"
            id="nb-place"
            className="bg-gray-200 border border-slate-700 px-2 pt-2 pb-1 rounded-sm focus:outline-none"
            placeholder="Nombre de place"
          />
        </label>

        <p className="text-lg text-slate-800">
          Fraix de transport Total:{" "}
          {formatMoney(travel.price * reservation.nbPlace)}
          {" MGA"}
        </p>

        {/* Error & Success message */}
        {error ? (
          <p className="text-red-400 leading-none text-sm mt-4">* {error}</p>
        ) : (
          success && (
            <p className="text-green-400 leading-none text-sm mt-4">
              Votre réservation est belle et bien envoyé.
            </p>
          )
        )}

        <button
          type="submit"
          disabled={loading}
          className="btn btn-sky px-8 mt-6"
        >
          {loading ? "..." : "Valider"}
        </button>
      </form>
    </div>
  );
};

export default ReservaTionPage;
