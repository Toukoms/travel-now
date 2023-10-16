"use client";
import { REGISTER_ROUTE } from "@/routes/api.routes";
import { isSignUpValid } from "@/utils/validator";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type UserProps = {
  name: string;
  firstName: string;
  cin: string;
  email: string;
  password: string;
};

const AuthPage = () => {
  const [authType, setAuthType] = useState<"sign-in" | "sign-up">("sign-in");
  const [user, setUser] = useState<UserProps>({
    name: "",
    firstName: "",
    cin: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    console.log(session);
    if (session.status !== "loading") {
      if (session.status === "authenticated" && session.data) {
        router.push("/travel");
      }
    }

    return () => {
      session.status === "authenticated";
    };
  }, [session, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    if (authType === "sign-up") {
      const validation = isSignUpValid(
        user.email,
        user.password,
        user.name,
        user.firstName,
        user.cin
      )!;
      setError(validation);
      if (!validation && validation.length === 0) {
        try {
          const res = await fetch(REGISTER_ROUTE, {
            method: "POST",
            body: JSON.stringify(user),
            cache: "no-cache",
          });
          if (!(res.ok && res.status === 201)) {
            throw new Error((await res.json()).message);
          }
        } catch (error: any) {
          console.error(error);
        }
      }
    } else {
      try {
        const data = { email: user.email, password: user.password };
        const res = await signIn("credentials", {
          ...data,
          redirect: false,
        });
        if (res?.ok && !res?.error && res.status === 200) {
          router.refresh();
        } else {
          setError(res?.error!);
        }
      } catch (error: any) {
        console.error(error);
      }
    }
    setLoading(false);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="w-80 bg-slate-200 rounded-lg px-8 pt-8 pb-4 border border-slate-400/75 shadow-md mx-auto text-slate-700"
      >
        <h1 className="bold text-xl mb-6">
          {authType === "sign-in" ? "Sign In" : "Sign Up"}
        </h1>

        {/* All inputs */}
        {authType === "sign-up" && (
          <>
            <label htmlFor="name" className="flex flex-col mb-2">
              Nom :
              <input
                type="text"
                value={user?.name}
                onChange={(event) =>
                  setUser({ ...user, name: event.target.value } as UserProps)
                }
                name="name"
                id="name"
                className="bg-gray-200 border border-slate-700 px-2 pt-2 pb-1 rounded-sm focus:outline-none"
                placeholder="NOM"
              />
            </label>
            <label htmlFor="first-name" className="flex flex-col mb-2">
              Prénom :
              <input
                type="text"
                value={user?.firstName}
                onChange={(event) =>
                  setUser({
                    ...user,
                    firstName: event.target.value,
                  } as UserProps)
                }
                name="first-name"
                id="first-name"
                className="bg-gray-200 border border-slate-700 px-2 pt-2 pb-1 rounded-sm focus:outline-none"
                placeholder="Prénom"
              />
            </label>
            <label htmlFor="cin" className="flex flex-col mb-2">
              CIN :
              <input
                required
                type="text"
                value={user?.cin}
                onChange={(event) =>
                  setUser({
                    ...user,
                    cin: event.target.value,
                  } as UserProps)
                }
                name="cin"
                id="cin"
                className="bg-gray-200 border border-slate-700 px-2 pt-2 pb-1 rounded-sm focus:outline-none"
                placeholder="Carte d'Identité Nationale"
              />
            </label>
          </>
        )}
        <label htmlFor="email" className="flex flex-col mb-2">
          Email :
          <input
            required
            type="email"
            value={user?.email}
            onChange={(event) =>
              setUser({ ...user, email: event.target.value } as UserProps)
            }
            name="email"
            id="email"
            className="bg-gray-200 border border-slate-700 px-2 pt-2 pb-1 rounded-sm focus:outline-none"
            placeholder="user@gmail.com"
          />
        </label>
        <label htmlFor="password" className="flex flex-col mb-2">
          Mot de passe :
          <input
            required
            type="password"
            value={user?.password}
            onChange={(event) =>
              setUser({ ...user, password: event.target.value } as UserProps)
            }
            name="password"
            id="password"
            className="bg-gray-200 border border-slate-700 px-2 pt-2 pb-1 rounded-sm focus:outline-none"
            placeholder="password"
          />
        </label>

        {/* Error message */}
        {error && (
          <p className="text-red-400 leading-none text-sm mt-4">* {error}</p>
        )}

        {/* Submit button */}
        <button
          disabled={loading}
          type="submit"
          className="w-full p-3 rounded-md my-4 bg-slate-700 focus:bg-slate-600 hover:bg-slate-500 text-white"
        >
          {loading ? "..." : authType === "sign-in" ? "Sign In" : "Sign Up"}
        </button>

        {/* Switch between sign-in or sign-up */}
        {authType === "sign-in" ? (
          <p>
            It&apos;s your first?
            <span
              className="cursor-pointer font-semibold text-blue-500"
              onClick={() => {
                setAuthType("sign-up");
                setError("");
              }}
            >
              {" "}
              Create an account.
            </span>
          </p>
        ) : (
          <p>
            Already have an account?
            <span
              className="font-semibold text-blue-500 cursor-pointer"
              onClick={() => {
                setAuthType("sign-in");
                setError("");
              }}
            >
              {" "}
              Sign in.
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default AuthPage;
