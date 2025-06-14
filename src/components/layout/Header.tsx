// src/components/layout/Header.tsx
"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import HelpModal from "../modal/HelpModal";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false); // State for the HelpModal
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const user = {
    initial: "K",
    balance: "Rp.0",
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setIsProfileMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    console.log("Melakukan logout...");
    setIsLoggedIn(false);
    setIsProfileMenuOpen(false);
    router.push("/auth/login");
  };

  const handleOpenHelpModal = () => {
    setIsHelpModalOpen(true);
  };

  const handleCloseHelpModal = () => {
    setIsHelpModalOpen(false);
  };

  return (
    <header className="bg-gray-800 p-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo dan Navigasi Utama */}
        <div className="flex items-center space-x-8">
          <Link
            href="/"
            className="flex items-center text-white text-2xl font-bold"
          >
            <Image
              src="/kriptolab-logo.png"
              alt="KriptoLab Logo"
              width={32}
              height={32}
            />
            KriptoLab
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link
              href="/market"
              className="text-gray-300 hover:text-white transition-colors text-lg"
            >
              Market
            </Link>
            <Link
              href="/tutorial"
              className="text-gray-300 hover:text-white transition-colors text-lg"
            >
              Tutorial
            </Link>
            {/* Changed Link to a button/div to open the modal */}
            <button
              onClick={handleOpenHelpModal}
              className="text-gray-300 hover:text-white transition-colors text-lg bg-transparent border-none cursor-pointer p-0" // Add styles to make it look like a link
            >
              Bantuan
            </button>
          </nav>
        </div>

        {/* Search Bar */}
        <div className="relative flex-grow mx-8 max-w-md hidden md:block">
          <input
            type="text"
            placeholder="Search tokens"
            className="w-full bg-gray-700 text-white border border-gray-600 rounded-md py-2 px-4 pr-10 focus:outline-none focus:border-purple-500"
          />
          {/* Search Icon */}
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

        {/* Tombol Aksi Kanan (Login/Register atau Profil/Saldo) */}
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              {/* Bahasa (ID) */}
              <div className="flex items-center space-x-1 text-gray-300">
                <Image
                  src="/id-flag.png"
                  alt="ID Flag"
                  width={16}
                  height={16}
                />
                <span>ID</span>
              </div>
              {/* Saldo */}
              <div className="flex items-center space-x-1 text-gray-300">
                {/* Icon Dompet */}
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
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  ></path>
                </svg>
                <span>{user.balance}</span>
              </div>
              {/* Profil Dropdown */}
              <div className="relative" ref={profileMenuRef}>
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="w-9 h-9 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold cursor-pointer transition-colors hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  {user.initial}
                  {/* Dropdown Arrow Icon */}
                  <svg
                    className={`ml-1 w-4 h-4 transform transition-transform ${
                      isProfileMenuOpen ? "rotate-180" : "rotate-0"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </button>

                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-700 rounded-md shadow-lg py-1 z-10">
                    <Link
                      href="/profile"
                      className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-600"
                    >
                      {/* Icon Profil */}
                      <svg
                        className="mr-3 h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        ></path>
                      </svg>
                      Profil
                    </Link>
                    <Link
                      href="/portfolio"
                      className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-600"
                    >
                      {/* Icon Portofolio */}
                      <svg
                        className="mr-3 h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                        ></path>
                      </svg>
                      Portofolio
                    </Link>
                    <Link
                      href="/transactions"
                      className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-600"
                    >
                      {/* Icon Transaksi */}
                      <svg
                        className="mr-3 h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                        ></path>
                      </svg>
                      Transaksi
                    </Link>
                    <Link
                      href="/settings"
                      className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-600"
                    >
                      {/* Icon Pengaturan Akun */}
                      <svg
                        className="mr-3 h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.827 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.827 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.827-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.827-3.31 2.37-2.37.58.354 1.187.618 1.776.712a2.476 2.476 0 002.572-1.065z"
                        ></path>
                      </svg>
                      Pengaturan Akun
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-600"
                    >
                      {/* Icon Logout */}
                      <svg
                        className="mr-3 h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        ></path>
                      </svg>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              {/* Tombol Masuk/Daftar jika belum login */}
              <Link
                href="/auth/login"
                className="px-4 py-2 rounded-md border border-purple-600 text-purple-400 hover:bg-purple-600 hover:text-white transition-colors"
              >
                Masuk
              </Link>
              <Link
                href="/auth/register"
                className="px-4 py-2 rounded-md bg-purple-600 text-white hover:bg-purple-700 transition-colors"
              >
                Daftar
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Render the HelpModal */}
      <HelpModal isOpen={isHelpModalOpen} onClose={handleCloseHelpModal} />
    </header>
  );
}
