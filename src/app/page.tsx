// src/app/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import DisclaimerModal from "@/components/modal/DisclaimerModal";

import Header from "@/components/layout/Header";
import HeroSection from "@/components/home/HeroSection";
import CryptoTableSection from "@/components/home/CryptoTableSection";
import FeatureSectionLeft from "@/components/home/FeatureSectionLeft";
import FeatureSectionRight from "@/components/home/FeatureSectionRight";
import NewsSection from "@/components/home/NewsSection";
import Footer from "@/components/layout/Footer";

export default function HomePage() {
  const [disclaimerAgreed, setDisclaimerAgreed] = useState(false);

  useEffect(() => {
    const agreedStatus = localStorage.getItem("disclaimerAgreed");
    if (agreedStatus === "true") {
      setDisclaimerAgreed(true);
    }
  }, []);

  const handleAgreeDisclaimer = () => {
    localStorage.setItem("disclaimerAgreed", "true");
    setDisclaimerAgreed(true);
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white">
      {!disclaimerAgreed && <DisclaimerModal onAgree={handleAgreeDisclaimer} />}

      {disclaimerAgreed ? (
        <>
          <Header />
          <HeroSection />
          <CryptoTableSection />

          {/* Bagian: Pantau Pasar Kripto Secara Real-Time */}
          <FeatureSectionLeft
            title="Pantau Pasar Kripto Secara Real-Time"
            description="Jelajahi berbagai pasangan aset kripto dengan data harga langsung, volume, dan tren. Dilengkapi chart interaktif untuk membantu Anda menganalisis pasar dengan mudah."
            buttonText="Lihat Pasar"
            imageSrc="/realtime-market-placeholder.png"
            imageAlt="Real-Time Market"
            imageOverlayText="Preview Pasar"
          />

          {/* Bagian: Belajar Trading Tanpa Risiko */}
          <FeatureSectionRight
            title="Belajar Trading Tanpa Risiko"
            description="Praktikkan pembelian dan penjualan aset kripto tanpa risiko. Fitur ini membantu Anda memahami mekanisme trading sambil belajar membuat keputusan investasi."
            buttonText="Mulai Trading"
            imageSrc="/risk-free-trading-placeholder.png"
            imageAlt="Risk-Free Trading"
            imageOverlayText="Simulasi Trading"
          />

          {/* Bagian: Pantau Riwayat Transaksi Anda */}
          <FeatureSectionLeft
            title="Pantau Riwayat Transaksi Anda"
            description="Simpan catatan lengkap dari semua aktivitas trading Anda. Lihat riwayat transaksi, analisis perdagangan sebelumnya, dan buat keputusan yang lebih baik untuk investasi di masa depan."
            buttonText="Lihat Riwayat"
            imageSrc="/transaction-history-placeholder.png"
            imageAlt="Transaction History"
            imageOverlayText="Lihat Riwayat"
          />

          {/* Bagian: Lihat dan Pantau Portofolio Anda */}
          <FeatureSectionRight
            title="Lihat dan Pantau Portofolio Anda"
            description="Pelajari cara membaca portofolio dengan grafik dan data aset yang lengkap. Simulasi ini dirancang untuk membantu Anda memahami hasil keputusan trading Anda."
            buttonText="Lihat Portofolio"
            imageSrc="/portfolio-placeholder.png"
            imageAlt="Portfolio"
            imageOverlayText="Pantau Portofolio"
          />

          <NewsSection />
          <Footer />
        </>
      ) : (
        <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white">
          <p className="text-lg text-gray-400">
            Menunggu persetujuan disclaimer...
          </p>
        </div>
      )}
    </main>
  );
}
