import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISearchPage, TPayloadSearchParamChange } from 'types';

const initialState: ISearchPage = {
  search: '',
  movies: [],
  pagination: {
    currentPage: 1,
    itemsPerPage: 20,
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
  },
});

export const searchReducer = searchSlice.reducer;
