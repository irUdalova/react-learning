import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getMovie } from 'api/movie';
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

export const fetchMovieData = createAsyncThunk('movie/fetchMovieData', getMovie);

export const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchMovieData.pending.type]: (state) => {
      state.isError = false;
      state.isLoading = true;
    },
    [fetchMovieData.fulfilled.type]: (state, action: PayloadAction<MovieTypeFull>) => {
      state.movieData = action.payload;
      state.isError = false;
      state.isLoading = false;
      state.isLoaded = true;
    },
    [fetchMovieData.rejected.type]: (state) => {
      state.isError = true;
      state.isLoading = false;
    },
  },
});

export const movieReducer = movieSlice.reducer;
