"use client";
import Link from "next/link";
import { useEffect } from "react";

const ErrorBoundary = ({
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
    <main className="flex justify-center items-center">
      <div>
        <h2>Something went wrong</h2>
        <p>{error.message}</p>
        <div>
          <button onClick={() => reset()}>Try again</button>
          <Link href="/">Go back home</Link>
        </div>
      </div>
    </main>
  );
};

export default ErrorBoundary;
