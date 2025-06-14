// src/components/home/HeroSection.tsx
import React from "react";
import Link from "next/link"; // Import Link dari next/link
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative container mx-auto py-16 px-6 md:flex items-center justify-between">
      <div className="md:w-1/2 space-y-6 text-center md:text-left">
        <h2 className="text-4xl md:text-5xl font-bold leading-tight">
          Belajar Trading Kripto Praktis dan Aman.
        </h2>
        <p className="text-lg text-gray-300">
          Lingkungan simulasi yang dirancang khusus untuk pemula. Tanpa risiko
          kehilangan uang sungguhan. Anda dapat memahami pasar kripto dengan
          lebih mendalam dan profesional.
        </p>
        {/* Link untuk tombol Daftar Sekarang */}
        <Link href="/auth/register" passHref>
          <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full transition-colors mt-4">
            Daftar Sekarang
          </button>
        </Link>
      </div>
      <div className="md:w-1/2 flex justify-center md:justify-end mt-8 md:mt-0">
        <div className="relative w-full max-w-lg aspect-video bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <Image
            src="/placeholder-video.png"
            alt="Video Placeholder"
            className="w-full h-full object-cover"
            width={640}
            height={360}
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white">
            <span className="text-xl">Tonton di YouTube</span>
          </div>
        </div>
      </div>
    </section>
  );
}
