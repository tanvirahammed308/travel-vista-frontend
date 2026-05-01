import api from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import {
  CreateTourInput,
  CreateTourResponse,
  DeleteTourResponse,
  GetTourResponse,
  GetToursResponse,
  UpdateTourInput,
  UpdateTourResponse,
} from "./tourType";

/* ---------------- ERROR HANDLER ---------------- */

const getErrorMessage = (error: unknown) => {
  const err = error as AxiosError<{ message: string }>;
  return err.response?.data?.message || "Something went wrong";
};

/* ---------------- CREATE TOUR ---------------- */

export const createTour = createAsyncThunk<
  CreateTourResponse,
  CreateTourInput,
  { rejectValue: string }
>("tour/createTour", async (data, { rejectWithValue }) => {
  try {
    const res = await api.post<CreateTourResponse>(
      "/api/tours",
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return res.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

/* ---------------- GET ALL TOURS ---------------- */

export const getAllTours = createAsyncThunk<
  GetToursResponse,
  void,
  { rejectValue: string }
>("tour/getAllTours", async (_, { rejectWithValue }) => {
  try {
    const res = await api.get<GetToursResponse>("/api/tours");
    return res.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

/* ---------------- GET SINGLE TOUR ---------------- */

export const getTourById = createAsyncThunk<
  GetTourResponse,
  string,
  { rejectValue: string }
>("tour/getTourById", async (id, { rejectWithValue }) => {
  try {
    const res = await api.get<GetTourResponse>(`/api/tours/${id}`);
    return res.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

/* ---------------- UPDATE TOUR ---------------- */

export const updateTour = createAsyncThunk<
  UpdateTourResponse,
  { id: string; data: FormData },
  { rejectValue: string }
>("tour/updateTour", async ({ id, data }, { rejectWithValue }) => {
  try {
    const res = await api.put<UpdateTourResponse>(
      `/api/tours/${id}`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );

    return res.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

/* ---------------- DELETE TOUR ---------------- */

export const deleteTour = createAsyncThunk<
  DeleteTourResponse,
  string,
  { rejectValue: string }
>("tour/deleteTour", async (id, { rejectWithValue }) => {
  try {
    const res = await api.delete<DeleteTourResponse>(`/api/tours/${id}`);
    return res.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});