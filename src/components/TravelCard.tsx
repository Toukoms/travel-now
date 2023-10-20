import { formatMoney } from "@/utils/moneyFormater";
import { Travel } from "@prisma/client";
import React from "react";

const TravelCard = ({
  travel,
  nbPLace,
  totalPrice,
}: {
  travel: Travel;
  totalPrice: number;
  nbPLace: number;
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
          Place réservé:{" "}
          <span className="font-normal text-gray-600">{nbPLace}</span>
        </p>
        <p className="font-semibold text-slate-900">
          Frais total de transport:{" "}
          <span className="font-normal text-gray-600">
            {formatMoney(totalPrice)}
            {" MGA"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default TravelCard;
