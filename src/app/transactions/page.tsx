// src/app/transactions/page.tsx
"use client";

import React, { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function TransactionsPage() {
  const [activeFilter, setActiveFilter] = useState("Semua"); // State untuk filter transaksi
  // Pilihan filter yang tersedia
  const filters = ["Semua", "Beli", "Jual", "Deposit", "Penarikan"]; // "Semua" untuk menampung semua jenis,

  // Data transaksi dummy (kosong untuk saat ini, sesuai screenshot)
  const transactions: any[] = []; // Array kosong untuk meniru "Tidak Ada Data"

  return (
    <main className="min-h-screen bg-gray-900 text-white flex flex-col">
      <Header />
      <div className="container mx-auto py-8 px-6 flex-grow">
        <h1 className="text-2xl font-bold text-white mb-6">
          Riwayat Transaksi
        </h1>

        <div className="bg-gray-800 rounded-lg shadow-lg p-6">
          {/* Tombol Filter Transaksi */}
          <div className="flex space-x-2 mb-6">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors
                  ${
                    activeFilter === filter
                      ? "bg-purple-600 text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }
                `}
              >
                {filter === "Semua" ? "Semua" : filter}{" "}
                {/* Tampilkan 'Semua' jika filter adalah 'Semua' */}
              </button>
            ))}
          </div>

          {/* Tabel Riwayat Transaksi */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-700">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                  >
                    Tanggal
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                  >
                    Jenis
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                  >
                    Harga
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                  >
                    Jumlah Token
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-800 divide-y divide-gray-700">
                {transactions.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-400"
                    >
                      Tidak Ada Data
                    </td>
                  </tr>
                ) : (
                  // Loop melalui transaksi di sini jika ada data
                  transactions.map((transaction, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {transaction.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {transaction.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {transaction.price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {transaction.amount}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
