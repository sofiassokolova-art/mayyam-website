import type { Metadata } from "next";
import { Inter, Raleway } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

const raleway = Raleway({
  weight: ["900"], // Heavy
  subsets: ["latin", "cyrillic"],
  variable: "--font-raleway",
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
      <body className={`${inter.variable} ${raleway.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}