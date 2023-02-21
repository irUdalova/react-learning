import { PayloadAction } from '@reduxjs/toolkit';
import { getItemsAmountSearch, TItemsAmountSearch } from 'api/helpers';
import { call, put, takeEvery } from 'redux-saga/effects';
import { error, loading, loadSearchData } from 'store/redusers/searchSlice';
import { TPayloadLoadData } from 'types';
import { LOAD_SEARCH_DATA } from './constants';

export const loadSearchDataSaga = (payload: TItemsAmountSearch) => ({
  type: LOAD_SEARCH_DATA,
  payload,
});

function* loadSearchDataWorker(action: PayloadAction<TItemsAmountSearch>) {
  try {
    yield put(loading());
    const data: TPayloadLoadData = yield call(getItemsAmountSearch, action.payload);
    yield put(loadSearchData(data));
  } catch {
    yield put(error());
  }
}

export function* searchSagaWatcher() {
  yield takeEvery(LOAD_SEARCH_DATA, loadSearchDataWorker);
}
