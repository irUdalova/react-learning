import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMainPage, TPayloadQueryParamChange } from 'types';

const initialState: IMainPage = {
  movies: [],
  sort: 'PopularityDesc',
  pagination: {
    currentPage: 1,
    itemsPerPage: 20,
  },
};

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    queryParamChange(state, action: PayloadAction<TPayloadQueryParamChange>) {
      state.sort = action.payload.sortValue || initialState.sort;
      state.pagination.currentPage =
        action.payload.currentPage || initialState.pagination.currentPage;
      state.pagination.itemsPerPage =
        action.payload.itemsPerPage || initialState.pagination.itemsPerPage;
    },
  },
});

export const mainReducer = mainSlice.reducer;
