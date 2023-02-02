import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISearchPage, TPayloadLoadData, TPayloadSearchParamChange } from 'types';

const initialState: ISearchPage = {
  search: '',
  movies: [],
  totalResults: 0,
  isError: false,
  isLoading: false,
  isLoaded: false,
  pagination: {
    currentPage: 1,
    itemsPerPage: 20,
    totalPages: 500,
  },
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    searchParamChange(state, action: PayloadAction<TPayloadSearchParamChange>) {
      state.search = action.payload.searchParams || initialState.search;
      state.pagination.currentPage =
        action.payload.currentPage || initialState.pagination.currentPage;
      state.pagination.itemsPerPage =
        action.payload.itemsPerPage || initialState.pagination.itemsPerPage;
    },
    loadSearchData(state, action: PayloadAction<TPayloadLoadData>) {
      state.movies = action.payload.results;
      state.totalResults = action.payload.totalResults;
      state.pagination.totalPages = action.payload.totalPages;
      state.isLoading = false;
    },
    loading(state) {
      state.isError = false;
      state.isLoading = true;
    },
    loaded(state) {
      state.isError = false;
      state.isLoading = false;
      state.isLoaded = true;
    },
    error(state) {
      state.isError = true;
    },
  },
});

export const searchReducer = searchSlice.reducer;
