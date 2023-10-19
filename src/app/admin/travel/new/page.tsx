"use client";
import Dropdown from "@/components/Dropdown";
import { NEW_TRAVEL_ROUTE } from "@/routes/api.routes";
import { getDateString } from "@/utils/dateFormater";
import { Travel } from "@prisma/client";
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

const NewTravelPage = () => {
  const [departProvinces, setDepartProvinces] =
    useState<string[]>(sortedProvinces);
  const [arrivalProvinces, setArrivalProvinces] =
    useState<string[]>(sortedProvinces);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const [travel, setTravel] = useState<Travel>({
    departure: "",
    arrival: "",
    departureDate: "",
    departureTime: "",
    cooperative: "",
    price: 0,
    maxPlace: 0,
  } as Travel);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    if (
      !travel.departure &&
      !travel.arrival &&
      !travel.cooperative &&
      !travel.departureDate &&
      !travel.departureTime &&
      !travel.maxPlace &&
      !travel.price
    ) {
      setError(
        "Veuillez remplir correctement tous les champs s'il vous palît."
      );
    } else {
      try {
        const res = await fetch(NEW_TRAVEL_ROUTE, {
          method: "POST",
          body: JSON.stringify(travel),
          cache: "no-cache",
        });
        if (res.ok && res.status === 201) {
          router.push("/admin/dashboard");
        } else {
          setError((await res.json()).message || "Erreur de serveur");
          throw new Error("Failed to create Travel row");
        }
      } catch (error: any) {
        console.error(error);
      }
    }
    setLoading(false);
    if (!error) {
      setSuccess(true);
    } else {
      setSuccess(false);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="w-96 bg-slate-200 rounded-lg px-8 pt-8 pb-4 border border-slate-400/75 shadow-md mx-auto text-slate-700"
      >
        <h1 className="bold text-xl mb-6">Configuration d&apos;un voyage</h1>

        <label htmlFor="cooperative" className="flex flex-col mb-2 leading-8">
          Coopérative :
          <input
            type="text"
            required
            value={travel.cooperative}
            onChange={(event) =>
              setTravel({
                ...travel,
                cooperative: event.target.value,
              } as Travel)
            }
            name="cooperative"
            id="cooperative"
            className="bg-gray-200 border border-slate-700 px-2 pt-2 pb-1 rounded-sm focus:outline-none"
            placeholder="Coopérative"
          />
        </label>

        {/* All inputs */}
        <Dropdown
          options={departProvinces}
          value={travel.departure!}
          onChange={(value) => {
            setTravel({ ...travel, departure: value } as Travel);
            setArrivalProvinces(
              sortedProvinces.filter((province) => province !== value)
            );
          }}
          placeholder="Depart"
          className="mb-2"
        ></Dropdown>

        <Dropdown
          options={arrivalProvinces}
          value={travel.arrival!}
          onChange={(value) => {
            setTravel({ ...travel, arrival: value } as Travel);
            setDepartProvinces(
              sortedProvinces.filter((province) => province !== value)
            );
          }}
          placeholder="Arrivé"
          className="mb-1"
        ></Dropdown>

        <label htmlFor="price" className="flex flex-col mb-2 leading-8">
          Frais de transport :
          <input
            type="tel"
            required
            min={1}
            value={travel.price || ""}
            onChange={(event) =>
              setTravel({
                ...travel,
                price: parseInt(event.target.value) || 0,
              } as Travel)
            }
            name="price"
            id="price"
            className="bg-gray-200 border border-slate-700 px-2 pt-2 pb-1 rounded-sm focus:outline-none"
            placeholder="Prix de voyage en Ariary"
          />
        </label>

        <label htmlFor="max-place" className="flex flex-col mb-2 leading-8">
          Maximum de place :
          <input
            type="tel"
            required
            min={1}
            value={travel.maxPlace || ""}
            onChange={(event) =>
              setTravel({
                ...travel,
                maxPlace: parseInt(event.target.value) || 0,
              } as Travel)
            }
            name="max-place"
            id="max-place"
            className="bg-gray-200 border border-slate-700 px-2 pt-2 pb-1 rounded-sm focus:outline-none"
            placeholder="Maximum de place"
          />
        </label>

        <label htmlFor="depart-date" className="flex flex-col mb-2 leading-8">
          Date de départ :
          <input
            type="date"
            min={getDateString(new Date(Date.now()))}
            value={travel.departureDate}
            onChange={(event) =>
              setTravel({
                ...travel,
                departureDate: event.target.value,
              } as Travel)
            }
            name="depart-date"
            id="depart-date"
            className="bg-gray-200 border border-slate-700 px-2 pt-2 pb-1 rounded-md focus:outline-none leading-normal"
          />
        </label>
        <label htmlFor="depart-time" className="flex flex-col mb-6 leading-8">
          Heure de départ :
          <input
            type="time"
            value={travel.departureTime}
            onChange={(event) =>
              setTravel({
                ...travel,
                departureTime: event.target.value,
              } as Travel)
            }
            name="depart-time"
            id="depart-time"
            className="bg-gray-200 border border-slate-700 px-2 pt-2 pb-1 rounded-md focus:outline-none leading-normal"
          />
        </label>

        {/* Error & Success message */}
        {error ? (
          <p className="text-red-400 leading-none text-sm mt-4">* {error}</p>
        ) : (
          success && (
            <p className="text-green-400 leading-none text-sm mt-4">
              Votre formulaire a bien été envoyé.
            </p>
          )
        )}

        {/* Submit button */}
        <button
          type="submit"
          disabled={loading}
          className="block text-center w-full p-3 rounded-md my-4 bg-slate-700 focus:bg-slate-500 hover:bg-slate-400 text-white disabled:hover:bg-slate-600 disabled:bg-slate-600"
        >
          {loading ? "..." : "Créer"}
        </button>
      </form>
    </div>
  );
};

export default NewTravelPage;
