import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { mdbApi } from './mdbAPI/api';
import { formReducer } from './redusers/formSlice';
import { mainReducer } from './redusers/mainSlice';
import { searchReducer } from './redusers/searchSlice';

const appReducer = combineReducers({
  mainReducer,
  searchReducer,
  formReducer,
  [mdbApi.reducerPath]: mdbApi.reducer,
});

export function setupStore() {
  return configureStore({
    reducer: appReducer,
    middleware: (curryGetDefaultMiddleware) =>
      curryGetDefaultMiddleware().concat(mdbApi.middleware),
  });
}

export const store = setupStore();

export type TAppReducer = ReturnType<typeof appReducer>;
export type TAppStore = ReturnType<typeof setupStore>;
export type TAppDispatch = TAppStore['dispatch'];
