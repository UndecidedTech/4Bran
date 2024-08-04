"use client";
import Catalog from "./components/catalog";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ComposePost from "./components/home/compose-post";
import GoogleCaptchaWrapper from "./components/google-recaptcha";

export default function Home() {
  const queryClient = new QueryClient();
  
  console.log(`         \/ \\\r\n        |\\_\/|\r\n        |---|\r\n        |   |\r\n        |   |\r\n      _ |=-=| _\r\n  _  \/ \\|   |\/ \\\r\n \/ \\|   |   |   ||\\\r\n|   |   |   |   | \\>\r\n|   |   |   |   |   \\\r\n| -   -   -   - |)   )\r\n|                   \/\r\n \\                 \/\r\n  \\               \/\r\n   \\             \/\r\n    \\           \/`)

  return (
    <main className="flex min-h-screen flex-col items-center justify-start bg-gradient-to-b from-blue-200 to-blue-50 to-10% text-black">    
      <div className="w-full flex flex-col items-center justify-start gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold text-rose-500 tracking-tight sm:text-[2rem]">
          /b/ - Random
        </h1>
        <GoogleCaptchaWrapper>
          <ComposePost />
          <QueryClientProvider client={queryClient}>
            <Catalog />
          </QueryClientProvider>
        </GoogleCaptchaWrapper>
      </div>
    </main>
  );
}
