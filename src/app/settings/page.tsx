// src/app/settings/page.tsx
"use client";

import React, { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function AccountSettingsPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isGoogleLogin, setIsGoogleLogin] = useState(true); // Dummy state: true jika login via Google

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    // Validasi input
    if (newPassword !== confirmNewPassword) {
      alert("Kata sandi baru dan konfirmasi kata sandi tidak cocok!");
      return;
    }
    if (newPassword.length < 8) {
      // Contoh validasi minimal 8 karakter
      alert("Kata sandi baru harus minimal 8 karakter.");
      return;
    }

    // Di sini Anda akan mengirim data perubahan kata sandi ke API backend
    console.log({
      currentPassword,
      newPassword,
      confirmNewPassword,
    });
    alert("Permintaan perubahan kata sandi telah dikirim. (Ini adalah demo)");
    // Reset form setelah submit
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white flex flex-col">
      <Header />
      <div className="container mx-auto py-8 px-6 flex-grow">
        <h1 className="text-2xl font-bold text-white mb-6">Pengaturan Akun</h1>

        <div className="bg-gray-800 rounded-lg shadow-lg p-6 max-w-xl mx-auto">
          {isGoogleLogin && (
            <div className="bg-yellow-800 border border-yellow-600 text-yellow-100 px-4 py-3 rounded-md relative mb-6 flex items-center">
              <svg
                className="w-5 h-5 mr-3"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.3 2.671-1.3 3.436 0L14.469 10H5.53l2.727-6.901zM11.95 14H8.05c-.378 0-.67-.34-.67-.765V8.5a.765.765 0 01.67-.765h3.9c.378 0 .67.34.67.765v4.735c0 .425-.292.765-.67.765z"
                  clipRule="evenodd"
                ></path>
              </svg>
              Anda masuk menggunakan Google. Silakan edit kata sandi Anda di
              akun Google Anda.
              {/* Tambahkan ikon "i" atau peringatan lainnya jika diperlukan */}
            </div>
          )}

          <form onSubmit={handleChangePassword} className="space-y-4">
            <div>
              <label
                htmlFor="currentPassword"
                className="block text-sm font-medium text-gray-400 mb-1"
              >
                Kata Sandi Saat Ini
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="currentPassword"
                name="currentPassword"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Kata Sandi Anda saat ini"
                className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:border-purple-500 text-white"
                required
              />
            </div>

            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-400 mb-1"
              >
                Kata Sandi Baru
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="newPassword"
                name="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Kata Sandi Baru"
                className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:border-purple-500 text-white"
                required
              />
            </div>

            <div>
              <label
                htmlFor="confirmNewPassword"
                className="block text-sm font-medium text-gray-400 mb-1"
              >
                Konfirmasi Kata Sandi Baru
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="confirmNewPassword"
                name="confirmNewPassword"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                placeholder="Konfirmasi Kata Sandi Baru"
                className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:border-purple-500 text-white"
                required
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="showPassword"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-600 rounded"
              />
              <label
                htmlFor="showPassword"
                className="ml-2 block text-sm text-gray-400"
              >
                Tampilkan kata sandi
              </label>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full px-6 py-3 rounded-md bg-purple-600 hover:bg-purple-700 text-white font-bold transition-colors"
                disabled={isGoogleLogin} // Nonaktifkan tombol jika login via Google
              >
                Edit Password
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </main>
  );
}
