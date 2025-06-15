// src/app/auth/login/page.tsx
"use client";

import React, { useState } from "react";
import { api } from "@/utils/api";
import { useRouter } from "next/navigation";
import AuthFormWrapper from "@/components/auth/AuthFormWrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";

const loginSchema = z.object({
  email: z.string().email("Format email tidak valid."),
  password: z.string().min(1, "Kata sandi tidak boleh kosong."),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  // submitError hanya digunakan untuk error non-field-specific,
  // error field-specific akan ditangani oleh errors dari useForm
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError, // <-- setError sudah dideklarasikan di sini
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const loginMutation = api.auth.login.useMutation({
    onSuccess: (data) => {
      localStorage.setItem("authToken", data.token);
      alert(data.message);
      router.push("/portfolio");
    },
    onError: (err) => {
      setSubmitError(null); // Reset submit error jika ada error baru
      // Cek apakah error dari server bisa dipetakan ke field tertentu
      if (err.message.includes("Email atau kata sandi salah")) {
        // Pesan error spesifik dari backend
        setError("email", {
          type: "server",
          message: "Email atau kata sandi salah.",
        });
        setError("password", {
          type: "server",
          message: "Email atau kata sandi salah.",
        });
      } else {
        // Untuk error lain yang tidak spesifik ke field
        setSubmitError(err.message || "Terjadi kesalahan saat login.");
      }
    },
    // Pastikan onSettled ada untuk mereset loading state dari mutation
    onSettled: () => {
      // Tidak perlu mereset isSubmitting karena itu diatur oleh RHF secara otomatis
    },
  });

  const onSubmit = async (data: LoginFormInputs) => {
    setSubmitError(null); // Reset error sebelum submit baru
    // Kita tidak perlu mengatur loading state manual karena isSubmitting dan loginMutation.isLoading
    // sudah menangani itu.
    loginMutation.mutate(data);
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white flex flex-col">
      <div className="flex-grow flex items-center justify-center">
        <AuthFormWrapper
          title="Masuk ke akun Anda"
          footerText="Belum punya akun?"
          footerLinkHref="/auth/register"
          footerLinkText="Daftar"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                Password
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
                  {showPassword ? "Sembunyikan" : "Tampilkan"} kata sandi
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
              <a
                href="#"
                className="text-sm text-purple-400 hover:underline mt-1 block text-right"
              >
                Lupa kata sandi?
              </a>
            </div>

            {submitError && (
              <p className="text-red-500 text-sm">{submitError}</p>
            )}

            <button
              type="submit"
              disabled={isSubmitting || loginMutation.isPending}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting || loginMutation.isPending
                ? "Memproses..."
                : "Masuk"}
            </button>

            <div className="text-center text-gray-400 my-4">Atau</div>

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
