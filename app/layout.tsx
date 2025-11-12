import type { Metadata } from "next";
import "./globals.css";
import { Inter, Oswald } from "next/font/google";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-body" });
const oswald = Oswald({ subsets: ["latin"], display: "swap", variable: "--font-display" });

export const metadata: Metadata = {
  title: "Ronaldo & Fenrir | Asgardian Sprint",
  description:
    "AI art concept: Cristiano Ronaldo in Loki-inspired armor charging across a frozen Norse wasteland with Fenrir bound by ethereal chains.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${oswald.variable}`}>
      <body className="font-body bg-slate-950 text-slate-100 min-h-screen">
        {children}
      </body>
    </html>
  );
}
