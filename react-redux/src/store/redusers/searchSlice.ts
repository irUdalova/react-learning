import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getItemsAmountSearch } from 'api/helpers';
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

export const fetchSearchData = createAsyncThunk('search/fetchSearchData', getItemsAmountSearch);

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
  },
  extraReducers: {
    [fetchSearchData.pending.type]: (state) => {
      state.isError = false;
      state.isLoading = true;
    },
    [fetchSearchData.fulfilled.type]: (state, action: PayloadAction<TPayloadLoadData>) => {
      state.isError = false;
      state.isLoading = false;
      state.isLoaded = true;
      state.movies = action.payload.results;
      state.totalResults = action.payload.totalResults;
      state.pagination.totalPages = action.payload.totalPages;
    },
    [fetchSearchData.rejected.type]: (state) => {
      state.isError = true;
      state.isLoading = false;
    },
  },
});

export const searchReducer = searchSlice.reducer;
