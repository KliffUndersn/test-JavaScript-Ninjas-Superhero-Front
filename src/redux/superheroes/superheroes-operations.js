import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAll, createNew, getById } from "../../shared/services/superheroes";
import Notiflix from "notiflix";

const loadPage = createAsyncThunk(
  "superheroes/loadPage",
  async (credentials, thunkAPI) => {
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
const getHero = createAsyncThunk(
  "superheroes/getHero",
  async (credentials, thunkAPI) => {
    try {
      const data = await getById(credentials._id);
      return data;
    } catch (err) {
      Notiflix.Notify.failure(err.response.data.message);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

const authOperations = {
  loadPage,
  createHero,
  getHero,
};
export default authOperations;
