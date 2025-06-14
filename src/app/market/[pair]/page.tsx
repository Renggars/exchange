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
  CandlestickSeriesPartialOptions,
  LineSeriesPartialOptions,
  Time, // Penting: Import Time type
} from "lightweight-charts";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Image from "next/image";

// Menggunakan tipe Time dari lightweight-charts untuk properti `time`
// agar TypeScript mengenali format waktu yang valid.
interface CandlestickData {
  time: Time; // Ini bisa berupa number (timestamp detik), string (ISO 8601), atau object { day, month, year }
  open: number;
  high: number;
  low: number;
  close: number;
}

interface LineData {
  time: Time; // Sama, gunakan Time
  value: number;
}

// --- Data Dummy ---
const generateDummyCandlestickData = (numDays: number): CandlestickData[] => {
  const data: CandlestickData[] = [];
  let lastClose = 1700000000;
  // Mulai waktu dari beberapa hari yang lalu, dinormalisasi ke awal hari
  let time = new Date().getTime() - numDays * 24 * 60 * 60 * 1000;
  time = Math.floor(time / (24 * 60 * 60 * 1000)) * (24 * 60 * 60 * 1000);

  for (let i = 0; i < numDays; i++) {
    const open = lastClose * (1 + (Math.random() - 0.5) * 0.02);
    const high = Math.max(open, lastClose * (1 + Math.random() * 0.03));
    const low = Math.min(open, lastClose * (1 - Math.random() * 0.03));
    const close = lastClose * (1 + (Math.random() - 0.5) * 0.02);

    data.push({
      time: (time / 1000) as Time, // Cast eksplisit ke Time (number adalah salah satu tipe Time yang valid)
      open,
      high,
      low,
      close,
    });
    lastClose = close;
    time += 24 * 60 * 60 * 1000; // Tambah satu hari dalam milidetik
  }
  return data;
};

