import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import { CartProvider } from "./contexts/CartContext";
import { Manrope } from "next/font/google";
import Footer from "./components/footer";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mayomi - Premium Massage & Wellness",
  description: "Experience ultimate relaxation with our premium massage and wellness services",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${manrope.className} antialiased`}
      >
        <CartProvider>
          <Navbar />
          <Cart />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
