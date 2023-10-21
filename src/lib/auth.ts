import { AuthOptions } from "next-auth";
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
          user = await prismaClient.user.findUnique({
            where: {
              email: credentials.email,
            },
          });
        } catch (error) {
          console.error(error);
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
    error: "/auth",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
        session.user.isAdmin = token.isAdmin;
      }

      return session;
    },
    async jwt({ token, user }) {
      const dbUser = await prismaClient.user.findUniqueOrThrow({
        where: {
          email: token.email!,
        },
      });

      if (!dbUser) {
        token.id = user.id;
        return token;
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
        isAdmin: dbUser.isAdmin,
      };
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
