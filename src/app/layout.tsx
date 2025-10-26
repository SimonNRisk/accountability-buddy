import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  metadataBase: new URL("https://your-domain.com"), // Replace with your actual domain
  title: "Accountability Buddy",
  description: "Simon's daily habit tracker - stay productive and accountable!",
  icons: {
    icon: [
      { url: "/og-image.jpg", sizes: "32x32", type: "image/jpeg" },
      { url: "/og-image.jpg", sizes: "16x16", type: "image/jpeg" },
    ],
    shortcut: "/og-image.jpg",
    apple: "/og-image.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
    </html>
  );
}
