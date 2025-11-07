import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TAITAI-TECH | 学生主導のテックコンサルティング集団",
  description:
    "TAITAI-TECHは学生メンバーによるテックスタジオ。生成AI、画像処理、ノーコード、ロボティクスまで幅広く伴走します。",
  openGraph: {
    title: "TAITAI-TECH",
    description:
      "学生主導のマルチディシプリナリーチームが課題解決から開発までを支援します。",
    type: "website",
  },
  metadataBase: new URL("https://taitai-tech.example"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-[--color-background] text-[--color-foreground] antialiased`}
      >
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
