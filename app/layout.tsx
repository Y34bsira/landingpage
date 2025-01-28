import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./login/login.css"; // Added import for login page styles

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gymers - Modern Gym Management Software",
  description: "Transform your gym's operations with our three-tier software package. Streamline member management, automate billing, and enhance member experience.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
