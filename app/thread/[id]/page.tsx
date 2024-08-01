"use client";

import Cascade from "@/app/components/thread/cascade";
import ComposeReply from "@/app/components/thread/compose-reply";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Link from "next/link";

export default function Thread() {
  const queryClient = new QueryClient();

  return (
    <main className="flex min-h-screen flex-col items-center justify-start bg-gradient-to-b from-blue-200 to-blue-50 to-10% text-black">    
      <div className="w-full flex flex-col items-center justify-start gap-12 px-4 pb-16 pt-2">
        <nav className="w-full text-xs">
          <span>[<Link href="/" className="text-slate-600 hover:text-slate-400">Home</Link>]</span>
        </nav>
        <h1 className="text-5xl font-extrabold text-blue-500 tracking-tight sm:text-[2rem]">
          /b/ - 4Bran
        </h1>
        <ComposeReply />
        <QueryClientProvider client={queryClient}>
          <Cascade />
        </QueryClientProvider>
      </div>
    </main>
  )
}