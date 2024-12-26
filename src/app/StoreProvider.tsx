"use client";
import store, { AppStore } from "@/shared/model/redux/store";
import { useRef } from "react";
import { Provider } from "react-redux";

// Redux 스토어와 상호작용하는 모든 구성 요소(생성, 제공, 읽기 또는 쓰기)는 클라이언트 구성 요소여야 합니다.
// 스토어에 액세스하려면 React 컨텍스트가 필요하고 컨텍스트는 클라이언트 구성 요소에서만 사용할 수 있기 때문
// 따라서 next-redux-wrapper 같은 라이브러리 활용해야 함.

// app router에서는 서버와 클라이언트 컴포넌트 분리해서 관리 가능하기 때문에 next-redux-wrapper 필요하지 않음.

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = store();
    // 기본 형태의 액션 객체 전달 되어야 함. 더미 액션으로 초기화
    storeRef.current.dispatch({ type: "__INIT__" });
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