const generateDummyLineData = (
  candleData: CandlestickData[],
  period: number
): LineData[] => {
  const lineData: LineData[] = [];
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
  const pair = typeof params.pair === "string" ? params.pair : "";
  const [coinSymbol, currency] = pair
    ? pair.split("_").map((s) => s.toUpperCase())
    : ["", ""];

  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const candlestickSeriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
  const ma50SeriesRef = useRef<ISeriesApi<"Line"> | null>(null);
  const ma200SeriesRef = useRef<ISeriesApi<"Line"> | null>(null);
  const [activeTradeTab, setActiveTradeTab] = useState("Perdagangan Saya");

  const dummyCryptoDetail = {
    name:
      coinSymbol === "BTC"
        ? "Bitcoin"
        : coinSymbol === "ETH"
        ? "Ethereum"
        : coinSymbol,
    price: "IDR 1,715,463,000",
    change24h: "-0.25%",
    high24h: "IDR 1,735,000,000",
    low24h: "IDR 1,712,000,000",
    volumeIDR: "24.25B",
    volumeBTC: "41.798",
    description: `Ini adalah halaman detail untuk ${coinSymbol}/${currency}. Di sini akan ditampilkan grafik harga, order book, dan informasi trading lainnya untuk pasangan mata uang kripto ini.`,
    imageUrl:
      coinSymbol === "BTC" ? "/bitcoin-logo.png" : "/generic-crypto.png",
  };

  useEffect(() => {
    if (!chartContainerRef.current) return;

    // Bersihkan chart sebelumnya untuk menghindari duplikasi saat re-render
    if (chartRef.current) {
      chartRef.current.remove();
      chartRef.current = null;
    }

    const chartOptions = {
      layout: {
        background: { type: ColorType.Solid, color: "#1F2937" },
        textColor: "#D1D5DB",
      },
      grid: {
        vertLines: { color: "#374151" },
        horzLines: { color: "#374151" },
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
      height: 400,
      ...chartOptions,
    });
    chartRef.current = chart;

    // Sesuai dokumentasi: gunakan chart.addSeries(CandlestickSeries, options)
    const candlestickSeries = chart.addSeries(CandlestickSeries, {
      upColor: "#10B981", // green-500
      downColor: "#EF4444", // red-500
      borderVisible: false,
      wickUpColor: "#10B981",
      wickDownColor: "#EF4444",
    } as CandlestickSeriesPartialOptions);

    candlestickSeriesRef.current = candlestickSeries;

    // Sesuai dokumentasi: gunakan chart.addSeries(LineSeries, options)
    const ma50Series = chart.addSeries(LineSeries, {
      color: "#FBBF24", // yellow-400
      lineWidth: 1,
      crosshairMarkerVisible: false,
      priceLineVisible: false,
    } as LineSeriesPartialOptions);
    ma50SeriesRef.current = ma50Series;

    // Sesuai dokumentasi: gunakan chart.addSeries(LineSeries, options)
    const ma200Series = chart.addSeries(LineSeries, {
      color: "#A78BFA", // purple-400
      lineWidth: 1,
      crosshairMarkerVisible: false,
      priceLineVisible: false,
    } as LineSeriesPartialOptions);
    ma200SeriesRef.current = ma200Series;

    const dummyCandleData = generateDummyCandlestickData(90);
    const ma50Data = generateDummyLineData(dummyCandleData, 50);
    const ma200Data = generateDummyLineData(dummyCandleData, 200);

    // Dengan `time: Time;` di interface, casting ke `any` mungkin tidak diperlukan
    // atau jika masih muncul "Unexpected any", itu berarti ada aturan linting ketat.
    // Jika masih ada error, bisa coba hapus `as any` di sini setelah perubahan interface.
    candlestickSeries.setData(dummyCandleData);
    ma50Series.setData(ma50Data);
    ma200Series.setData(ma200Data);

    // Penyesuaian ukuran chart saat ukuran container berubah
    const resizeObserver = new ResizeObserver((entries) => {
      if (chartRef.current && chartContainerRef.current) {
        const { width, height } = entries[0].contentRect;
        chartRef.current.applyOptions({ width, height });
      }
    });

    if (chartContainerRef.current) {
      resizeObserver.observe(chartContainerRef.current);
    }

    return () => {
      // Membersihkan chart saat komponen di-unmount
      if (chartRef.current) {
        chartRef.current.remove();
        chartRef.current = null;
      }
      if (chartContainerRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        resizeObserver.unobserve(chartContainerRef.current);
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
          <div className="flex justify-between items-start mb-6">
            <div>
              <div className="flex items-center space-x-2">
                <Image
                  src={dummyCryptoDetail.imageUrl}
                  alt={`${dummyCryptoDetail.name} Logo`}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <span className="text-2xl font-bold text-white">
                  {dummyCryptoDetail.name}
                </span>
                <span className="text-md text-gray-400">
                  ({coinSymbol}/{currency})
                </span>
                <button className="text-gray-400 hover:text-purple-400">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.381-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
              <p className="text-5xl font-extrabold text-purple-400 mt-2">
                {dummyCryptoDetail.price}
                <span
                  className={`text-xl font-semibold ml-2 ${
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
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
            <div className="lg:col-span-2">
              <div ref={chartContainerRef} className="w-full h-96"></div>
            </div>

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

              <div className="bg-gray-700 rounded-md p-4">
                <p className="text-gray-400 text-sm">Saldo:</p>
                <p className="text-2xl font-bold text-white">Rp 0.0</p>
                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-md transition-colors mt-4">
                  Deposit
                </button>
              </div>
            </div>
          </div>

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

            {/* Perbaikan Hydration Error: Memastikan struktur DOM konsisten. */}
            {/* Langsung merender konten tabel atau konten lain di dalam div ini. */}
            {/* Ini mengurangi kemungkinan Next.js melihat ketidakcocokan DOM saat hydration. */}
            <div className="bg-gray-700 rounded-lg p-4 min-h-[200px] flex items-center justify-center">
              {
                activeTradeTab === "Perdagangan Saya" ? (
                  // Hanya render tabel jika tab aktif.
                  // Hindari div pembungkus tambahan di dalam kondisi ini jika tidak mutlak diperlukan.
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
                ) : activeTradeTab === "Transaksi" ? (
                  <p className="text-gray-400">
                    Isi konten untuk Transaksi di sini.
                  </p>
                ) : activeTradeTab === "Berita" ? (
                  <p className="text-gray-400">
                    Isi konten untuk Berita terkait kripto ini di sini.
                  </p>
                ) : null /* Jika tidak ada tab yang cocok, render null */
              }
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
