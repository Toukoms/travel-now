"use client";
import Dropdown from "@/components/Dropdown";
import { getDateString } from "@/utils/dateFormater";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const provinces = [
  "Mahajanga",
  "Antananarivo",
  "Fianarantsoa",
  "Antsiranana",
  "Toliara",
  "Toamasina",
];
const sortedProvinces = provinces.sort();

const TravelPage = () => {
  const [depart, setDepart] = useState<string | null>(null);
  const [arrival, setArrival] = useState<string | null>(null);
  const [departProvinces, setDepartProvinces] =
    useState<string[]>(sortedProvinces);
  const [arrivalProvinces, setArrivalProvinces] =
    useState<string[]>(sortedProvinces);
  const [departDate, setDepartDate] = useState(
    getDateString(new Date(Date.now()))
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    if (!depart || !arrival || !departDate) {
      setError("Veuillez remplir tous les informations.");
      setLoading(false);
    } else {
      router.push(
        `/travel/search?depart=${depart}&arrival=${arrival}&departDate=${departDate}`
      );
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="w-80 bg-slate-200 rounded-lg px-8 pt-8 pb-4 border border-slate-400/75 shadow-md mx-auto text-slate-700"
      >
        <h1 className="bold text-xl mb-6">Recherche</h1>

        {/* All inputs */}
        <Dropdown
          options={departProvinces}
          value={depart!}
          onChange={(value) => {
            setDepart(value);
            setArrivalProvinces(
              sortedProvinces.filter((province) => province !== value)
            );
          }}
          placeholder="Depart"
          className="mb-2"
        ></Dropdown>

        <Dropdown
          options={arrivalProvinces}
          value={arrival!}
          onChange={(value) => {
            setArrival(value);
            setDepartProvinces(
              sortedProvinces.filter((province) => province !== value)
            );
          }}
          placeholder="Arrivé"
          className="mb-1"
        ></Dropdown>

        <label htmlFor="depart-date" className="flex flex-col mb-2 leading-10">
          Date de départ :
          <input
            type="date"
            min={getDateString(new Date(Date.now()))}
            value={departDate}
            onChange={(event) => setDepartDate(event.target.value)}
            name="depart-date"
            id="depart-date"
            className="bg-gray-200 border border-slate-700 px-2 pt-2 pb-1 rounded-md focus:outline-none leading-normal mb-3"
            placeholder="Date de départ"
          />
        </label>

        {/* Error message */}
        {error && (
          <p className="text-red-400 leading-none text-sm mt-4">* {error}</p>
        )}

        {/* Submit button */}
        <button
          type="submit"
          disabled={loading}
          className="block text-center w-full p-3 rounded-md my-4 bg-slate-700 focus:bg-slate-500 hover:bg-slate-400 text-white disabled:hover:bg-slate-600 disabled:bg-slate-600"
        >
          {loading ? "..." : "Chercher"}
        </button>
      </form>
    </div>
  );
};

export default TravelPage;
