import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { formReducer } from './redusers/formSlice';
import { mainReducer } from './redusers/mainSlice';
import { movieReducer } from './redusers/movieSlice';
import { searchReducer } from './redusers/searchSlice';
import createSagaMiddleware from '@redux-saga/core';
import { rootWatcher } from './saga';

const sagaMidleware = createSagaMiddleware();

const appReducer = combineReducers({
  mainReducer,
  searchReducer,
  movieReducer,
  formReducer,
});

export function setupStore() {
  return configureStore({
    reducer: appReducer,
    middleware: [sagaMidleware],
  });
}

export const store = setupStore();
sagaMidleware.run(rootWatcher);

export type TAppReducer = ReturnType<typeof appReducer>;
export type TAppStore = ReturnType<typeof setupStore>;
export type TAppDispatch = TAppStore['dispatch'];
