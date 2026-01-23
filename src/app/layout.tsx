import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Chatbot from "@/components/Chat/Chatbot"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Saree Pasal",
  description: "Saree Pasal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}<Chatbot /></body>
    </html>
  );
}
