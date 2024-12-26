import { createSlice } from "@reduxjs/toolkit";

// 유저의 로그인 상태와 로그인한 유저의 정보를 저장
const initialState = {
  isLoggedIn: false,
  userInfo: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.userInfo = action.payload;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.userInfo = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
