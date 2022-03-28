import { createSlice } from "@reduxjs/toolkit";
import superheroesOperations from "./superheroes-operations";

const initialState = {}

export const heroSlice = createSlice({
  name: "superheroes",
  initialState,
  extraReducers: {
    [superheroesOperations.loadPage.fulfilled](state, { payload }) {
      state.hero = payload.data.data;
    },
    [superheroesOperations.loadPage.rejected](state, { payload }) {
      state.error = payload;
    },
    [superheroesOperations.getHero.fulfilled](state, { payload }) {
      state.oneHero = payload.data.data;
    },
    [superheroesOperations.getHero.rejected](state, { payload }) {
      state.error = payload;
    },
    [superheroesOperations.editHero.fulfilled](state, { payload }) {
      state.oneHero = payload.data.data;
    },
    [superheroesOperations.editHero.rejected](state, { payload }) {
      state.error = payload;
    },
  },
});

export default heroSlice.reducer;
