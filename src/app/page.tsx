"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const HomePage = () => {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status !== "loading") {
      if (session.status === "authenticated" && session.data) {
        if (session.data.user.isAdmin) {
          router.push("/admin/dashboard");
        } else {
          router.push("/travel");
        }
      }
    }

    return () => {
      session.status === "authenticated";
    };
  }, [session, router]);

  return (
    <div id="home">
      <div className="relative top-0 left-0 h-full p-4 pt-32 sm:p-8 sm:pt-28">
        <Image
          src="/bg-home.jpg"
          alt=""
          fill
          sizes=""
          className="-z-10 blur-sm brightness-95 object-cover object-center"
        />
        <div className="bg-slate-300/80 shadow-md shadow-black/30 p-8 sm:p-12 rounded-md backdrop-blur-md w-full sm:w-5/6 mx-auto">
          <h1 className="text-4xl font-semibold text-black mb-4">
            Bienvenu sur <b className="text-gray-700">TravelNow</b>
          </h1>
          <p className="text-justify text-black text-lg">
            <b className="text-xl">TravelNow</b> est une application web
            innovante conçue pour simplifier la gestion de réservations de
            voyageurs dans le domaine du transport routier. Elle offre une
            interface utilisateur intuitive qui permet aux utilisateurs de
            réserver facilement leurs voyages en quelques clics.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
