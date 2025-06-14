// src/app/market/[pair]/page.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import {
  createChart,
  ColorType,
  IChartApi,
  ISeriesApi,
  CandlestickSeries,
  LineSeries,
  CandlestickSeriesPartialOptions, // Opsional untuk type safety
  LineSeriesPartialOptions, // Opsional untuk type safety
} from "lightweight-charts";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// --- Data Dummy (tetap sama) ---
const generateDummyCandleData = (numDays: number) => {
  const data = [];
  let lastClose = 1700000000;
  let time = Date.now() - numDays * 24 * 60 * 60 * 1000;

  for (let i = 0; i < numDays; i++) {
    const open = lastClose * (1 + (Math.random() - 0.5) * 0.02);
    const high = Math.max(open, lastClose * (1 + Math.random() * 0.03));
    const low = Math.min(open, lastClose * (1 - Math.random() * 0.03));
    const close = lastClose * (1 + (Math.random() - 0.5) * 0.02);

    data.push({
      time: (time / 1000) as any,
      open,
      high,
      low,
      close,
    });
    lastClose = close;
    time += 24 * 60 * 60 * 1000;
  }
  return data;
};

const generateDummyLineData = (candleData: any[], period: number) => {
  const lineData = [];
  for (let i = period - 1; i < candleData.length; i++) {
    const sum = candleData
      .slice(i - period + 1, i + 1)
      .reduce((acc, curr) => acc + curr.close, 0);
    lineData.push({ time: candleData[i].time, value: sum / period });
  }
  return lineData;
};

