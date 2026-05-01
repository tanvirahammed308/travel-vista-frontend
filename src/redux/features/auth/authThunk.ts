import api from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import {
  AuthState,
  DeleteUserResponse,
  GetUsersResponse,
  LoginInput,
  LoginResponse,
  LogoutResponse,
  ProfileResponse,
  RegisterInput,
  RegisterResponse,
  UpdateProfileInput,
  UpdateProfileResponse,
  User,
} from "./authType";

const getErrorMessage = (error: unknown) => {
  const err = error as AxiosError<{ message: string }>;
  return err.response?.data?.message || "Something went wrong";
};

// REGISTER

export const registerUser = createAsyncThunk<
  RegisterResponse,
  RegisterInput,
  { rejectValue: string }
>("auth/register", async (data, { rejectWithValue }) => {
  try {
    const res = await api.post<RegisterResponse>("/api/users/register", data);
    return res.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

// LOGIN
export const loginUser = createAsyncThunk<
  LoginResponse,
  LoginInput,
  { rejectValue: string }
>("auth/login", async (data, { rejectWithValue }) => {
  try {
    const res = await api.post<LoginResponse>("/api/users/login", data);
    return res.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});
// LOGOUT
export const logoutUser = createAsyncThunk<
  LogoutResponse,
  void,
  { rejectValue: string }
>("auth/logout", async (_, { rejectWithValue }) => {
  try {
    const res = await api.post<LogoutResponse>("/api/users/logout");
    return res.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

// GET ALL USERS (ADMIN)

export const getAllUsers = createAsyncThunk<
  GetUsersResponse,
  void,
  { rejectValue: string }
>("auth/getAllUsers", async (_, { rejectWithValue }) => {
  try {
    const res = await api.get<GetUsersResponse>("/api/users");
    return res.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

// GET PROFILE
export const getProfile = createAsyncThunk<
  ProfileResponse,
  void,
  { rejectValue: string }
>("auth/profile", async (_, { rejectWithValue }) => {
  try {
    const res = await api.get<ProfileResponse>("/api/users/profile");
    return res.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

// UPDATE PROFILE
export const updateProfile = createAsyncThunk<
  UpdateProfileResponse,
  UpdateProfileInput,
  { rejectValue: string }
>("auth/updateProfile", async (data, { rejectWithValue }) => {
  try {
    const res = await api.put<UpdateProfileResponse>("/auth/profile", data);

    return res.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

// DELETE USER

export const deleteUser = createAsyncThunk<
  DeleteUserResponse,
  string,
  { rejectValue: string }
>("auth/deleteUser", async (userId, { rejectWithValue }) => {
  try {
    const res = await api.delete<DeleteUserResponse>(`/api/users/${userId}`);
    return res.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

//update user role

export const updateUserRole = createAsyncThunk<
  { user: User; message: string },
  { id: string; role: string },
  { rejectValue: string }
>("auth/updateUserRole", async ({ id, role }, { rejectWithValue }) => {
  try {
    const res = await api.put(`/api/users/${id}/role`, { role });
    return res.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});
