import { all } from 'redux-saga/effects';
import { mainSagaWatcher } from './mainSaga';
import { movieSagaWatcher } from './movieSaga';
import { searchSagaWatcher } from './searchSaga';

export function* rootWatcher() {
  yield all([mainSagaWatcher(), searchSagaWatcher(), movieSagaWatcher()]);
}
