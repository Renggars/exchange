// src/server/context.ts
import { prisma } from "../lib/prisma";
import { verify } from "jsonwebtoken";
import { JWT_PAYLOAD_SCHEMA, AuthTokenPayload } from "./auth.utils";

interface CreateContextOptions {
  req: Request; // <--- Ubah tipe di sini dari NextRequest menjadi Request
}

export const createContext = async (opts: CreateContextOptions) => {
  let user: AuthTokenPayload | null = null;
  let dbUser: unknown = null;

  try {
    const authHeader = opts.req.headers.get("Authorization"); // Ini tetap sama
    const token = authHeader?.split("Bearer ")[1];

    if (token && process.env.JWT_SECRET) {
      const decoded = verify(token, process.env.JWT_SECRET) as AuthTokenPayload;
      const parsedPayload = JWT_PAYLOAD_SCHEMA.safeParse(decoded);

      if (parsedPayload.success) {
        user = parsedPayload.data;

        dbUser = await prisma.user.findUnique({
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

        if (!dbUser) {
          user = null;
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
  }

  return {
    prisma,
    user,
    dbUser,
  };
};

export type Context = Awaited<ReturnType<typeof createContext>>;
