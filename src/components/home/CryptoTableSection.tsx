import React from "react";

export default function CryptoTableSection() {
  return (
    <section className="container mx-auto py-12 px-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-200">
        Data Pasar (Simulasi)
      </h2>
      <div className="overflow-x-auto bg-gray-800 rounded-lg shadow-lg">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-700">
            <tr>
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
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white flex items-center">
                <img
                  src="/bitcoin-icon.png"
                  alt="BTC"
                  className="w-5 h-5 mr-2"
                />{" "}
                Bitcoin
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                BTC/IDR
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                IDR 1,716,930,000
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                41.17B
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-red-400">
                -0.17%
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-green-400">
                +0.59%
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white flex items-center">
                <img src="/bnb-icon.png" alt="BNB" className="w-5 h-5 mr-2" />{" "}
                BNB
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                BNB/IDR
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                IDR 10,729,991
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                843.63M
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-red-400">
                -0.60%
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-green-400">
                +1.52%
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white flex items-center">
                <img
                  src="/ethereum-icon.png"
                  alt="ETH"
                  className="w-5 h-5 mr-2"
                />{" "}
                Ethereum
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                ETH/IDR
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                IDR 41,327,000
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                20.10B
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-green-400">
                +0.23%
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-green-400">
                +2.03%
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
