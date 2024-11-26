"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { AppStore, makeStore } from "./lib/store";

// Redux 스토어와 상호작용하는 모든 구성 요소(생성, 제공, 읽기 또는 쓰기)는 클라이언트 구성 요소여야 합니다.
// 스토어에 액세스하려면 React 컨텍스트가 필요하고 컨텍스트는 클라이언트 구성 요소에서만 사용할 수 있기 때문
// 따라서 next-redux-wrapper 같은 라이브러리 활용해야 함.

export default function StoreProvider({
  user,
  children,
}: {
  // TODO :: any 타입 변경하기
  user: any;
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();

    // TODO :: 디스패치 안 매개변수 고쳐야 함.
    storeRef.current.dispatch(() => {});
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
