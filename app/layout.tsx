import "./globals.css";
import type { Metadata } from "next";
import Navbar from "../components/Navbar"; // <-- adjust to your actual filename

export const metadata: Metadata = {
  title: "For Natalia 💗",
  description: "Valentine website",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
