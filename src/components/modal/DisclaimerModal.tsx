// src/components/DisclaimerModal.tsx
"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
// Impor komponen Dialog dari Shadcn UI
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DisclaimerModalProps {
  onAgree: () => void; // Fungsi yang dipanggil saat pengguna setuju
}

const DisclaimerModal: React.FC<DisclaimerModalProps> = ({ onAgree }) => {
  const [agreed, setAgreed] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAgreed(e.target.checked);
  };

  const handleContinue = () => {
    if (agreed) {
      setIsOpen(false); // Tutup modal
      onAgree(); // Panggil fungsi onAgree dari parent
    } else {
      // Anda bisa mengganti alert ini dengan Toast/Notification dari Shadcn UI jika Anda mau
      alert("Anda harus menyetujui disclaimer untuk melanjutkan.");
    }
  };

  return (
    // 'open' mengontrol apakah dialog terlihat. 'onOpenChange' untuk mengontrol perubahan status open/closed.
    // Kita set 'onOpenChange' agar dialog tidak bisa ditutup secara tidak sengaja (misal klik di luar).
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md bg-gray-800 text-white p-6 rounded-lg shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center text-white mb-2">
            Pemberitahuan Disclaimer
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-300 space-y-3">
            <p>
              CRYPTEX adalah platform simulasi perdagangan cryptocurrency yang
              dirancang hanya untuk tujuan edukasi.
            </p>
            <p>
              Data yang ditampilkan berasal dari API Indodax dan dimaksudkan
              untuk latihan dalam lingkungan tanpa risiko.
            </p>
            <p>
              Platform ini tidak memberikan saran keuangan atau menjamin akurasi
              untuk keputusan perdagangan di dunia nyata.
            </p>
            <p>Gunakan informasi ini atas kebijaksanaan Anda sendiri.</p>
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6 flex items-center">
          <input
            type="checkbox"
            id="disclaimer-agree"
            checked={agreed}
            onChange={handleCheckboxChange}
            className="form-checkbox h-4 w-4 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500"
          />
          <label
            htmlFor="disclaimer-agree"
            className="ml-2 text-sm text-gray-300"
          >
            Saya mengerti dan menyetujui disclaimer di atas.
          </label>
        </div>

        <DialogFooter className="mt-6">
          <Button
            onClick={handleContinue}
            disabled={!agreed} // Nonaktifkan tombol jika belum disetujui
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition duration-200"
          >
            Lanjutkan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DisclaimerModal;