export default function CryptoDetailPage() {
  const params = useParams();
  const pair = params.pair as string;
  const [coinSymbol, currency] = pair
    ? pair.split("_").map((s) => s.toUpperCase())
    : ["", ""];

  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const candlestickSeriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
  const ma50SeriesRef = useRef<ISeriesApi<"Line"> | null>(null);
  const ma200SeriesRef = useRef<ISeriesApi<"Line"> | null>(null);
  const [activeTradeTab, setActiveTradeTab] = useState("Perdagangan Saya"); // State untuk tab di bawah chart

  const dummyCryptoDetail = {
    name:
      coinSymbol === "BTC"
        ? "Bitcoin"
        : coinSymbol === "ETH"
        ? "Ethereum"
        : coinSymbol,
    price: "IDR 1,715,463,000", // Contoh data dummy
    change24h: "-0.25%", // Contoh data dummy
    high24h: "IDR 1,735,000,000", // Contoh data dummy
    low24h: "IDR 1,712,000,000", // Contoh data dummy
    volumeIDR: "24.25B", // Contoh data dummy
    volumeBTC: "41.798", // Contoh data dummy
    description: `Ini adalah halaman detail untuk ${coinSymbol}/${currency}. Di sini akan ditampilkan grafik harga, order book, dan informasi trading lainnya untuk pasangan mata uang kripto ini.`,
  };

  useEffect(() => {
    if (!chartContainerRef.current) return;

    if (chartRef.current) {
      chartRef.current.remove();
      chartRef.current = null;
    }

    const chartOptions = {
      layout: {
        background: { type: ColorType.Solid, color: "#1F2937" }, // bg-gray-800
        textColor: "#D1D5DB", // text-gray-300
      },
      grid: {
        vertLines: { color: "#374151" }, // gray-700
        horzLines: { color: "#374151" }, // gray-700
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
        borderVisible: false,
      },
      rightPriceScale: {
        borderVisible: false,
      },
      handleScroll: {
        vertTouchDrag: true,
      },
      handleScale: {
        axisPressedMouseMove: true,
      },
    };

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 400, // Tinggi chart
      ...chartOptions,
    });

    chartRef.current = chart;

    const candlestickSeries = chart.addSeries(CandlestickSeries, {
      upColor: "#10B981", // green-500
      downColor: "#EF4444", // red-500
      borderVisible: false,
      wickUpColor: "#10B981",
      wickDownColor: "#EF4444",
    } as CandlestickSeriesPartialOptions);

    candlestickSeriesRef.current = candlestickSeries;

    const ma50Series = chart.addSeries(LineSeries, {
      color: "#FBBF24", // yellow-400
      lineWidth: 1,
      crosshairMarkerVisible: false,
      priceLineVisible: false,
    } as LineSeriesPartialOptions);
    ma50SeriesRef.current = ma50Series;

    const ma200Series = chart.addSeries(LineSeries, {
      color: "#A78BFA", // purple-400
      lineWidth: 1,
      crosshairMarkerVisible: false,
      priceLineVisible: false,
    } as LineSeriesPartialOptions);
    ma200SeriesRef.current = ma200Series;

    const dummyCandleData = generateDummyCandleData(30);
    candlestickSeries.setData(dummyCandleData);

    const ma50Data = generateDummyLineData(dummyCandleData, 50);
    ma50Series.setData(ma50Data);

    const ma200Data = generateDummyLineData(dummyCandleData, 200);
    ma200Series.setData(ma200Data);

    const handleResize = () => {
      if (chartContainerRef.current && chartRef.current) {
        chartRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth,
        });
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (chartRef.current) {
        chartRef.current.remove();
        chartRef.current = null;
      }
    };
  }, [pair]);

  return (
    <main className="min-h-screen bg-gray-900 text-white flex flex-col">
      <Header />
      <div className="container mx-auto py-8 px-6 flex-grow">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Trading {dummyCryptoDetail.name} ({coinSymbol}/{currency})
        </h1>

        <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          {/* Header detail coin (bagian atas) */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-white">
                  {dummyCryptoDetail.name}
                </span>
                <span className="text-md text-gray-400">
                  ({coinSymbol}/{currency})
                </span>
                <button className="text-gray-400 hover:text-purple-400">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.324 1.157l1.519 4.674c.3.921-.755 1.688-1.539 1.157l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.531-1.838-.236-1.539-1.157l1.519-4.674a1 1 0 00-.324-1.157L2.92 9.091c-.783-.57-.381-1.81.588-1.81h4.915a1 1 0 00.95-.69l1.519-4.674z"
                    ></path>
                  </svg>
                </button>
              </div>
              <p className="text-5xl font-extrabold text-purple-400 mt-2">
                {dummyCryptoDetail.price}
                <span
                  className={`text-xl font-semibold ${
                    parseFloat(dummyCryptoDetail.change24h) > 0
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {dummyCryptoDetail.change24h}
                </span>
              </p>
            </div>
            <div className="text-right">
              <p className="text-gray-400 text-sm">
                High:{" "}
                <span className="text-white">{dummyCryptoDetail.high24h}</span>
              </p>
              <p className="text-gray-400 text-sm">
                Low:{" "}
                <span className="text-white">{dummyCryptoDetail.low24h}</span>
              </p>
              <p className="text-gray-400 text-sm">
                Vol {coinSymbol} 24H:{" "}
                <span className="text-white">
                  {dummyCryptoDetail.volumeBTC}
                </span>
              </p>
              <p className="text-gray-400 text-sm">
                Vol {currency} 24H:{" "}
                <span className="text-white">
                  {dummyCryptoDetail.volumeIDR}
                </span>
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4 mb-4">
            <span className="text-gray-400 text-sm">
              MA-50: <span className="text-yellow-400">████</span>
            </span>
            <span className="text-gray-400 text-sm">
              MA-200: <span className="text-purple-400">████</span>
            </span>
            {/* TODO: Tambahkan dropdown/button untuk memilih interval waktu (1D, 1H, dll.) */}
          </div>

          {/* Bagian Utama: Chart (kiri) & Form Beli/Jual (kanan) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
            {/* Chart (2/3 lebar di layar besar) */}
            <div className="lg:col-span-2">
              <div ref={chartContainerRef} className="w-full h-96"></div>
            </div>

            {/* Form Beli/Jual & Saldo (1/3 lebar di layar besar) */}
            <div>
              <div className="flex space-x-4 mb-4">
                <button className="flex-1 py-2 rounded-md bg-green-600 hover:bg-green-700 text-white font-semibold">
                  Beli
                </button>
                <button className="flex-1 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white font-semibold">
                  Jual
                </button>
              </div>
              <div className="space-y-3 mb-6">
                {" "}
                {/* Tambahkan margin-bottom */}
                <div>
                  <label htmlFor="btcAmount" className="sr-only">
                    BTC Amount
                  </label>
                  <input
                    type="text"
                    id="btcAmount"
                    placeholder="BTC Amount"
                    className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:border-purple-500 text-white"
                  />
                  <span className="text-gray-400 text-sm block text-right mt-1">
                    BTC
                  </span>
                </div>
                <div className="flex justify-between space-x-2">
                  <button className="flex-1 py-2 rounded-md bg-gray-700 hover:bg-gray-600 text-white text-sm">
                    25%
                  </button>
                  <button className="flex-1 py-2 rounded-md bg-gray-700 hover:bg-gray-600 text-white text-sm">
                    50%
                  </button>
                  <button className="flex-1 py-2 rounded-md bg-gray-700 hover:bg-gray-600 text-white text-sm">
                    75%
                  </button>
                  <button className="flex-1 py-2 rounded-md bg-gray-700 hover:bg-gray-600 text-white text-sm">
                    100%
                  </button>
                </div>
                <div>
                  <label htmlFor="totalIDR" className="sr-only">
                    Total IDR
                  </label>
                  <input
                    type="text"
                    id="totalIDR"
                    placeholder="Total IDR"
                    className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:border-purple-500 text-white"
                  />
                  <span className="text-gray-400 text-sm block text-right mt-1">
                    IDR
                  </span>
                </div>
              </div>

              {/* Saldo & Deposit */}
              <div className="bg-gray-700 rounded-md p-4">
                <p className="text-gray-400 text-sm">Saldo:</p>
                <p className="text-2xl font-bold text-white">Rp 0.0</p>
                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-md transition-colors mt-4">
                  Deposit
                </button>
              </div>
            </div>
          </div>

          {/* Bagian Bawah: Tab Perdagangan Saya, Transaksi, Berita */}
          <div className="mt-8">
            <div className="flex border-b border-gray-700 mb-4">
              {["Perdagangan Saya", "Transaksi", "Berita"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTradeTab(tab)}
                  className={`py-3 px-6 text-sm font-semibold transition-colors
                    ${
                      activeTradeTab === tab
                        ? "text-purple-400 border-b-2 border-purple-600"
                        : "text-gray-400 hover:text-white border-b-2 border-transparent hover:border-gray-600"
                    }
                  `}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="bg-gray-700 rounded-lg p-4 min-h-[200px] flex items-center justify-center">
              {" "}
              {/* min-h untuk visual placeholder */}
              {activeTradeTab === "Perdagangan Saya" && (
                <div className="w-full">
                  <table className="min-w-full divide-y divide-gray-600">
                    <thead className="bg-gray-600">
                      <tr>
                        <th
                          scope="col"
                          className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                        >
                          Tanggal
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                        >
                          Jenis
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                        >
                          Harga
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                        >
                          Jumlah
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-600">
                      <tr>
                        <td
                          colSpan={4}
                          className="px-4 py-4 whitespace-nowrap text-center text-sm text-gray-400"
                        >
                          Tidak ada data
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
              {activeTradeTab === "Transaksi" && (
                <p className="text-gray-400">
                  Isi konten untuk Transaksi di sini.
                </p>
              )}
              {activeTradeTab === "Berita" && (
                <p className="text-gray-400">
                  Isi konten untuk Berita terkait kripto ini di sini.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
