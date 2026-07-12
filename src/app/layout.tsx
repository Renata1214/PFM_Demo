import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wio Autopilot — Demo",
  description: "A personal finance system that acts, not just reports.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0c12",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        <div className="mx-auto flex min-h-screen w-full max-w-md flex-col bg-surface md:my-6 md:min-h-[calc(100vh-3rem)] md:rounded-[2rem] md:border md:border-border-subtle md:shadow-2xl">
          {children}
        </div>
      </body>
    </html>
  );
}
