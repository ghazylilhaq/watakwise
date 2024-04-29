import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navigation/Navbar";
import Provide from "@/components/layout/Provide";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Watakwise",
  description: "Ketahui Pribadi-Mu",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SpeedInsights />
      <body className="min-h-screen flex justify-center lg:p-24 p-4 pt-16 ">
        <Provide>
          {" "}
          <Navbar />
          <div className=""> {children}</div>
        </Provide>
      </body>
    </html>
  );
}
