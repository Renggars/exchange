// src/server/auth.utils.ts
import { z } from "zod";

export const JWT_PAYLOAD_SCHEMA = z.object({
  userId: z.string(),
  userEmail: z.string().email(),
  userRole: z.enum(["USER", "ADMIN"]), // Sesuaikan dengan role di schema Prisma Anda
});

export type AuthTokenPayload = z.infer<typeof JWT_PAYLOAD_SCHEMA>;
