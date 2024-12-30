import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/features/users/userSlice";
import { createWrapper } from "next-redux-wrapper";

// reducer와 state를 연결해준다. 어떤 키에 어떤 리듀서가 사용되는지 연결
const store = () => {
  return configureStore({
    reducer: {
      user: userReducer,
    },
  });
};

export default store;
export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export const wrapper = createWrapper<AppStore>(store);
