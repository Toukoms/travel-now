"use client";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = useSession();

  useEffect(() => {
    if (session.status !== "loading") {
      if (session.status === "authenticated" && session.data) {
        if (!session.data.user.isAdmin) {
          throw new Error("User not autorized");
        }
      }
    }

    return () => {
      session.data?.user.isAdmin;
    };
  }, [session]);

  return <>{children}</>;
}
