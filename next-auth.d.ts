import type { User } from "next-auth";
import "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    isAdmin: boolean;
  }
}

declare module "next-auth" {
  interface Session {
    user: User & {
      id: string;
      isAdmin: boolean;
    };
  }
}
