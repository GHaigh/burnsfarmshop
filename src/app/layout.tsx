import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/contexts/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Burns Farm Shop - Campsite Groceries & Gifts",
  description: "Order groceries and gifts for delivery to your cabin or pitch at Burns Farm Caravan & Campsite, St Johns-in-the-Vale, Keswick, Cumbria",
  keywords: "campsite, groceries, gifts, delivery, Burns Farm, Lake District, Keswick, Cumbria, St Johns-in-the-Vale",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
                  <body className={`${inter.className} antialiased bg-gray-100`}>
        <CartProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
