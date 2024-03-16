import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../public/css/globals.css";

export const metadata = {
  title: 'The Biggest Loser',
  description: 'The Biggest Loser Web App',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
