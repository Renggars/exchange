// src/app/auth/register/page.tsx
"use client";

import React, { useState } from "react";
import { api } from "@/utils/api";
import { useRouter } from "next/navigation";
import AuthFormWrapper from "@/components/auth/AuthFormWrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";

const registerSchema = z
  .object({
    username: z.string().min(3, "Nama pengguna minimal 3 karakter."),
    email: z.string().email("Format email tidak valid."),
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
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Konfirmasi kata sandi tidak cocok.",
    path: ["confirmPassword"],
  });

type RegisterFormInputs = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError, // <-- setError sudah dideklarasikan di sini
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
  });

  const registerMutation = api.auth.register.useMutation({
    onSuccess: (data) => {
      alert(data.message);
      router.push("/auth/login");
    },
    onError: (err) => {
      setSubmitError(null); // Reset submit error
      // Cek apakah error dari server bisa dipetakan ke field tertentu
      if (err.message.includes("Email sudah terdaftar")) {
        // Pesan error spesifik dari backend
        setError("email", {
          type: "server",
          message: "Email ini sudah terdaftar.",
        });
      } else {
        // Untuk error lain yang tidak spesifik ke field
        setSubmitError(err.message || "Terjadi kesalahan saat registrasi.");
      }
    },
  });

  const onSubmit = async (data: RegisterFormInputs) => {
    setSubmitError(null); // Reset error sebelum submit baru
    registerMutation.mutate({
      email: data.email,
      username: data.username,
      password: data.password,
    });
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white flex flex-col">
      <div className="flex-grow flex items-center justify-center">
        <AuthFormWrapper
          title="Daftar akun baru"
          footerText="Sudah punya akun?"
          footerLinkHref="/auth/login"
          footerLinkText="Masuk"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-300"
              >
                Nama Pengguna
              </label>
              <input
                type="text"
                id="username"
                {...register("username")}
                className={`mt-1 block w-full rounded-md border-gray-700 bg-gray-700 py-2 px-3 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500 ${
                  errors.username ? "border-red-500" : ""
                }`}
                placeholder="Masukkan nama pengguna Anda"
              />
              {errors.username && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                {...register("email")}
                className={`mt-1 block w-full rounded-md border-gray-700 bg-gray-700 py-2 px-3 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500 ${
                  errors.email ? "border-red-500" : ""
                }`}
                placeholder="email@gmail.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300"
              >
                Kata Sandi
              </label>
              <div className="relative mt-1">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  {...register("password")}
                  className={`block w-full rounded-md border-gray-700 bg-gray-700 py-2 px-3 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500 pr-10 ${
                    errors.password ? "border-red-500" : ""
                  }`}
                  placeholder="Masukkan kata sandi Anda"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-400 hover:text-white focus:outline-none"
                >
                  {showPassword ? "Sembunyikan" : "Tampilkan"}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-300"
              >
                Konfirmasi Kata Sandi
              </label>
              <div className="relative mt-1">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  {...register("confirmPassword")}
                  className={`block w-full rounded-md border-gray-700 bg-gray-700 py-2 px-3 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500 pr-10 ${
                    errors.confirmPassword ? "border-red-500" : ""
                  }`}
                  placeholder="Konfirmasi kata sandi Anda"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-400 hover:text-white focus:outline-none"
                >
                  {showConfirmPassword ? "Sembunyikan" : "Tampilkan"}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {submitError && (
              <p className="text-red-500 text-sm">{submitError}</p>
            )}

            <button
              type="submit"
              disabled={isSubmitting || registerMutation.isPending}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting || registerMutation.isPending
                ? "Mendaftar..."
                : "Daftar"}
            </button>
            <button
              type="button"
              className="w-full flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200"
            >
              <Image
                src="/google.png"
                alt="Google"
                className="mr-2"
                width={24}
                height={24}
              />
              Lanjutkan dengan Google
            </button>
          </form>
        </AuthFormWrapper>
      </div>
    </main>
  );
}
