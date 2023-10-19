import { formatMoney } from "@/utils/moneyFormater";
import { Travel } from "@prisma/client";
import Link from "next/link";
import React from "react";

const CardBooking = ({
  travel,
  reservationBtn = true,
}: {
  travel: Travel;
  reservationBtn?: boolean;
}) => {
  return (
    <div className="border border-slate-400 rounded-md shadow-md px-4 py-2 max-w-md">
      <div>
        <h2 className="font-bold text-slate-700">{travel.cooperative}</h2>
        <p className="font-semibold text-slate-900">
          Date et heure de départ : &nbsp;
          <span className="font-normal text-gray-600">
            {new Date(travel.expireAfter).toDateString()}
            {" | "}
            {new Date(travel.expireAfter).toLocaleTimeString()}
          </span>
        </p>
        <p className="font-semibold text-slate-900">
          Place disponible:{" "}
          <span className="font-normal text-gray-600">
            {travel.availablePlace!}
          </span>
        </p>
        <p className="font-semibold text-slate-900">
          Fraix de transport:{" "}
          <span className="font-normal text-gray-600">
            {formatMoney(travel.price)}
            {" MGA"}
          </span>
        </p>
      </div>

      {reservationBtn && (
        <Link
          href={`/travel/${travel.id}`}
          className="btn btn-new p-2 mt-2 ml-auto mb-3 shadow-sm hover:shadow-md"
        >
          Reserver
        </Link>
      )}
    </div>
  );
};

export default CardBooking;
