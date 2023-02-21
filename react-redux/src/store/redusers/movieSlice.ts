import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMoviePage, MovieTypeFull } from 'types';

const initialState: IMoviePage = {
  movieData: {
    id: 0,
    title: '',
    genres: [],
    posterPath: '',
    releaseDate: '',
    tagline: '',
    runtime: '',
    overview: '',
    vote: 0,
  },
  isError: false,
  isLoading: false,
  isLoaded: false,
};

export const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    loadMovieData(state, action: PayloadAction<MovieTypeFull>) {
      state.movieData = action.payload;
      state.isLoading = false;
      state.isError = false;
      state.isLoaded = true;
    },
    loading(state) {
      state.isError = false;
      state.isLoading = true;
    },
    error(state) {
      state.isError = true;
      state.isLoading = false;
    },
    clearMovieData(state) {
      state.movieData = initialState.movieData;
    },
  },
});

export const movieReducer = movieSlice.reducer;
export const { loadMovieData, loading, error, clearMovieData } = movieSlice.actions;
