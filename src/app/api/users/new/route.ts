import { hash } from "bcrypt";
import { NextResponse } from "next/server";
import prismaClient from "@/lib/prismadb";
import errorResponse from "@/constants/errorResponse";
import { User } from "@prisma/client";

export async function POST(request: Request) {
  const res = NextResponse;
  try {
    const { name, firstName, cin, telNumber, email, password } =
      await request.json();

    await prismaClient.$connect();
    const userAlreadyExist = await prismaClient.user.findUnique({
      where: {
        email: email,
      },
    });

    if (userAlreadyExist) {
      return res.json(errorResponse.ERR_USER_ALREADY_EXISTS.error, {
        status: errorResponse.ERR_USER_ALREADY_EXISTS.status,
      });
    }

    const userSameCIN = await prismaClient.user.findUnique({
      where: {
        cin: cin,
      },
    });

    if (userSameCIN) {
      return res.json(
        {
          code: "ERR_USER_ALREADY_EXISTS",
          message: "User with this CIN already exist.",
        },
        {
          status: errorResponse.ERR_USER_ALREADY_EXISTS.status,
        }
      );
    }

    const hashedPassword = await hash(password, 12);

    const user = await prismaClient.user.create({
      data: {
        name,
        firstName,
        cin,
        telNumber,
        email,
        hashedPassword,
        image: "",
        emailVerified: new Date(),
      },
    });

    delete (user as Partial<Pick<User, "hashedPassword">>).hashedPassword;
    const userWithoutPassword = user as Omit<User, "hashedPassword">;

    return res.json(userWithoutPassword, { status: 201 });
  } catch (error) {
    console.error(error);
    return res.json(errorResponse.ERR_INTERNAL_SERVER_ERROR.error, {
      status: errorResponse.ERR_INTERNAL_SERVER_ERROR.status,
    });
  } finally {
    await prismaClient.$disconnect();
  }
}
