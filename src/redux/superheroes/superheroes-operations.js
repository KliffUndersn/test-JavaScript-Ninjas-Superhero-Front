import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAll, createNew, getById, updateById, removeById } from "../../shared/services/superheroes";
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
const editHero = createAsyncThunk(
  "superheroes/edit",
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await updateById(credentials);
      Notiflix.Notify.success("Hero edited");
      return data;
    } catch (err) {
      Notiflix.Notify.failure(err.response.data.message);
      return rejectWithValue(err);
    }
  }
);
const deleteHero = createAsyncThunk(
  "superheroes/deleteHero",
  async (credentials, thunkAPI) => {
    try {
      console.log(credentials._id)
      const data = await removeById(credentials._id);
      Notiflix.Notify.success("Hero deleted");
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
  editHero,
  deleteHero
};
export default authOperations;
