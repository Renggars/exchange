// src/app/profile/page.tsx
"use client";

import React, { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function ProfilePage() {
  // State untuk menyimpan data profil (contoh, ganti dengan data aktual dari API/Auth)
  const [profileData, setProfileData] = useState({
    email: "kelompokrpl64@gmail.com", //
    namaDepan: "kelompok RPL", //
    namaBelakang: "", //
    nomorTelepon: "", //
    alamat: "", //
    avatarInitial: "K", // Inisial untuk avatar, bisa diambil dari nama depan/belakang
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();
    // Di sini Anda akan mengirim `profileData` ke API backend untuk disimpan
    console.log("Menyimpan perubahan profil:", profileData);
    // Tambahkan logika untuk menampilkan pesan sukses/error
    alert("Perubahan berhasil disimpan!");
  };

  const handleUploadAvatar = () => {
    // Logika untuk mengunggah avatar (misalnya, membuka file picker)
    alert("Fungsi Upload Avatar belum diimplementasikan.");
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white flex flex-col">
      <Header />
      <div className="container mx-auto py-8 px-6 flex-grow">
        <div className="bg-gray-800 rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold text-white mb-6">Profil Saya</h1>

          <div className="flex flex-col items-center mb-8">
            <div className="w-24 h-24 bg-pink-600 rounded-full flex items-center justify-center text-white text-5xl font-bold mb-4">
              {profileData.avatarInitial}
            </div>
            <button
              onClick={handleUploadAvatar}
              className="px-4 py-2 rounded-md bg-purple-600 hover:bg-purple-700 text-white font-semibold transition-colors"
            >
              Upload Avatar
            </button>
          </div>

          <form onSubmit={handleSaveChanges} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-400 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={profileData.email}
                readOnly // Email biasanya tidak bisa diubah langsung dari sini
                className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:border-purple-500 text-gray-300 cursor-not-allowed"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="namaDepan"
                  className="block text-sm font-medium text-gray-400 mb-1"
                >
                  Nama Depan
                </label>
                <input
                  type="text"
                  id="namaDepan"
                  name="namaDepan"
                  value={profileData.namaDepan}
                  onChange={handleChange}
                  placeholder="Nama Depan Anda"
                  className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:border-purple-500 text-white"
                />
              </div>
              <div>
                <label
                  htmlFor="namaBelakang"
                  className="block text-sm font-medium text-gray-400 mb-1"
                >
                  Nama Belakang
                </label>
                <input
                  type="text"
                  id="namaBelakang"
                  name="namaBelakang"
                  value={profileData.namaBelakang}
                  onChange={handleChange}
                  placeholder="Nama Belakang Anda"
                  className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:border-purple-500 text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="nomorTelepon"
                  className="block text-sm font-medium text-gray-400 mb-1"
                >
                  Nomor Telepon
                </label>
                <input
                  type="text"
                  id="nomorTelepon"
                  name="nomorTelepon"
                  value={profileData.nomorTelepon}
                  onChange={handleChange}
                  placeholder="Nomor Telepon Anda"
                  className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:border-purple-500 text-white"
                />
              </div>
              <div>
                <label
                  htmlFor="alamat"
                  className="block text-sm font-medium text-gray-400 mb-1"
                >
                  Alamat
                </label>
                <input
                  type="text"
                  id="alamat"
                  name="alamat"
                  value={profileData.alamat}
                  onChange={handleChange}
                  placeholder="Alamat Anda"
                  className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:border-purple-500 text-white"
                />
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="px-6 py-3 rounded-md bg-purple-600 hover:bg-purple-700 text-white font-bold transition-colors"
              >
                Simpan Perubahan
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </main>
  );
}
