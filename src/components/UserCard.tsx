import { formatMoney } from "@/utils/moneyFormater";
import { Reservation, User } from "@prisma/client";
import React from "react";

const UserCard = ({
  user,
  nbPlace,
  totalPrice,
}: {
  user: User;
  nbPlace: number;
  totalPrice: number;
}) => {
  return (
    <div className="border border-slate-400 rounded-md shadow-md px-4 py-2 max-w-md">
      <div>
        <h2 className="font-bold text-slate-700 text-lg">{user.name}</h2>
        <h2 className="font-bold text-slate-700">{user.firstName}</h2>
        <p className="font-semibold text-slate-900">
          Email: &nbsp;
          <span className="font-normal text-gray-600">{user.email}</span>
        </p>
        <p className="font-semibold text-slate-900">
          N° de télephone:{" "}
          <span className="font-normal text-gray-600">{user.telNumber}</span>
        </p>
        <p className="font-semibold text-slate-900">
          Cin: <span className="font-normal text-gray-600">{user.cin}</span>
        </p>
        <p className="font-semibold text-slate-900">
          Nombre de place réserver:{" "}
          <span className="font-normal text-gray-600">{nbPlace}</span>
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

export default UserCard;
