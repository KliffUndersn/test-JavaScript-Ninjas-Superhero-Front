import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAll, createNew } from "../../shared/services/superheroes";
import Notiflix from "notiflix";

const loadPage = createAsyncThunk(
  "superheroes/loadPage",
  async (credentials, thunkAPI) => {
    console.log(credentials.page)
    try {
      const data = await getAll(credentials.page);
      return data;
    } catch (err) {
      Notiflix.Notify.failure(err.response.data.message);
      return thunkAPI.rejectWithValue(err);
    }
  }
);
const createHero = createAsyncThunk(
  "superheroes/create",
  async (credentials, { rejectWithValue }) => {
    console.log(credentials)
    try {
      const { data } = await createNew(credentials);
      Notiflix.Notify.success("Hero created");
      return data;
    } catch (err) {
      Notiflix.Notify.failure(err.response.data.message);
      return rejectWithValue(err);
    }
  }
);

const authOperations = {
  loadPage,
  createHero
};
export default authOperations;
