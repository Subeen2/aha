import Footer from "@/widgets/ui/Footer";
import Header from "@/widgets/ui/Header";
import TopBandBanner from "@/widgets/ui/TopBandBanner";

import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Head from "next/head";
import ClientLayout from "./ClientLayout";
import "./globals.css";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";

const inter = Inter({ subsets: ["latin"] }); // app/layout.js

export const metadata: Metadata = {
  title: "AHA",
  description: "AHA, moment",
};

export const viewport: Viewport = {
  initialScale: 1,
  width: "device-width",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  // TODO :: 일단 header, footer 여기에 두고 페이지 별로 헤더 푸터 유동적으로 사용해야 하는지 판단 후 구조 변경
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <body className={inter.className}>
        <AppRouterCacheProvider>
          <ClientLayout>
            <TopBandBanner
              title={"오늘의 추천 키워드"}
              contentArr={["MVVM 패턴", "Flex 패턴"]}
              isRandom={true}
            />
            <Header />
            {children}
          </ClientLayout>
          <Footer />
        </AppRouterCacheProvider>
      </body>
    </html>
  );
};

export default RootLayout;
