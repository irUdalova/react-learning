import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { formReducer } from './redusers/formSlice';
import { mainReducer } from './redusers/mainSlice';
import { movieReducer } from './redusers/movieSlice';
import { searchReducer } from './redusers/searchSlice';

const appReducer = combineReducers({
  mainReducer,
  searchReducer,
  movieReducer,
  formReducer,
});

export function setupStore() {
  return configureStore({
    reducer: appReducer,
  });
}

export type TAppReducer = ReturnType<typeof appReducer>;
export type TAppStore = ReturnType<typeof setupStore>;
export type TAppDispatch = TAppStore['dispatch'];
