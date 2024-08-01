import Draft from "./components/draft";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start bg-gradient-to-b from-blue-200 to-blue-50 to-10% text-black">    
      <div className="container flex flex-col items-center justify-start gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold text-blue-500 tracking-tight sm:text-[3rem]">
          /b/ - 4Bran
        </h1>
        <Draft />
      </div>
    </main>
  );
}
