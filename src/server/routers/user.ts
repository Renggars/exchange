// src/server/routers/user.ts

import { z } from "zod";
import {
  router,
  publicProcedure,
  protectedProcedure,
  adminProcedure,
} from "../trpc"; // Impor protectedProcedure dan adminProcedure
import { TRPCError } from "@trpc/server";
import { hash } from "bcrypt-ts";

export const userRouter = router({
  // addUser diubah namanya menjadi createUser, karena ini untuk admin
  // Jika ini untuk registrasi, lebih baik ditangani oleh auth.ts
  createUser: adminProcedure // Hanya admin yang bisa menambahkan user lain
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(8),
        username: z.string(),
        role: z.enum(["USER", "ADMIN"]).optional().default("USER"),
        phone: z.string().optional(),
        address: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { prisma } = ctx; // Dapatkan prisma dari ctx

      const {
        email,
        password,
        username,
        role = "USER",
        phone,
        address,
      } = input;

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
          phone,
          address,
          role,
        },
      });

      return {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      };
    }),

  // getUsers: Tetap publik atau protected sesuai kebutuhan. Contoh ini tetap publik.
  getUsers: publicProcedure
    .input(
      z.object({
        search: z.string().optional(),
        page: z.number().default(1),
        totalItems: z.number().default(10),
      })
    )
    .query(async ({ input, ctx }) => {
      const { prisma } = ctx; // Dapatkan prisma dari ctx

      const { search = "", page, totalItems } = input;
      const trimmedSearch = search.trim();

      let where: any = {};

      if (trimmedSearch !== "") {
        where = {
          OR: [
            { username: { contains: trimmedSearch, mode: "insensitive" } },
            { email: { contains: trimmedSearch, mode: "insensitive" } },
          ],
        };
      }

      const items = await prisma.user.findMany({
        where,
        skip: (page - 1) * totalItems,
        take: totalItems,
        select: {
          id: true,
          email: true,
          role: true,
          username: true,
          createdAt: true,
        },
      });

      const totalCount = await prisma.user.count({
        where,
      });

      return {
        items,
        totalItems: totalCount,
        totalPages: Math.ceil(totalCount / totalItems),
      };
    }),

  // Mendapatkan profil user yang sedang login
  getLoggedInUserProfile: protectedProcedure.query(async ({ ctx }) => {
    const { dbUser } = ctx; // Dapatkan dbUser dari ctx (ini sudah non-null karena protectedProcedure)

    // dbUser sudah dijamin ada dan diambil dari database oleh context
    return {
      id: dbUser.id,
      email: dbUser.email,
      username: dbUser.username,
      role: dbUser.role,
      phone: dbUser.phone,
      address: dbUser.address,
      createdAt: dbUser.createdAt,
    };
  }),

  // Memperbarui profil user yang sedang login
  updateMyProfile: protectedProcedure // User mengupdate profilnya sendiri
    .input(
      z.object({
        username: z.string().optional(),
        phone: z.string().optional(),
        address: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { prisma, dbUser } = ctx; // Dapatkan prisma dan dbUser dari ctx

      const updatedUser = await prisma.user.update({
        where: { id: dbUser.id }, // Update user yang sedang login
        data: {
          username: input.username,
          phone: input.phone,
          address: input.address,
        },
      });

      return {
        id: updatedUser.id,
        username: updatedUser.username,
        email: updatedUser.email,
        role: updatedUser.role,
        createdAt: updatedUser.createdAt,
      };
    }),

  // Hanya admin yang bisa memperbarui user lain
  updateUserByAdmin: adminProcedure // Hanya admin yang bisa memanggil ini
    .input(
      z.object({
        id: z.string(), // ID user yang akan diupdate
        email: z.string().email().optional(),
        username: z.string().optional(),
        role: z.enum(["USER", "ADMIN"]).optional(),
        phone: z.string().optional(),
        address: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { prisma } = ctx; // Dapatkan prisma dari ctx

      const { id, email, username, role, phone, address } = input;

      const updatedUser = await prisma.user.update({
        where: { id },
        data: {
          email,
          username,
          role,
          phone,
          address,
        },
      });

      return {
        id: updatedUser.id,
        username: updatedUser.username,
        email: updatedUser.email,
        role: updatedUser.role,
        createdAt: updatedUser.createdAt,
      };
    }),

  // Hanya admin yang bisa menghapus user
  deleteUser: adminProcedure // Hanya admin yang bisa memanggil ini
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { prisma } = ctx; // Dapatkan prisma dari ctx

      const { id } = input;

      const existingUser = await prisma.user.findUnique({
        where: { id },
      });

      if (!existingUser) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }

      await prisma.user.delete({
        where: { id },
      });

      return {
        message: "User successfully deleted",
        id,
      };
    }),
});
