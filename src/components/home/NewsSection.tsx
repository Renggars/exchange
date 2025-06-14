import Image from "next/image";
import React from "react";

interface NewsArticle {
  id: number;
  imageSrc: string;
  title: string;
  source: string;
  date: string;
}

const newsArticles: NewsArticle[] = [
  {
    id: 1,
    imageSrc: "/bitcoin-news-placeholder-1.png",
    title:
      "Harga Bitcoin Hari Ini: Turun ke $104K Saat Konflik Israel-Iran Memicu Suasana Risk-Off",
    source: "Investing.com",
    date: "13 Juni 2025",
  },
  {
    id: 2,
    imageSrc: "/bitcoin-news-placeholder-2.png",
    title: "Kenapa Harga BTC Naik Meski Pasar Sepi? Ini Jawabannya",
    source: "Cryptokarian.com",
    date: "12 Juni 2025",
  },
  {
    id: 3,
    imageSrc: "/bitcoin-news-placeholder-3.png",
    title:
      "Trade Talk AS-China Bikin BTC Ngegas, DeFi dan Koin Meme Ikut Party",
    source: "Cryptokarian.com",
    date: "11 Juni 2025",
  },
];

export default function NewsSection() {
  return (
    <section className="container mx-auto py-16 px-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-200">Berita Terkini</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {newsArticles.map((article) => (
          <div
            key={article.id}
            className="bg-gray-800 rounded-lg shadow-lg overflow-hidden"
          >
            <Image
              src={article.imageSrc}
              alt={article.title}
              width={500}
              height={500}
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-white mb-2">
                {article.title}
              </h3>
              <p className="text-sm text-gray-400">
                {article.source} • {article.date}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
