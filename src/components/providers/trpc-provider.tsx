// src/components/providers/trpc-provider.tsx
"use client";

import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { trpc } from "@/server/client";

import superjson from "superjson";
import { AppRouter } from "@/server";

export const TRPCProvider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());

  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink<AppRouter>({
          url: "/api/trpc",
          transformer: superjson,
          // Ini bagian penting untuk JWT:
          headers() {
            // Ambil token dari localStorage (atau dari context/state manajemen Anda)
            const token = localStorage.getItem("jwt_token"); // Nama key yang Anda simpan
            return {
              authorization: token ? `Bearer ${token}` : "",
            };
          },
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
};
