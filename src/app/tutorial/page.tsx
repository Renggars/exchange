// src/app/tutorial/page.tsx
"use client";

import React, { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

export default function TutorialPage() {
  const [activeSection, setActiveSection] = useState("memulai");

  // Struktur data untuk navigasi tutorial
  const tutorialSections = [
    { id: "memulai", title: "Panduan Memulai" },
    { id: "memahami-pasar", title: "Memahami Pasar" },
    { id: "panduan-trading", title: "Panduan Trading" },
    { id: "mengelola-portofolio", title: "Mengelola Portofolio Anda" },
    { id: "memantau-transaksi", title: "Memantau Transaksi Anda" },
    { id: "kustomisasi-profil", title: "Kustomisasi Profil Anda" },
    { id: "pengaturan-akun", title: "Pengaturan Akun" },
  ];

  return (
    <main className="min-h-screen bg-gray-900 text-white flex flex-col">
      <Header />
      <div className="container mx-auto py-8 px-6 flex-grow flex flex-col md:flex-row gap-8">
        {/* Sidebar Navigasi Tutorial */}
        <aside className="md:w-1/4 bg-gray-800 rounded-lg shadow-lg p-6 h-fit sticky top-4">
          <nav className="space-y-2">
            {tutorialSections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`} // Untuk scroll ke bagian tertentu
                onClick={() => setActiveSection(section.id)}
                className={`block py-2 px-3 rounded-md transition-colors
                  ${
                    activeSection === section.id
                      ? "bg-purple-600 text-white"
                      : "text-gray-300 hover:bg-gray-700"
                  }
                `}
              >
                {section.title}
              </a>
            ))}
          </nav>
        </aside>

        {/* Konten Utama Tutorial */}
        <article className="md:w-3/4 bg-gray-800 rounded-lg shadow-lg p-8 prose prose-invert max-w-none">
          <h1 className="text-4xl font-bold text-white mb-6">
            Selamat Datang di KriptoLab!
          </h1>
          <p className="text-gray-300 mb-6">
            KriptoLab adalah platform simulasi perdagangan cryptocurrency yang
            dirancang hanya untuk tujuan edukasi. Data yang ditampilkan berasal
            dari API Indodex dan dimaksudkan untuk latihan dalam lingkungan
            tanpa risiko. Platform ini tidak memberikan saran keuangan atau
            menjamin akurasi untuk keputusan perdagangan di dunia nyata. Gunakan
            informasi ini atas kebijaksanaan Anda sendiri.
          </p>
          <p className="text-gray-300 mb-6">
            Panduan ini akan membantu Anda dalam menyiapkan akun dan memulai. Di
            akhir tutorial ini, Anda akan dapat:
          </p>
          <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2">
            <li>Membuat Akun Anda</li>
            <li>Masuk ke Akun Anda</li>
            <li>Mulai Perjalanan Trading Anda</li>
          </ul>

          <section id="memulai" className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">
              Panduan Memulai
            </h2>
            {/* Konten Panduan Memulai di sini */}
            {/* Anda bisa menambahkan sub-section di sini jika perlu */}
          </section>

          <section id="membuat-akun" className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">
              Membuat Akun Anda
            </h2>
            <p className="text-gray-300 mb-4">
              Mulai perjalanan KriptoLab Anda dengan membuat akun gratis untuk
              menyimpan progres dan mulai trading.
            </p>
            <ol className="list-decimal list-inside text-gray-300 mb-4 space-y-2">
              <li>
                Kunjungi situs web KriptoLab dan temukan tombol{" "}
                <span className="font-semibold text-purple-400">Daftar</span> di
                pojok kanan atas.
              </li>
              <li>
                Isi formulir pendaftaran dengan:
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Nama lengkap Anda</li>
                  <li>Alamat email yang valid</li>
                  <li>
                    Kata sandi yang aman (minimal 8 karakter, termasuk huruf
                    besar, huruf kecil, angka, dan karakter khusus)
                  </li>
                </ul>
              </li>
              <li>
                Klik tombol{" "}
                <span className="font-semibold text-purple-400">Buat akun</span>{" "}
                untuk menyelesaikan pendaftaran.
              </li>
            </ol>
            <p className="text-gray-300 mb-2">Metode Pendaftaran Alternatif:</p>
            <ol className="list-decimal list-inside text-gray-300 mb-4 space-y-2">
              <li>
                Klik tombol{" "}
                <span className="font-semibold text-purple-400">
                  Lanjutkan dengan Google
                </span>
                .
              </li>
              <li>Pilih akun Google yang ingin Anda gunakan.</li>
              <li>
                Ikuti langkah-langkah yang diminta untuk menyelesaikan
                pendaftaran.
              </li>
            </ol>
          </section>

          <section id="masuk-akun" className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">
              Masuk ke Akun Anda
            </h2>
            <p className="text-gray-300 mb-4">
              Akses akun KriptoLab Anda dan mulai simulasi trading.
            </p>
            <ol className="list-decimal list-inside text-gray-300 mb-4 space-y-2">
              <li>
                Klik tombol{" "}
                <span className="font-semibold text-purple-400">Masuk</span> di
                pojok kanan atas.
              </li>
              <li>Masukkan email dan kata sandi yang terdaftar.</li>
              <li>
                Klik tombol{" "}
                <span className="font-semibold text-purple-400">Masuk</span>{" "}
                untuk mengakses akun Anda.
              </li>
            </ol>
          </section>

          <section id="memahami-pasar" className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">
              Memahami Pasar
            </h2>
            {/* Konten Memahami Pasar */}
            <p className="text-gray-300">
              Deskripsi tentang bagaimana memahami dinamika pasar kripto.
            </p>
          </section>

          <section id="panduan-trading" className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">
              Panduan Trading
            </h2>
            {/* Konten Panduan Trading */}
            <p className="text-gray-300">
              Penjelasan langkah-langkah untuk melakukan trading di platform.
            </p>
          </section>

          <section id="mengelola-portofolio" className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">
              Mengelola Portofolio Anda
            </h2>
            {/* Konten Mengelola Portofolio Anda */}
            <p className="text-gray-300">
              Cara melihat dan mengelola aset dalam portofolio simulasi.
            </p>
          </section>

          <section id="memantau-transaksi" className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">
              Memantau Transaksi Anda
            </h2>
            {/* Konten Memantau Transaksi Anda */}
            <p className="text-gray-300">
              Informasi tentang cara memeriksa riwayat transaksi.
            </p>
          </section>

          <section id="kustomisasi-profil" className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">
              Kustomisasi Profil Anda
            </h2>
            {/* Konten Kustomisasi Profil Anda */}
            <p className="text-gray-300">
              Petunjuk untuk mengubah pengaturan profil.
            </p>
          </section>

          <section id="pengaturan-akun" className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">
              Pengaturan Akun
            </h2>
            {/* Konten Pengaturan Akun */}
            <p className="text-gray-300">
              Detail tentang pengaturan akun dan keamanan.
            </p>
          </section>

          {/* Anda bisa menambahkan lebih banyak konten tutorial di sini */}
        </article>
      </div>
      <Footer />
    </main>
  );
}
