import "./globals.css";
import type { Metadata } from "next";
import MusicPlayer from "../components/MusicPlayer";

export const metadata: Metadata = {
  title: "For Natalia 💗",
  description: "Valentine website",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <MusicPlayer />
        {children}
      </body>
    </html>
  );
}
