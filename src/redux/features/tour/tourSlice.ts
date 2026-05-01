import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createTour,
  deleteTour,
  getAllTours,
  getTourById,
  updateTour,
} from "./tourThunk";
import { Tour, TourState } from "./tourType";

/* ---------------- INITIAL STATE ---------------- */

const initialState: TourState = {
  tours: [],
  selectedTour: null,
  loading: false,
  error: null,
};

/* ---------------- SLICE ---------------- */

const tourSlice = createSlice({
  name: "tour",
  initialState,
  reducers: {
    clearTourError: (state) => {
      state.error = null;
    },

    clearSelectedTour: (state) => {
      state.selectedTour = null;
    },
  },

  extraReducers: (builder) => {
    builder

      /* ---------------- GET ALL TOURS ---------------- */
      .addCase(getAllTours.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllTours.fulfilled,
        (state, action: PayloadAction<{ tours: Tour[] }>) => {
          state.loading = false;
          state.tours = action.payload.tours;
        }
      )
      .addCase(getAllTours.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      /* ---------------- GET SINGLE TOUR ---------------- */
      .addCase(getTourById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getTourById.fulfilled,
        (state, action: PayloadAction<{ tour: Tour }>) => {
          state.loading = false;
          state.selectedTour = action.payload.tour;
        }
      )
      .addCase(getTourById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      /* ---------------- CREATE TOUR ---------------- */
      .addCase(createTour.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTour.fulfilled, (state, action) => {
        state.loading = false;
        state.tours.unshift(action.payload.tour);
      })
      .addCase(createTour.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      /* ---------------- UPDATE TOUR ---------------- */
      .addCase(updateTour.fulfilled, (state, action) => {
        const updatedTour = action.payload.tour;

        state.tours = state.tours.map((tour) =>
          tour._id === updatedTour._id ? updatedTour : tour
        );

        state.selectedTour = updatedTour;
      })

      /* ---------------- DELETE TOUR ---------------- */
      .addCase(deleteTour.fulfilled, (state, action) => {
        const id = action.meta.arg;

        state.tours = state.tours.filter((tour) => tour._id !== id);

        if (state.selectedTour?._id === id) {
          state.selectedTour = null;
        }
      });
  },
});

/* ---------------- EXPORTS ---------------- */

export const { clearTourError, clearSelectedTour } = tourSlice.actions;
export default tourSlice.reducer;