import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMainPage, TPayloadLoadData, TPayloadQueryParamChange } from 'types';

const initialState: IMainPage = {
  movies: [],
  totalResults: 0,
  isError: false,
  isLoading: false,
  isLoaded: false,
  sort: 'PopularityDesc',
  pagination: {
    currentPage: 1,
    itemsPerPage: 20,
    totalPages: 500,
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
    loadSortData(state, action: PayloadAction<TPayloadLoadData>) {
      state.movies = action.payload.results;
      state.totalResults = action.payload.totalResults;
      state.pagination.totalPages = action.payload.totalPages;
      state.isLoading = false;
      state.isLoaded = true;
    },
    loading(state) {
      state.isError = false;
      state.isLoading = true;
    },
    error(state) {
      state.isLoading = false;
      state.isError = true;
    },
  },
});

export const mainReducer = mainSlice.reducer;
export const { queryParamChange, loadSortData, loading, error } = mainSlice.actions;
