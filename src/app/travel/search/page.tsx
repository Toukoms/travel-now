"use client";

import CardBooking from "@/components/CardBooking";
import { SEARCH_TRAVEL_ROUTE } from "@/routes/api.routes";
import { Travel } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { RiArrowLeftRightFill } from "react-icons/ri";

const getTravelsBy = async (
  depart: string,
  arrival: string,
  departDate: string
) => {
  try {
    const res = await fetch(SEARCH_TRAVEL_ROUTE, {
      method: "POST",
      body: JSON.stringify({
        departDate: departDate,
        arrival: arrival,
        depart: depart,
      }),
    });
    return (await res.json()) as Promise<Travel[]>;
  } catch (error) {
    console.error(error);
  }
};

const SearchPage = () => {
  const searchParams = useSearchParams();

  const depart = searchParams.get("depart");
  const arrival = searchParams.get("arrival");
  const departDate = searchParams.get("departDate");
  const [travels, setTravels] = useState<Travel[]>();
  const session = useSession();

  useEffect(() => {
    getTravelsBy(depart!, arrival!, departDate!)
      .then((travels) => setTravels(travels))
      .catch((err) => console.error(err));
  }, [arrival, depart, departDate]);

  if (!travels) return <p>Loading...</p>;

  if (session.status === "loading") return <p>Loading...</p>;

  return (
    <div className="px-4">
      <div className="w-full flex justify-between items-center gap-4 mb-4 flex-wrap">
        <div className="flex gap-2 items-baseline">
          <h2 className="text-xl font-bold">{depart}</h2>
          <RiArrowLeftRightFill />
          <h2 className="text-xl font-bold">{arrival}</h2>
        </div>
        <span className="font-semibold text-gray-600">
          {new Date(departDate!).toDateString()}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 place-items-center">
        {travels.length === 0 ? (
          <p className="pt-8 mx-auto text-3xl text-gray-400">
            Désolé, aucun résultat.
          </p>
        ) : (
          travels.map((travel) => (
            <CardBooking
              key={travel.id}
              travel={travel}
              reservationBtn={!session.data?.user.isAdmin}
            ></CardBooking>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchPage;
