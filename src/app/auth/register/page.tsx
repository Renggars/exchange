// src/app/auth/register/page.tsx
"use client";

import React, { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AuthFormWrapper from "@/components/auth/AuthFormWrapper"; 

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Register submitted:", { name, email, password });
    // TODO: Implement actual registration logic (e.g., tRPC mutation)
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white flex flex-col">
      <Header />
      <div className="flex-grow flex items-center justify-center">
        <AuthFormWrapper
          title="Buat akun"
          footerText="Sudah punya akun?"
          footerLinkHref="/auth/login"
          footerLinkText="Masuk"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-gray-300 text-sm font-semibold mb-1"
              >
                Nama
              </label>
              <input
                type="text"
                id="name"
                placeholder="Nama Anda"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:border-purple-500 text-white"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-gray-300 text-sm font-semibold mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="email@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:border-purple-500 text-white"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-gray-300 text-sm font-semibold mb-1"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Masukkan kata sandi Anda"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:border-purple-500 text-white pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-purple-400 hover:text-purple-300 focus:outline-none"
                >
                  Tampilkan kata sandi
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-md transition-colors"
            >
              Buat akun
            </button>

            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-gray-700"></div>
              <span className="flex-shrink mx-4 text-gray-500 text-sm">
                Atau
              </span>
              <div className="flex-grow border-t border-gray-700"></div>
            </div>

            <button
              type="button"
              className="w-full flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 rounded-md transition-colors border border-gray-600"
            >
              <img
                src="/google-icon.svg"
                alt="Google"
                className="w-5 h-5 mr-2"
              />
              Lanjutkan dengan Google
            </button>
          </form>
        </AuthFormWrapper>
      </div>
      <Footer />
    </main>
  );
}
