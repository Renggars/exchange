// src/server/context.ts
import { prisma } from "../lib/prisma";
import { verify } from "jsonwebtoken";
import { JWT_PAYLOAD_SCHEMA, AuthTokenPayload } from "./auth.utils";

// Definisikan tipe DbUser dari hasil seleksi Prisma Anda
// Pastikan ini mencakup semua field yang Anda akses di router user.ts
export type DbUser = {
  // <--- PASTIKAN ADA 'export'
  id: string;
  email: string;
  username: string;
  role: "USER" | "ADMIN"; // Atau tipe enum yang sesuai
  phone: string | null; // Sesuaikan dengan schema Prisma Anda
  address: string | null; // Sesuaikan dengan schema Prisma Anda
  createdAt: Date; // Sesuaikan dengan schema Prisma Anda
  // Tambahkan properti lain yang mungkin Anda select dari prisma.user
};

interface CreateContextOptions {
  req: Request;
}

export const createContext = async (opts: CreateContextOptions) => {
  let user: AuthTokenPayload | null = null;
  let dbUser: DbUser | null = null;

  try {
    const authHeader = opts.req.headers.get("Authorization");
    const token = authHeader?.split("Bearer ")[1];

    if (token && process.env.JWT_SECRET) {
      const decoded = verify(token, process.env.JWT_SECRET) as AuthTokenPayload;
      const parsedPayload = JWT_PAYLOAD_SCHEMA.safeParse(decoded);

      if (parsedPayload.success) {
        user = parsedPayload.data;

        const fetchedUser = await prisma.user.findUnique({
          where: { id: user.userId },
          select: {
            id: true,
            email: true,
            username: true,
            role: true,
            phone: true,
            address: true,
            createdAt: true,
          },
        });

        if (fetchedUser) {
          dbUser = fetchedUser as DbUser; // <--- Penting: Lakukan casting di sini juga
        } else {
          user = null;
          dbUser = null;
        }
      } else {
        console.warn("Invalid JWT payload:", parsedPayload.error.flatten());
      }
    }
  } catch (err) {
    console.error(
      "Error creating tRPC context (JWT verification failed):",
      (err as Error).message
    );
    user = null;
    dbUser = null;
  }

  return {
    prisma,
    user,
    dbUser,
  };
};

export type Context = Awaited<ReturnType<typeof createContext>>;
