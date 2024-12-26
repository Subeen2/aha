"use client";

import GoToTop from "@/widgets/ui/GoToTop";
import React from "react";
import StoreProvider from "./StoreProvider";
// import { Provider } from "react-redux";
// import { makeStore } from "./lib/store";
// import { wrapper } from "./lib/store";

// const store = makeStore(); // makeStore 함수를 호출하여 스토어 객체를 생성합니다.

const ClientLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <StoreProvider>
      <main>{children}</main>
      <GoToTop />
    </StoreProvider>
  );
};

export default ClientLayout;
