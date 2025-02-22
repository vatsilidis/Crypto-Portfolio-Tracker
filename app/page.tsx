import { ConnectWallet } from "@/components/connect-wallet";
import Portfolio from "@/components/portfolio";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-2 pb-20 gap-6 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <main className="container mx-auto h-full">
          <h1 className="text-4xl font-bold mb-8">Crypto Portfolio Tracker</h1>
          <ConnectWallet />
          <Portfolio />
        </main>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <div>
          <span>Created by</span>
        </div>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://www.linkedin.com/in/lamprosvatsilidis/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Lampros Vatsilidis
        </a>
      </footer>
    </div>
  );
}
