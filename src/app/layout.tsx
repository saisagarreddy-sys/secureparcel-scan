import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SecureParcel Scan",
  description: "Simple handwritten parcel verification for small sellers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
