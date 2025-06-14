// src/server/trpc.ts
import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import type { Context } from "./context"; // Impor Context Anda

/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const router = t.router;
export const publicProcedure = t.procedure;

// Prosedur yang memerlukan autentikasi (user sudah login dan token valid)
export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  // Memastikan ada user di konteks (dari hasil verifikasi JWT)
  if (!ctx.user || !ctx.dbUser) {
    // Cek juga dbUser agar data lengkap tersedia
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Not authenticated" });
  }

  return next({
    ctx: {
      ...ctx, // Melewatkan seluruh konteks
      user: ctx.user, // Memastikan tipe user non-null
      dbUser: ctx.dbUser, // Memastikan tipe dbUser non-null
    },
  });
});

// Contoh: Prosedur admin (memerlukan user login DAN role ADMIN)
export const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.dbUser.role !== "ADMIN") {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "Access denied. Admin role required.",
    });
  }
  return next({ ctx });
});
