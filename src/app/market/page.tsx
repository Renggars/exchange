// src/app/market/page.tsx
"use client";

import React, { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useRouter } from "next/navigation"; // Import useRouter

export default function MarketPage() {
  const [activeTab, setActiveTab] = useState("Trending");
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter(); // Inisialisasi useRouter

  // Data dummy untuk Koin Trending
  const trendingCoins = [
    {
      name: "Bitcoin",
      icon: "/bitcoin-icon.png",
      price: "IDR 1,716,930,000",
      change: "-0.19%",
      changeColor: "text-red-400",
    },
    {
      name: "Fartcoin",
      icon: "/fartcoin-icon.png",
      price: "IDR 19,575.00",
      change: "+3.87%",
      changeColor: "text-green-400",
    },
    {
      name: "Ethereum",
      icon: "/ethereum-icon.png",
      price: "IDR 41,281,000",
      change: "-0.17%",
      changeColor: "text-red-400",
    },
    {
      name: "Sundog",
      icon: "/sundog-icon.png",
      price: "IDR 898.00",
      change: "+6.40%",
      changeColor: "text-green-400",
    },
    {
      name: "Pepe",
      icon: "/pepe-icon.png",
      price: "IDR 0.180655",
      change: "+1.70%",
      changeColor: "text-green-400",
    },
  ];

  // Data dummy untuk Kenaikan Tertinggi
  const topGainers = [
    { rank: 1, name: "Shenum", price: "IDR 3.00", percent: "+100.00%" },
    { rank: 2, name: "Kunci Coin", price: "IDR 4.00", percent: "+13.53%" },
    {
      rank: 3,
      name: "Heroes of MAVIA",
      price: "IDR 2,895.00",
      percent: "+7.00%",
    },
    { rank: 4, name: "Kata", price: "IDR 4,118.00", percent: "+13.20%" },
    {
      rank: 5,
      name: "Aerodrome Finance",
      price: "IDR 11,730.00",
      percent: "-13.10%",
    },
  ];

  // Data dummy untuk Berita
  const marketNews = [
    {
      title:
        "Harga Bitcoin Hari Ini: Turun ke $104K Saat Konflik Israel-Iran Memicu Suasana Risk-Off",
      source: "Investing.com",
      date: "13 Juni 2025",
    },
    {
      title:
        "Bitcoin Berpotensi Jadi Benteng Terakhir Saat BAJ Trump Picu Devaluasi Dolar",
      source: "Cryptokarian.com",
      date: "13 Juni 2025",
    },
    {
      title: "Aksi Jual Tak Berhenti, Harga Uang Kripto EOS Jatuh 15%",
      source: "Investing.com",
      date: "13 Juni 2025",
    },
  ];

  // Data dummy untuk Tabel Utama (Tambahkan beberapa data lagi untuk pagination)
  const cryptoData = [
    {
      name: "Bitcoin",
      icon: "/bitcoin-icon.png",
      pair: "BTC_IDR",
      price: "IDR 1,716,930,000",
      volume: "41.17B",
      change24h: "-0.19%",
      change7d: "+0.56%",
      change24hColor: "text-red-400",
      change7dColor: "text-green-400",
    },
    {
      name: "Fartcoin",
      icon: "/fartcoin-icon.png",
      pair: "FARTCOIN_IDR",
      price: "IDR 19,575.00",
      volume: "27.81B",
      change24h: "+6.87%",
      change7d: "+15.17%",
      change24hColor: "text-green-400",
      change7dColor: "text-green-400",
    },
    {
      name: "Ethereum",
      icon: "/ethereum-icon.png",
      pair: "ETH_IDR",
      price: "IDR 41,281,000",
      volume: "20.08B",
      change24h: "+0.11%",
      change7d: "+1.92%",
      change24hColor: "text-green-400",
      change7dColor: "text-green-400",
    },
    {
      name: "Sundog",
      icon: "/sundog-icon.png",
      pair: "SUNDOG_IDR",
      price: "IDR 898.00",
      volume: "19.72B",
      change24h: "+6.40%",
      change7d: "+2.78%",
      change24hColor: "text-green-400",
      change7dColor: "text-green-400",
    },
    {
      name: "Pepe",
      icon: "/pepe-icon.png",
      pair: "PEPE_IDR",
      price: "IDR 0.180655",
      volume: "16.98B",
      change24h: "+2.76%",
      change7d: "-2.78%",
      change24hColor: "text-green-400",
      change7dColor: "text-red-400",
    },
    {
      name: "Heroes of MAVIA",
      icon: "/mafia-icon.png",
      pair: "MAVIA_IDR",
      price: "IDR 2,895.00",
      volume: "1.47B",
      change24h: "+17.49%",
      change7d: "+10.71%",
      change24hColor: "text-green-400",
      change7dColor: "text-green-400",
    },
    {
      name: "Aave",
      icon: "/aave-icon.png",
      pair: "AAVE_IDR",
      price: "IDR 4,500,000",
      volume: "1.26B",
      change24h: "-3.64%",
      change7d: "+0.74%",
      change24hColor: "text-red-400",
      change7dColor: "text-green-400",
    },
    {
      name: "Cardano",
      icon: "/cardano-icon.png",
      pair: "ADA_IDR",
      price: "IDR 10,340.00",
      volume: "1.25B",
      change24h: "-0.33%",
      change7d: "-4.56%",
      change24hColor: "text-red-400",
      change7dColor: "text-red-400",
    },
    {
      name: "Orbs",
      icon: "/orbs-icon.png",
      pair: "ORBS_IDR",
      price: "IDR 356.00",
      volume: "1.22B",
      change24h: "-5.07%",
      change7d: "+21.92%",
      change24hColor: "text-red-400",
      change7dColor: "text-green-400",
    },
    {
      name: "dogwifhat",
      icon: "/wif-icon.png",
      pair: "WIF_IDR",
      price: "IDR 13,800.00",
      volume: "1.14B",
      change24h: "+1.53%",
      change7d: "-3.50%",
      change24hColor: "text-green-400",
      change7dColor: "text-red-400",
    },
    {
      name: "Tether Gold",
      icon: "/xaut-icon.png",
      pair: "XAUT_IDR",
      price: "IDR 56,300,000",
      volume: "1.10B",
      change24h: "+0.09%",
      change7d: "+3.18%",
      change24hColor: "text-green-400",
      change7dColor: "text-green-400",
    },
    {
      name: "Aerodrome Finance",
      icon: "/aero-icon.png",
      pair: "AERO_IDR",
      price: "IDR 11,720.00",
      volume: "1.04B",
      change24h: "+13.13%",
      change7d: "+33.44%",
      change24hColor: "text-green-400",
      change7dColor: "text-green-400",
    },
    {
      name: "Solana",
      icon: "/solana-icon.png",
      pair: "SOL_IDR",
      price: "IDR 2,400,000",
      volume: "50.00B",
      change24h: "+1.2%",
      change7d: "+5.0%",
      change24hColor: "text-green-400",
      change7dColor: "text-green-400",
    },
    {
      name: "XRP",
      icon: "/xrp-icon.png",
      pair: "XRP_IDR",
      price: "IDR 8,000",
      volume: "10.00B",
      change24h: "-0.5%",
      change7d: "+0.2%",
      change24hColor: "text-red-400",
      change7dColor: "text-green-400",
    },
    {
      name: "Dogecoin",
      icon: "/doge-icon.png",
      pair: "DOGE_IDR",
      price: "IDR 2,500",
      volume: "8.00B",
      change24h: "+3.0%",
      change7d: "+10.0%",
      change24hColor: "text-green-400",
      change7dColor: "text-green-400",
    },
    {
      name: "Shiba Inu",
      icon: "/shib-icon.png",
      pair: "SHIB_IDR",
      price: "IDR 0.5",
      volume: "15.00B",
      change24h: "-2.0%",
      change7d: "-5.0%",
      change24hColor: "text-red-400",
      change7dColor: "text-red-400",
    },
    {
      name: "Litecoin",
      icon: "/ltc-icon.png",
      pair: "LTC_IDR",
      price: "IDR 1,500,000",
      volume: "7.00B",
      change24h: "+0.8%",
      change7d: "+1.5%",
      change24hColor: "text-green-400",
      change7dColor: "text-green-400",
    },
  ];

  const itemsPerPage = 7;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const actualTotalPages = Math.ceil(cryptoData.length / itemsPerPage);

  const getFilteredData = () => {
    let dataToFilter = cryptoData;

    switch (activeTab) {
      case "Trending":
        // Untuk data trending, asumsikan sudah diurutkan atau ambil subset khusus
        // Untuk demo, kita gunakan data utama saja
        break;
      case "Gainers":
        dataToFilter = [...cryptoData].sort(
          (a, b) => parseFloat(b.change24h) - parseFloat(a.change24h)
        );
        break;
      case "Losers":
        dataToFilter = [...cryptoData].sort(
          (a, b) => parseFloat(a.change24h) - parseFloat(b.change24h)
        );
        break;
      case "Watchlist":
        return []; // Implementasi watchlist jika ada
      default:
        break;
    }
    return dataToFilter.slice(startIndex, startIndex + itemsPerPage);
  };

  const visiblePageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;

    if (actualTotalPages <= maxPagesToShow) {
      for (let i = 1; i <= actualTotalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= Math.floor(maxPagesToShow / 2) + 1) {
        for (let i = 1; i <= maxPagesToShow - 2; i++) {
          pages.push(i);
        }
        pages.push("...", actualTotalPages);
      } else if (
        currentPage >=
        actualTotalPages - Math.floor(maxPagesToShow / 2)
      ) {
        pages.push(1, "...");
        for (
          let i = actualTotalPages - (maxPagesToShow - 3);
          i <= actualTotalPages;
          i++
        ) {
          pages.push(i);
        }
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          actualTotalPages
        );
      }
    }
    return pages;
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white flex flex-col">
      <Header />
      <div className="container mx-auto py-8 px-6 flex-grow">
        {/* Top Section: Koin Trending, Kenaikan Tertinggi, Berita */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {/* Koin Trending */}
          <div className="bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4">Koin Trending</h3>
            <ul className="space-y-4">
              {trendingCoins.map((coin, index) => (
                <li key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-gray-400 mr-3 w-4 text-right">
                      {index + 1}
                    </span>
                    {coin.icon && (
                      <img
                        src={coin.icon}
                        alt={coin.name}
                        className="w-6 h-6 mr-2"
                      />
                    )}
                    <span className="font-medium text-white">{coin.name}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-white text-sm">{coin.price}</p>
                    <p className={`${coin.changeColor} text-xs`}>
                      {coin.change}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Kenaikan Tertinggi */}
          <div className="bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4">Kenaikan Tertinggi</h3>
            <ul className="space-y-4">
              {topGainers.map((gainer, index) => (
                <li key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-gray-400 mr-3 w-4 text-right">
                      {gainer.rank}
                    </span>
                    <span className="font-medium text-white">
                      {gainer.name}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-white text-sm">{gainer.price}</p>
                    <p
                      className={
                        parseFloat(gainer.percent) > 0
                          ? "text-green-400 text-xs"
                          : "text-red-400 text-xs"
                      }
                    >
                      {gainer.percent}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Berita */}
          <div className="bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4">Berita</h3>
            <ul className="space-y-4">
              {marketNews.map((news, index) => (
                <li
                  key={index}
                  className="pb-4 border-b border-gray-700 last:border-b-0"
                >
                  <h4 className="text-base font-semibold text-white mb-1">
                    {news.title}
                  </h4>
                  <p className="text-xs text-gray-400">
                    {news.source} • {news.date}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Tabel Data Pasar dengan Filter */}
        <div className="bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex space-x-2 bg-gray-700 rounded-md p-1">
              {["Trending", "Gainers", "Losers", "Watchlist"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    setCurrentPage(1); // Reset to first page on tab change
                  }}
                  className={`py-2 px-4 rounded-md text-sm font-medium transition-colors
                    ${
                      activeTab === tab
                        ? "bg-purple-600 text-white"
                        : "text-gray-300 hover:bg-gray-600"
                    }
                  `}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search tokens"
                className="bg-gray-700 text-white border border-gray-600 rounded-md py-2 px-4 pr-10 focus:outline-none focus:border-purple-500"
              />
              <svg
                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
          </div>

          <div className="overflow-x-auto mb-6">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-700">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                  >
                    #
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                  >
                    Nama Token
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                  >
                    Pasangan
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
                    Volume 24 Jam
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                  >
                    Perubahan 24 Jam
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                  >
                    Perubahan 7 Hari
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {getFilteredData().map((crypto, index) => (
                  <tr
                    key={crypto.pair}
                    className="cursor-pointer hover:bg-gray-700 transition-colors"
                    onClick={() =>
                      router.push(`/market/${crypto.pair.toLowerCase()}`)
                    }
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                      {startIndex + index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white flex items-center">
                      <img
                        src={crypto.icon}
                        alt={crypto.name}
                        className="w-5 h-5 mr-2"
                      />{" "}
                      {crypto.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                      {crypto.pair}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      {crypto.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                      {crypto.volume}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold">
                      <span className={crypto.change24hColor}>
                        {crypto.change24h}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold">
                      <span className={crypto.change7dColor}>
                        {crypto.change7d}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center space-x-2 mt-6">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className={`py-2 px-4 rounded-md text-sm font-medium transition-colors
                ${
                  currentPage === 1
                    ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                    : "bg-purple-600 hover:bg-purple-700 text-white"
                }
              `}
            >
              Sebelumnya
            </button>

            {visiblePageNumbers().map((page, index) =>
              page === "..." ? (
                <span key={index} className="py-2 px-2 text-gray-400">
                  ...
                </span>
              ) : (
                <button
                  key={index}
                  onClick={() => setCurrentPage(page as number)}
                  className={`py-2 px-4 rounded-md text-sm font-medium transition-colors
                    ${
                      currentPage === page
                        ? "bg-purple-600 text-white"
                        : "bg-gray-700 hover:bg-gray-600 text-gray-300"
                    }
                  `}
                >
                  {page}
                </button>
              )
            )}

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(actualTotalPages, prev + 1))
              }
              disabled={currentPage === actualTotalPages}
              className={`py-2 px-4 rounded-md text-sm font-medium transition-colors
                ${
                  currentPage === actualTotalPages
                    ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                    : "bg-purple-600 hover:bg-purple-700 text-white"
                }
              `}
            >
              Berikutnya
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
