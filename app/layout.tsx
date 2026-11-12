import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Avion | Luxury Homeware & Furniture",
  description: "Shop timeless homeware, ceramics, furniture and plant pots. Full-stack store with authentication, cart, wishlist and payments.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
