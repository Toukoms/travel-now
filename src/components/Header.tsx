"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect } from "react";

const Header = () => {
  const session = useSession();

  return (
    <header className="z-50 flex bg-gray-700 shadow-lg text-white mb-6 w-screen p-4 px-8 shadow-dark-800 justify-between items-center h-16 sticky top-0 left-0">
      <Link href="/" className="leading-tight text-3xl font-bold">
        <span className="text-green-400">Travel</span>
        <span className="text-red-400">Now</span>
      </Link>
      <div>
        {session.status === "loading" ? (
          <div className="bg-gray-500 rounded-md w-12 h-8" />
        ) : session.status === "unauthenticated" ? (
          <Link href="/auth" className="border p-2 rounded-md leading-6">
            Connexion
          </Link>
        ) : (
          <button
            type="button"
            onClick={() => signOut()}
            className="border p-2 rounded-md leading-6"
          >
            Déconnecter
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
