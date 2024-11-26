"use client";

import TopButton from "@/components/button/TopButton";
import React from "react";
import { Provider } from "react-redux";
import { makeStore } from "./lib/store";
import { wrapper } from "./lib/store";

const store = makeStore(); // makeStore 함수를 호출하여 스토어 객체를 생성합니다.

const ClientLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <Provider store={store}>
      {/** Provider는 store prop에 Redux 스토어 객체를 직접 받아야 합니다. 현재 코드에서는 makeStore 함수를 직접 전달하고 있기 때문에 문제가 발생하고 있습니다.

makeStore 함수는 스토어를 생성하는 함수이므로, Provider에 스토어 객체를 전달해야 합니다. 이 객체를 생성하려면 makeStore()를 호출해야 합니다.  */}{" "}
      {/* store 객체를 Provider에 전달합니다. */}
      <main>{children}</main>
      <TopButton />
    </Provider>
  );
};

export default ClientLayout;
