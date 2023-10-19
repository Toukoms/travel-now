"use client";
import Link from "next/link";
import { useEffect } from "react";

const AdminErrorBoundary = ({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) => {
  useEffect(() => {
    console.error(error.message);
  }, [error]);

  return (
    <div className="flex justify-center items-center text-center">
      <div className="p-2">
        <h2 className="text-2xl">Something went wrong</h2>
        <p>{error.message}</p>
        <div className="flex gap-1">
          <button
            className="w-fit h-fit flex justify-center items-center gap-2 p-3 font-semibold rounded-lg shadow-md shadow-slate-400 hover:shadow-lg hover:shadow-slate-400 bg-yellow-600 hover:bg-yellow-500 active:bg-yellow-400 text-white"
            onClick={() => reset()}
          >
            Try again
          </button>
          <Link
            className="w-fit h-fit flex justify-center items-center gap-2 p-3 font-semibold rounded-lg shadow-md shadow-slate-400 hover:shadow-lg hover:shadow-slate-400 bg-green-600 hover:bg-green-500 active:bg-green-400 text-white"
            href="/"
          >
            Back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminErrorBoundary;
