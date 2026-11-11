import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";
import authReducer from "./userSlice";

const storage = {
  getItem: (key) => Promise.resolve(window.sessionStorage.getItem(key)),
  setItem: (key, value) => Promise.resolve(window.sessionStorage.setItem(key, value)),
  removeItem: (key) => Promise.resolve(window.sessionStorage.removeItem(key)),
};

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const rootReducer = combineReducers({
  auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/PAUSE",
          "persist/PURGE",
          "persist/REGISTER",
        ],
      },
    }),
});

export const persistor = persistStore(store);
