import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import { CartProvider } from "./contexts/CartContext";
import { Manrope } from "next/font/google";
import Footer from "./components/footer";
import Script from "next/script";

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
      <head>
        {/* Standard favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        {/* Apple Touch icons */}
        <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png" />
        {/* Android icons */}
        <link rel="icon" type="image/png" sizes="36x36" href="/android-icon-36x36.png" />
        <link rel="icon" type="image/png" sizes="48x48" href="/android-icon-48x48.png" />
        <link rel="icon" type="image/png" sizes="72x72" href="/android-icon-72x72.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/android-icon-96x96.png" />
        <link rel="icon" type="image/png" sizes="144x144" href="/android-icon-144x144.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/android-icon-192x192.png" />
        {/* Microsoft tiles */}
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
        <meta name="theme-color" content="#ffffff" />
        {/* Manifest for PWA support */}
        <link rel="manifest" href="/manifest.json" />
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-PGCE021LNS"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-PGCE021LNS');
          `}
        </Script>
      </head>
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
