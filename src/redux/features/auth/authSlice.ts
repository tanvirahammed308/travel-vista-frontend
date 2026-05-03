import { createSlice } from "@reduxjs/toolkit";
import { AuthState, User } from "./authType";

import {
  registerUser,
  loginUser,
  logoutUser,
  getProfile,
  getAllUsers,
  updateProfile,
  deleteUser,
} from "./authThunk";

const initialState: AuthState = {
  user: null,
  users: [],
  loading: false, 
  error: null,
  isCheckingAuth: true,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      /* ---------------- REGISTER ---------------- */
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
       
        state.loading = false;

  
  state.user = null;
  state.isAuthenticated = false;
  state.isCheckingAuth = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || null;
      })

      /* ---------------- LOGIN ---------------- */
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        
        
       
         state.loading = false;
  state.isAuthenticated = true;
        state.user = action.payload.user;
          state.isCheckingAuth = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || null;
        state.isCheckingAuth = false;
      })

      /* ---------------- LOGOUT ---------------- */
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.users = [];
        state.isAuthenticated = false;
        state.isCheckingAuth = false;
      })

      /* ---------------- PROFILE ---------------- */
      .addCase(getProfile.pending, (state) => {
        state.isCheckingAuth = true;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
       /*  state.user = action.payload.user;
        state.isAuthenticated = true;
        state.isCheckingAuth = false; */
        state.user = action.payload.user || null;
state.isAuthenticated = !!action.payload.user; 
state.isCheckingAuth = false;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isCheckingAuth = false;
        state.error = action.payload || null;
      })

      /* ---------------- GET ALL USERS (FIXED) ---------------- */
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;

        // ✅ FIX: supports both API formats
        state.users = Array.isArray(action.payload)
          ? action.payload
          : action.payload.users || [];
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || null;
      })

      /* ---------------- UPDATE PROFILE ---------------- */
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })

      /* ---------------- DELETE USER (FIXED) ---------------- */
      .addCase(deleteUser.fulfilled, (state, action) => {
        const deletedId = action.meta.arg;

        state.users = state.users.filter(
          (user: User) => user.id !== deletedId
        );
      });
  },
});

export default authSlice.reducer;