import type { Metadata } from "next";
import { Inter, Raleway, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

const raleway = Raleway({
  weight: ["400", "500", "600"], // Regular для подзаголовков
  subsets: ["latin", "cyrillic"],
  variable: "--font-raleway",
  display: "swap",
});

const playfair = Playfair_Display({
  weight: ["900"], // Black для МАРЬЯМ
  subsets: ["latin", "cyrillic"],
  variable: "--font-playfair",
  display: "swap",
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
    <html lang="ru">
      <body className={`${inter.variable} ${raleway.variable} ${playfair.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}