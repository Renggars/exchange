// src/utils/api.ts
import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "@/server/index"; // Sesuaikan path ini jika appRouter Anda di lokasi lain

export const api = createTRPCReact<AppRouter>();
