import { PrismaClient } from '@prisma/client'

const prismaClient = global.prismadb || new PrismaClient();

if (process.env.NODE_ENV !== 'production') global.prismadb = prismaClient;

export default prismaClient