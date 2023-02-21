import { PayloadAction } from '@reduxjs/toolkit';
import { getMovie, TGetMovie } from 'api/movie';
import { call, put, takeEvery } from 'redux-saga/effects';
import { error, loadMovieData } from 'store/redusers/movieSlice';
import { MovieTypeFull } from 'types';
import { LOAD_MOVIE_DATA } from './constants';

export const loadMovieDataSaga = (payload: TGetMovie) => ({
  type: LOAD_MOVIE_DATA,
  payload,
});

function* loadMovieDataWorker(action: PayloadAction<TGetMovie>) {
  try {
    const data: MovieTypeFull = yield call(getMovie, action.payload);
    yield put(loadMovieData(data));
  } catch {
    yield put(error());
  }
}

export function* movieSagaWatcher() {
  yield takeEvery(LOAD_MOVIE_DATA, loadMovieDataWorker);
}
