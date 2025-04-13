import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Space_Mono } from "next/font/google";
import "./globals.css";
import "toastify-js/src/toastify.css"
import Navigation from "@/src/components/Navigation";
import Script from "next/script";
import { WhatsAppFloat } from "../src/components/WhatsAppFloat";
import Footer from "@/src/components/Footer";
import AOS_Init from "@/src/components/AOS_Init";
import { CookieConsentComponent } from "@/src/components/CookieConsentComponent";
import { GoogleAnalytics } from "@next/third-parties/google";


const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const spaceMono = Space_Mono({
  variable: '--font-space-mono',
  subsets: ['latin'],
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: "Tiken",
  description: 'Tiken é uma empresa que cria soluções para o mundo através da química',
  openGraph: {
    images: [
      {
        url: "/assets/images/ogimage.webp",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">


      <head>
        {/* Google Translate scripts */}
        <Script
          id="google-translate-init"
          src="/assets/scripts/translation.js"
          strategy="beforeInteractive"
        />
        <Script
          id="google-translate-api"
          src="//translate.google.com/translate_a/element.js?cb=TranslateInit"
          strategy="afterInteractive"
        />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${spaceMono.variable} antialiased !bg-white !text-black pt-[96px]`}
      >
        <WhatsAppFloat />
        <AOS_Init />
        <Navigation />
        {children}
        <Footer />
        <GoogleAnalytics gaId={"G-WRGXJHNQPF"} /> {/* GA do Inove */}
        <CookieConsentComponent />
      </body>
    </html>
  );
}
