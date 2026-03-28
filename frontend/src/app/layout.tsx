import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "NewsChecker | Web3 AI Bias Check",
  description:
    "Identify bias and misinterpreted lines in news with decentralized community notes on Monad.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const now = new Date();
  const dateLabel = now.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <Providers>
          <div className="paper">
            <div className="top-strip flex items-center justify-between gap-3">
              <span>PRESS WIRE / LIVE DESK</span>
              <span>SYSTEM: MONOCHROME</span>
            </div>

            <header className="px-3 sm:px-4 lg:px-6 pt-3 pb-2">
              <div className="meta-row grid grid-cols-2 sm:grid-cols-4 gap-2 px-2 py-2">
                <span>DATE: {dateLabel}</span>
                <span>EDITION: DIGITAL</span>
                <span>LOCATION: GLOBAL DESK</span>
                <span>PRICE: $0.05</span>
              </div>

              <h1 className="mast-title">THE NEWSCHECKER TIMES</h1>
              <p className="mast-tagline">BIAS ANALYSIS • COMMUNITY NOTES • LIVE TYPESET</p>
              <hr className="mt-2 mb-0" />
            </header>

            <main className="w-full max-w-[1400px] mx-auto px-3 sm:px-4 lg:px-6 py-4">
              {children}
            </main>

            <footer className="status-bar flex items-center justify-between gap-3">
              <span>PRESS STATUS: RUNNING</span>
              <span className="opacity-75">TYPESETTING EDITION...</span>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
