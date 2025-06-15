// src/server/routers/auth.ts
import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { hash, compare } from "bcrypt-ts";
import { AuthTokenPayload, JWT_PAYLOAD_SCHEMA } from "../auth.utils";

import dotenv from "dotenv";
import { generateAuthTokens } from "../service/token.service";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "SECRET";

if (
  JWT_SECRET ===
    "SUPER_SECRET_KEY_YANG_SANGAT_KUAT_UNTUK_DEV_JANGAN_DIGUNAKAN_DI_PRODUKSI" &&
  process.env.NODE_ENV === "production"
) {
  console.warn(
    "WARNING: JWT_SECRET is using default development key in PRODUCTION environment. Please set JWT_SECRET environment variable."
  );
}

export const authRouter = router({
  register: publicProcedure
    .input(
      z.object({
        email: z.string().email("Format email tidak valid."),
        username: z.string().min(3, "Nama pengguna minimal 3 karakter."),
        password: z
          .string()
          .min(8, "Kata sandi minimal 8 karakter.")
          .regex(
            /[A-Z]/,
            "Kata sandi harus mengandung setidaknya satu huruf kapital."
          )
          .regex(
            /[a-z]/,
            "Kata sandi harus mengandung setidaknya satu huruf kecil."
          )
          .regex(/[0-9]/, "Kata sandi harus mengandung setidaknya satu angka.")
          .regex(
            /[^a-zA-Z0-9]/,
            "Kata sandi harus mengandung setidaknya satu karakter khusus."
          ),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { prisma } = ctx;
      const { email, username, password } = input;

      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Email sudah terdaftar.",
        });
      }

      const hashedPassword = await hash(password, 10);

      try {
        const newUser = await prisma.user.create({
          data: {
            email,
            username,
            password: hashedPassword,
            role: "USER",
          },
          select: {
            id: true,
            email: true,
            username: true,
            role: true,
            createdAt: true,
          },
        });

        await prisma.portfolio.create({
          data: {
            userId: newUser.id,
            name: "Main Portfolio",
            balance: 0,
          },
        });

        return {
          message: "Registrasi berhasil! Silakan login.",
          user: {
            id: newUser.id,
            email: newUser.email,
            username: newUser.username,
            role: newUser.role,
          },
        };
      } catch (error) {
        console.error("Error during user registration:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message:
            "Gagal mendaftar pengguna. Silakan coba lagi. (Cek log server untuk detail)",
        });
      }
    }),

  login: publicProcedure
    .input(
      z.object({
        email: z.string().email("Format email tidak valid."),
        password: z.string().min(1, "Kata sandi tidak boleh kosong."),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { prisma } = ctx;
      const { email, password } = input;

      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Email atau kata sandi salah.",
        });
      }

      const passwordMatch = await compare(password, user.password);

      if (!passwordMatch) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Email atau kata sandi salah.",
        });
      }

      const tokenPayload: AuthTokenPayload = {
        userId: user.id,
        userEmail: user.email,
        userRole: user.role,
      };

      const parsedPayload = JWT_PAYLOAD_SCHEMA.safeParse(tokenPayload);
      if (!parsedPayload.success) {
        console.error(
          "Invalid JWT payload structure:",
          parsedPayload.error.flatten()
        );
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Gagal membuat sesi login.",
        });
      }

      const tokens = generateAuthTokens({ id: user.id });

      return {
        message: "Login berhasil!",
        tokens,
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          role: user.role,
        },
      };
    }),
});
