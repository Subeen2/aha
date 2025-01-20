// RootLayout.tsx (서버 컴포넌트로 변경)

import { Inter } from "next/font/google";
import Head from "next/head";
import "./globals.css";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import StoreProvider from "./StoreProvider";
import QueryProvider from "./QueryProvider";
import ClientLayout from "./ClientLayout";

import TopBandBanner from "@/widgets/ui/TopBandBanner";
import Header from "@/widgets/ui/Header";
import Footer from "@/widgets/ui/Footer";

import type { Metadata, Viewport } from "next";
import GetUserProvider from "./GetUserProvider";
import { createClient } from "@/entities/lib/supabase/client";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AHA",
  description: "AHA, moment",
};

export const viewport: Viewport = {
  initialScale: 1,
  width: "device-width",
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          http-equiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        ></meta>
      </Head>
      <body className={inter.className}>
        {/* 최상위 Provider 순서 */}
        <StoreProvider>
          <AppRouterCacheProvider>
            <QueryProvider>
              <GetUserProvider accessToken={session?.access_token}>
                <ClientLayout>
                  <TopBandBanner title={"오늘의 추천 키워드"} isRandom={true} />
                  <Header />
                  {children}
                  <Footer />
                </ClientLayout>
              </GetUserProvider>
            </QueryProvider>
          </AppRouterCacheProvider>
        </StoreProvider>
      </body>
    </html>
  );
};

export default RootLayout;
