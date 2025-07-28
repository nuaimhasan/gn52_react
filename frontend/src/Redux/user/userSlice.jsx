import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  loggedUser: undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.token = action.payload.token;
      state.loggedUser = action.payload.data;
    },
    userLogout: (state) => {
      state.token = "";
      state.loggedUser = undefined;
      localStorage.removeItem("token");
    },
  },
});

export const { userLoggedIn, userLogout } = userSlice.actions;
export default userSlice.reducer;
