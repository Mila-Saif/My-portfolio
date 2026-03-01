import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";


const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  
});

export const metadata: Metadata = {
  title: "My Portfolio",
  description: "A showcase of my projects and skills.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
    
      <body className={`${plusJakarta.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}