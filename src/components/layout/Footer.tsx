// src/components/layout/Footer.tsx
import Image from "next/image";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 py-12 px-6 border-t border-gray-700 relative">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
        {/* Kolom Logo/Copyright */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4">
          <Image
            src="/github-icon.svg"
            alt="Github Icon"
            className="text-white"
            width={32}
            height={32}
          />
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} Simulacoin.
          </p>
          <p className="text-gray-400">All rights reserved.</p>
        </div>

        {/* Kolom Jelajahi */}
        <div>
          <h3 className="font-semibold text-white mb-4">Jelajahi</h3>
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="text-gray-400 hover:text-purple-400 transition-colors"
              >
                Market
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-400 hover:text-purple-400 transition-colors"
              >
                Bitcoin
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-400 hover:text-purple-400 transition-colors"
              >
                Ethereum
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-400 hover:text-purple-400 transition-colors"
              >
                Solana
              </a>
            </li>
          </ul>
        </div>

        {/* Kolom Sumber Daya */}
        <div>
          <h3 className="font-semibold text-white mb-4">Sumber Daya</h3>
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="text-gray-400 hover:text-purple-400 transition-colors"
              >
                Tutorial
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-400 hover:text-purple-400 transition-colors"
              >
                Berita
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-400 hover:text-purple-400 transition-colors"
              >
                Tentang Kami
              </a>
            </li>
          </ul>
        </div>

        {/* Kolom Butuh Bantuan? */}
        <div>
          <h3 className="font-semibold text-white mb-4">Butuh Bantuan?</h3>
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="text-gray-400 hover:text-purple-400 transition-colors"
              >
                Pusat Bantuan
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-400 hover:text-purple-400 transition-colors"
              >
                Hubungi Kami
              </a>
            </li>
          </ul>
        </div>
      </div>
      {/* Posisi tombol support "Support ©" */}
      <div className="absolute bottom-4 right-6 text-gray-500 text-sm">
        Support ©
      </div>
    </footer>
  );
}
