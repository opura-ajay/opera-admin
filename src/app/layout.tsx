import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import Sidebar from "./frontend/components/layout/Sidebar";
import { ThemeProvider } from "./frontend/components/ui/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Opura Dashboard",
  description: "Generated Opura Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* <ThemeProvider
          attribute="class" // This tells next-themes to add the 'dark' class to the html element
          defaultTheme="system" // Default to system preference, or "light"/"dark"
          enableSystem // Allow switching to system theme
        > */}
          {children}
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
