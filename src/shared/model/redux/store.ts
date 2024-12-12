import { configureStore } from "@reduxjs/toolkit";

const store = () => {
  return configureStore({
    reducer: {},
  });
};

export default store;
export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
