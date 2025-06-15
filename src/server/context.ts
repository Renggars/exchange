// src/server/context.ts
import { prisma } from "../lib/prisma"; // Pastikan path ke Prisma Client benar
import { verify } from "jsonwebtoken";
import { JWT_PAYLOAD_SCHEMA, AuthTokenPayload } from "./auth.utils";

// Definisikan tipe DbUser dari hasil seleksi Prisma Anda
// Ini harus mencerminkan field yang diambil saat otentikasi atau dari database
export type DbUser = {
  id: string;
  email: string;
  username: string;
  role: "USER" | "ADMIN";
  phone: string | null;
  address: string | null;
  createdAt: Date;
};

interface CreateContextOptions {
  req: Request; // Menggunakan Request dari Next.js untuk headers
}

export const createContext = async (opts: CreateContextOptions) => {
  let user: AuthTokenPayload | null = null;
  let dbUser: DbUser | null = null;

  try {
    const authHeader = opts.req.headers.get("Authorization");
    const token = authHeader?.split("Bearer ")[1];

    if (token && process.env.JWT_SECRET) {
      const decoded = verify(token, process.env.JWT_SECRET) as AuthTokenPayload;

      // Validasi payload dengan skema Zod
      const parsedPayload = JWT_PAYLOAD_SCHEMA.safeParse(decoded);

      if (parsedPayload.success) {
        user = parsedPayload.data;

        // Ambil data user lengkap dari database jika token valid
        // Pastikan select sesuai dengan DbUser type
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
            // Jika ada field lain di DbUser, tambahkan di sini juga
          },
        });

        if (fetchedUser) {
          dbUser = fetchedUser as DbUser; // Casting untuk memastikan tipe
        } else {
          // Jika user tidak ditemukan di DB meskipun token valid (misal user dihapus)
          user = null;
          dbUser = null;
        }
      } else {
        console.warn(
          "Invalid JWT payload structure (context):",
          parsedPayload.error.flatten()
        );
        user = null; // Set null jika payload tidak valid
        dbUser = null;
      }
    }
  } catch (err) {
    console.error(
      "Error in createContext (JWT verification failed or other error):",
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
