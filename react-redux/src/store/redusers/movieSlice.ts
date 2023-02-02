import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMoviePage, TPayloadLoadMovieData } from 'types';

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
    loadMovieData(state, action: PayloadAction<TPayloadLoadMovieData>) {
      state.movieData = action.payload.movie;
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

export const movieReducer = movieSlice.reducer;
