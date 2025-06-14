import { z } from "zod";

// Skema untuk validasi payload JWT
export const JWT_PAYLOAD_SCHEMA = z.object({
  userId: z.string(),
  email: z.string().email(),
  username: z.string(),
  role: z.string(),
  iat: z.number(),
  exp: z.number(),
});

export type AuthTokenPayload = z.infer<typeof JWT_PAYLOAD_SCHEMA>;
