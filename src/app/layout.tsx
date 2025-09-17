import type { Metadata } from "next";
import { Inter, Playfair_Display, Great_Vibes } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "600", "700", "800", "900"],
  style: ["italic", "normal"],
});

const vibes = Great_Vibes({
  subsets: ["latin"],
  variable: "--font-vibes",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "МАРЬЯМ - Продюсер роста продаж",
  description: "Запуски, воронки, маркетинг и рост выручки под ключ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={vibes.variable}>
      <body className={`${inter.variable} ${playfair.variable} ${vibes.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}