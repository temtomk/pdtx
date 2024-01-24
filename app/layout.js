import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "PDTX (NO PDT)",
  description: "We don't want PDT",
  keywords: "Finschia, Klaytn, PDTX, NO PDT, PDT, disagree",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
