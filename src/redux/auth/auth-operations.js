import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  token,
  onSignUp,
  onLogIn,
  onLogOut,
  CheckedCurrentUser,
} from "../../shared/services/auth";
import { Notify } from "notiflix/build/notiflix-notify-aio";

const register = createAsyncThunk(
  "auth/register",
  async (credentials, { rejectWithValue }) => {
    try {
      const data = await onSignUp(credentials);
      token.set(data.accessToken);
      return data;
    } catch (error) {
      if (error.response.status === 409) {
        Notify.failure("Provided email already exists, try another");
      }
      Notify.failure(error.message);
      return rejectWithValue(error.message);
    }
  }
);

const logIn = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const data = await onLogIn(credentials);
      token.set(data.accessToken);
      return data;
    } catch (error) {
      if (error.response.status === 403) {
        Notify.failure("This email doesn't exist or password is wrong");
      }
      Notify.failure(error.message);
      return rejectWithValue(error);
    }
  }
);

const logOut = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await onLogOut();
      token.unset();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const CheckedIsLoginCurrentUser = createAsyncThunk(
  "auth/checked",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;
    if (persistedToken === null) {
      return thunkAPI.rejectWithValue();
    }
    token.set(persistedToken);
    try {
      const data = await CheckedCurrentUser(persistedToken);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

const authOperations = {
  register,
  logIn,
  logOut,
  CheckedIsLoginCurrentUser,
};
export default authOperations;
