// src/components/portfolio/WithdrawalModal.tsx
"use client"; // Pastikan ini ada jika menggunakan React hooks di komponen klien

import React, { useState, FC } from "react";
import Modal from "@/components/ui/Modal"; // Pastikan path benar

interface WithdrawalModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentBalance: number; // Prop untuk saldo saat ini
}

const WithdrawalModal: FC<WithdrawalModalProps> = ({
  isOpen,
  onClose,
  currentBalance,
}) => {
  const [withdrawalAmount, setWithdrawalAmount] = useState<number | string>("");

  const handlePercentageClick = (percentage: number) => {
    const amount = currentBalance * (percentage / 100);
    setWithdrawalAmount(amount);
  };

  const handleWithdraw = () => {
    const amount = parseFloat(withdrawalAmount as string); // Pastikan ini number
    if (isNaN(amount) || amount <= 0) {
      alert("Masukkan jumlah penarikan yang valid.");
      return;
    }
    if (amount > currentBalance) {
      alert("Saldo tidak cukup untuk penarikan ini.");
      return;
    }

    // Logika untuk menangani penarikan
    console.log("Withdrawal amount:", amount);
    alert(
      `Mencoba melakukan penarikan sebesar Rp ${amount}. Ini hanya simulasi.`
    );
    onClose(); // Tutup modal setelah penarikan (atau setelah berhasil)
    setWithdrawalAmount(""); // Reset jumlah penarikan
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Penarikan" size="md">
      <div className="space-y-4 text-white">
        {/* Disclaimer */}
        <div className="bg-yellow-900/20 text-yellow-300 p-3 rounded-md text-sm">
          Disclaimer: Penarikan ini hanya untuk tujuan simulasi. Dana bersifat
          virtual dan tidak memiliki nilai uang nyata. Gunakan fitur ini untuk
          berlatih perdagangan kripto tanpa risiko.
        </div>

        {/* Saldo saat ini */}
        <div className="text-sm text-gray-300">
          Saldo: Rp.{currentBalance.toLocaleString("id-ID")}
        </div>

        {/* Input Jumlah Penarikan */}
        <div>
          <label htmlFor="withdrawalAmount" className="sr-only">
            Masukkan jumlah penarikan
          </label>
          <div className="relative rounded-md shadow-sm">
            <input
              type="number"
              id="withdrawalAmount"
              value={withdrawalAmount}
              onChange={(e) => setWithdrawalAmount(e.target.value)}
              className="block w-full rounded-md border-gray-700 bg-gray-700 py-2 pl-3 pr-10 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
              placeholder="0"
              min="0"
              step="any"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <span className="text-gray-300 sm:text-sm" id="price-currency">
                IDR
              </span>
            </div>
          </div>
        </div>

        {/* Tombol-tombol Persentase */}
        <div className="grid grid-cols-4 gap-2">
          <button
            onClick={() => handlePercentageClick(25)}
            className="bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-md text-sm font-medium"
          >
            25%
          </button>
          <button
            onClick={() => handlePercentageClick(50)}
            className="bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-md text-sm font-medium"
          >
            50%
          </button>
          <button
            onClick={() => handlePercentageClick(75)}
            className="bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-md text-sm font-medium"
          >
            75%
          </button>
          <button
            onClick={() => handlePercentageClick(100)}
            className="bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-md text-sm font-medium"
          >
            100%
          </button>
        </div>

        {/* Tombol Tarik */}
        <button
          onClick={handleWithdraw}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-md transition-colors duration-200"
        >
          Tarik
        </button>
      </div>
    </Modal>
  );
};

export default WithdrawalModal;
