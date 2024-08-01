"use client";
import Draft from "./components/draft";
import Catalog from "./components/catalog";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function Home() {
  const queryClient = new QueryClient();

  return (
    <main className="flex min-h-screen flex-col items-center justify-start bg-gradient-to-b from-blue-200 to-blue-50 to-10% text-black">    
      <div className="w-full flex flex-col items-center justify-start gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold text-blue-500 tracking-tight sm:text-[3rem]">
          /b/ - 4Bran
        </h1>
        <Draft />
        <QueryClientProvider client={queryClient}>
          <Catalog />
        </QueryClientProvider>
      </div>
    </main>
  );
}
