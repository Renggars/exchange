"use client";

import React, { useState, FC } from "react";
import Modal from "@/components/ui/Modal";

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DepositModal: FC<DepositModalProps> = ({ isOpen, onClose }) => {
  const [depositAmount, setDepositAmount] = useState<number | string>("");

  const handlePresetClick = (amount: number) => {
    setDepositAmount(amount);
  };

  const handleDeposit = () => {
    // Logika untuk menangani deposit
    console.log("Deposit amount:", depositAmount);
    alert(
      `Mencoba melakukan deposit sebesar Rp ${depositAmount}. Ini hanya simulasi.`
    );
    onClose(); // Tutup modal setelah deposit (atau setelah berhasil)
    setDepositAmount(""); // Reset jumlah deposit
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Deposit" size="md">
      <div className="space-y-4 text-white">
        {/* Disclaimer */}
        <div className="bg-blue-900/20 text-blue-300 p-3 rounded-md text-sm">
          Disclaimer: Deposit ini hanya untuk tujuan simulasi. Dana bersifat
          virtual dan tidak memiliki nilai uang nyata. Gunakan fitur ini untuk
          berlatih perdagangan kripto tanpa risiko.
        </div>

        {/* Input Jumlah Deposit */}
        <div>
          <label
            htmlFor="depositAmount"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Masukkan jumlah deposit
          </label>
          <div className="relative rounded-md shadow-sm">
            <input
              type="number"
              id="depositAmount"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
              className="block w-full rounded-md border-gray-700 bg-gray-700 py-2 pl-3 pr-10 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="0"
              min="100000" // Min Rp 100,000
              max="1000000000" // Max Rp 1,000,000,000
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <span className="text-gray-300 sm:text-sm" id="price-currency">
                IDR
              </span>
            </div>
          </div>
          <p className="mt-1 text-xs text-gray-400">
            Min Rp 100,000 - Max Rp 1,000,000,000
          </p>
        </div>

        {/* Tombol-tombol Preset */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <button
            onClick={() => handlePresetClick(100000)}
            className="bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-md text-sm font-medium"
          >
            +100K
          </button>
          <button
            onClick={() => handlePresetClick(500000)}
            className="bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-md text-sm font-medium"
          >
            +500K
          </button>
          <button
            onClick={() => handlePresetClick(1000000)}
            className="bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-md text-sm font-medium"
          >
            +1JT
          </button>
          <button
            onClick={() => handlePresetClick(5000000)}
            className="bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-md text-sm font-medium"
          >
            +5JT
          </button>
        </div>

        {/* Tombol Deposit */}
        <button
          onClick={handleDeposit}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition-colors duration-200"
        >
          Deposit
        </button>
      </div>
    </Modal>
  );
};

export default DepositModal;
