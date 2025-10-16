import type { Metadata } from "next";
import { Lexend, Inter } from "next/font/google";
import "./globals.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const lexend = Lexend({
  variable: "--lexend-font",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--inter-font",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Podcastr",
  description: "Developed by XZANATOL",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lexend.variable} ${inter.variable}`}>
        {children}
      </body>
    </html>
  );
}
