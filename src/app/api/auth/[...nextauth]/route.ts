import NextAuth, { AuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import prismaClient from "@/lib/prismadb";
import { compare } from "bcrypt";
import { User } from "@prisma/client";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prismaClient),
  providers: [
    Credentials({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email ou mot de passe sont requis.");
        }

        let user;

        try {
          prismaClient.$connect();
          user = await prismaClient.user.findUniqueOrThrow({
            where: {
              email: credentials.email,
            },
          });
        } catch (error) {
          throw new Error("Erreur de serveur!");
        } finally {
          prismaClient.$disconnect();
        }

        if (!user || !user.hashedPassword) {
          throw new Error("Email ou mot de passe non valide.");
        }

        const isPasswordCorrect = await compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isPasswordCorrect) {
          throw new Error("Email ou mot de passe non valide.");
        }

        if (!user) {
          throw new Error("Erreur de serveur!");
        }

        delete (user as Partial<Pick<User, "hashedPassword">>).hashedPassword;
        const userWithoutPassword = user as Omit<User, "hashedPassword">;
        return userWithoutPassword;
      },
    }),
  ],
  debug: process.env.NODE_ENV === "development",
  pages: {
    signIn: "/auth",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
