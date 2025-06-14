// src/server/trpc.ts
import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
// Pastikan Anda mengimpor 'Context' dari './context'
import type { Context } from "./context";
// Jika Anda mendefinisikan DbUser di context.ts, impor juga di sini
import type { DbUser } from "./context";

const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

export const router = t.router;
export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  // Memastikan bahwa ctx.user dan ctx.dbUser ada dan bukan null
  if (!ctx.user || !ctx.dbUser) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Not authenticated" });
  }

  // Penting: Di sini kita memberitahu TypeScript bahwa ctx.dbUser pasti adalah tipe DbUser
  // Ini akan menyelesaikan error 'Property 'id' does not exist on type '{}'.'
  return next({
    ctx: {
      ...ctx,
      user: ctx.user,
      dbUser: ctx.dbUser as DbUser, // <--- PASTIKAN 'as DbUser' ADA DI SINI
    },
  });
});

export const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  // Karena protectedProcedure sudah memastikan dbUser ada, kita bisa langsung akses 'role'
  if (ctx.dbUser.role !== "ADMIN") {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "Access denied. Admin role required.",
    });
  }
  return next({ ctx });
});
