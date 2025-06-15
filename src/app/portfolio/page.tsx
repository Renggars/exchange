// src/app/portfolio/page.tsx
"use client";

import React, { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DepositModal from "@/components/modal/DepositModal";
import WithdrawalModal from "@/components/modal/WitdhdrawalModal";

export default function PortfolioPage() {
  const [activeTimeRange, setActiveTimeRange] = useState("1D");
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [isWithdrawalModalOpen, setIsWithdrawalModalOpen] = useState(false); // State untuk mengontrol visibilitas modal penarikan

  // Data dummy untuk saldo dan aset (ganti dengan data aktual dari API/Auth)
  const currentBalance = 0; // Contoh saldo, gunakan angka agar bisa dihitung
  const totalAsset = "Rp 0"; // Ini masih string, sesuaikan jika perlu

  const openDepositModal = () => setIsDepositModalOpen(true);
  const closeDepositModal = () => setIsDepositModalOpen(false);

  const openWithdrawalModal = () => setIsWithdrawalModalOpen(true); // Fungsi untuk membuka modal penarikan
  const closeWithdrawalModal = () => setIsWithdrawalModalOpen(false); // Fungsi untuk menutup modal penarikan

  return (
    <main className="min-h-screen bg-gray-900 text-white flex flex-col">
      <Header />
      <div className="container mx-auto py-8 px-6 flex-grow">
        <h1 className="text-2xl font-bold text-white mb-6">Portofolio Saya</h1>

        {/* Bagian Saldo */}
        <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-300 mb-4">Saldo</h2>
          {/* Format balance ke IDR string untuk tampilan */}
          <p className="text-4xl font-extrabold text-white mb-6">
            Rp {currentBalance.toLocaleString("id-ID")}
          </p>
          <div className="flex space-x-4">
            <button
              onClick={openDepositModal}
              className="px-6 py-3 rounded-md bg-purple-600 hover:bg-purple-700 text-white font-bold transition-colors"
            >
              Deposit
            </button>
            <button
              onClick={openWithdrawalModal}
              className="px-6 py-3 rounded-md border border-purple-600 text-purple-400 hover:bg-purple-600 hover:text-white font-bold transition-colors"
            >
              Penarikan
            </button>
          </div>
        </div>

        {/* Bagian Total Aset */}
        <div className="bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-300 mb-4">
            Total Aset
          </h2>
          <p className="text-4xl font-extrabold text-white mb-6">
            {totalAsset}
          </p>
          <div className="flex space-x-2 mb-6">
            {["1D", "1W", "1M", "ALL"].map((range) => (
              <button
                key={range}
                onClick={() => setActiveTimeRange(range)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors
                  ${
                    activeTimeRange === range
                      ? "bg-purple-600 text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }
                `}
              >
                {range}
              </button>
            ))}
          </div>

          {/* Konten data aset */}
          <div className="min-h-[200px] flex items-center justify-center border border-gray-700 rounded-md p-4">
            <p className="text-gray-400 text-center">
              Tidak ada data untuk rentang waktu yang dipilih
            </p>
            {/* Di sini Anda akan menampilkan grafik atau daftar aset nyata jika ada data */}
          </div>
        </div>
      </div>
      <Footer />

      {/* Render DepositModal */}
      <DepositModal isOpen={isDepositModalOpen} onClose={closeDepositModal} />

      {/* Render WithdrawalModal, meneruskan currentBalance */}
      <WithdrawalModal
        isOpen={isWithdrawalModalOpen}
        onClose={closeWithdrawalModal}
        currentBalance={currentBalance}
      />
    </main>
  );
}
