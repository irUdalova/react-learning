import { PayloadAction } from '@reduxjs/toolkit';
import { getItemsAmountSort, TItemsAmountSort } from 'api/helpers';
import { call, put, takeEvery } from 'redux-saga/effects';
import { error, loadSortData } from 'store/redusers/mainSlice';
import { TPayloadLoadData } from 'types';
import { LOAD_MAIN_DATA } from './constants';

export const loadMainDataSaga = (payload: TItemsAmountSort) => ({
  type: LOAD_MAIN_DATA,
  payload,
});

function* loadSortDataWorker(action: PayloadAction<TItemsAmountSort>) {
  try {
    const data: TPayloadLoadData = yield call(getItemsAmountSort, action.payload);
    yield put(loadSortData(data));
  } catch {
    yield put(error());
  }
}

export function* mainSagaWatcher() {
  yield takeEvery(LOAD_MAIN_DATA, loadSortDataWorker);
}
