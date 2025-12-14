import type { Metadata } from "next";
import { Ubuntu, Noto_Sans_SC } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/organisms/layout/footer";
import { TanstackProvider } from "@/lib/tanstack-provider";
import { siteConfig } from "@/config/site";
import { NextProgressBar } from "@/components/molecules/next-progress-bar";
import ScrollToTopButton from "@/components/molecules/scroll-to-top";
import { Header } from "@/components/organisms/layout";
import ScrollToBottomButtonContactLinks from "@/components/molecules/scroll-to-bottom-contact-liniks";

const ubuntu = Ubuntu({
  variable: "--font-ubuntu",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const notoSansSC = Noto_Sans_SC({
  variable: "--font-noto-sans-sc",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: siteConfig.siteTitle,
  description: siteConfig.siteDescription,
  keywords: siteConfig.keywords,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-cn">
      <body
        className={`${ubuntu.className} ${notoSansSC.className} antialiased`}
        suppressHydrationWarning
      >
        <NextProgressBar />
        <Header />
        <TanstackProvider>{children}</TanstackProvider>
        <Footer />
        <ScrollToTopButton />
        <ScrollToBottomButtonContactLinks />
      </body>
    </html>
  );
}
