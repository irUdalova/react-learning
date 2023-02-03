import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getItemsAmountSort } from 'api/helpers';
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

export const fetchSortData = createAsyncThunk('main/fetchSortData', getItemsAmountSort);

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
  extraReducers: {
    [fetchSortData.pending.type]: (state) => {
      state.isError = false;
      state.isLoading = true;
    },
    [fetchSortData.fulfilled.type]: (state, action: PayloadAction<TPayloadLoadData>) => {
      state.isError = false;
      state.isLoading = false;
      state.isLoaded = true;
      state.movies = action.payload.results;
      state.totalResults = action.payload.totalResults;
      state.pagination.totalPages = action.payload.totalPages;
    },
    [fetchSortData.rejected.type]: (state) => {
      state.isError = true;
      state.isLoading = false;
    },
  },
});

export const mainReducer = mainSlice.reducer;
