
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Alpesh | Delicious Food Delivered",
  description:
    "Explore our menu, discover your favourites, and build your food order online.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
