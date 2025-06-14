// src/server/routers/auth.ts

import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { TRPCError } from "@trpc/server";
import { hash, compare } from "bcrypt-ts"; // Perlu bcrypt-ts lagi!
import { sign } from "jsonwebtoken"; // Import jsonwebtoken

export const authRouter = router({
  register: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(8),
        username: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { prisma } = ctx; // Dapatkan prisma dari ctx

      const { email, password, username } = input;

      const existingUser = await prisma.user.findUnique({ where: { email } });

      if (existingUser) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Email already in use",
        });
      }

      const hashedPassword = await hash(password, 10);

      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          username,
          role: "USER", // Default role
        },
      });

      // Anda bisa langsung membuat token saat register atau arahkan ke login
      // Untuk kesederhanaan, kita akan arahkan ke login setelah register.
      // Jika Anda ingin langsung login setelah register, panggil sign di sini.

      return {
        id: user.id,
        email: user.email,
        username: user.username,
        message: "Registration successful. Please log in.",
      };
    }),

  login: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(8),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { prisma } = ctx; // Dapatkan prisma dari ctx

      const { email, password } = input;

      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Invalid credentials",
        });
      }

      const isValid = await compare(password, user.password);
      if (!isValid) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid credentials",
        });
      }

      // Buat JWT
      if (!process.env.JWT_SECRET) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "JWT_SECRET is not defined.",
        });
      }

      const token = sign(
        {
          userId: user.id,
          email: user.email,
          username: user.username,
          role: user.role, // Tambahkan role ke payload
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );

      return {
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          role: user.role,
        },
        token, // Kirim JWT ke klien
        message: "Login successful!",
      };
    }),
});
