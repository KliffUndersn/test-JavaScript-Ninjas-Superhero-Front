import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./auth/auth-slice";
// import summaries from "./calendar/summaries/summaries-slice";

const persistConfig = {
  key: "user",
  storage,
  whitelist: ["token"],
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(persistConfig, authReducer),
    // calendar: summaries,
    // notAllowedProducts: null,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
