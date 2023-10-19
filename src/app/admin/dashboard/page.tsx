"use client";
import { Travel } from "@prisma/client";
import Link from "next/link";
import React, { use, useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
import { twMerge } from "tailwind-merge";
import DataTable, { ColumnsTableProps } from "./_components/DataTable";
import { TRAVELS_ROUTE } from "@/routes/api.routes";
import { formatMoney } from "@/utils/moneyFormater";

const getTravels = async () => {
  try {
    const res = await fetch(TRAVELS_ROUTE, { cache: "no-cache" });
    return res.json() as Promise<Travel[]>;
  } catch (error) {
    console.error(error);
  }
};

const AdminPage = () => {
  const [travels, setTravels] = useState<Travel[] | null>(null);

  useEffect(() => {
    getTravels()
      .then((travels) => {
        setTravels(travels!);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const columns: ColumnsTableProps<Travel>[] = [
    {
      name: "Cooperative",
      selector: (row) => row.cooperative,
    },
    {
      name: "Départ",
      selector: (row) => row.departure,
    },
    {
      name: "Arrivé",
      selector: (row) => row.arrival,
    },
    {
      name: "Date et heure de départ",
      selector: (row) => row.departureDate + " " + row.departureTime,
    },
    {
      name: "Maximum place",
      selector: (row) => row.maxPlace,
    },
    {
      name: "Place disponible",
      selector: (row) => row.availablePlace!,
    },
    {
      name: "Frais de transport",
      selector: (row) => formatMoney(row.price) + " MGA",
    },
  ];

  return (
    <div className="p-4 pt-0">
      <div className="flex justify-between items-center gap-2 mb-2 mx-4">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <Link
          href={"/admin/travel/new"}
          className={twMerge("btn btn-new", "py-2 px-4 uppercase")}
        >
          <MdAdd size={20} className="border rounded-sm" />
          New
        </Link>
      </div>

      {/* Table of all houses */}
      <DataTable data={travels || []} columns={columns} />
    </div>
  );
};

export default AdminPage;
