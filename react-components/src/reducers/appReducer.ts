/* eslint-disable  @typescript-eslint/no-explicit-any */

import { formReducer } from './formReducer';
import { mainReducer } from './mainReducer';
import { searchReducer } from './searchReducer';
import { initialState } from 'App';

export type TReducerMap = {
  mainPage: 'mainReducer';
  formPage: 'formReducer';
  searchPage: 'searchReducer';
};

const appReducers = (reducersMap: any) => (state: any, action: any) =>
  Object.keys(reducersMap).reduce((newState, reducerName) => {
    const reducer = reducersMap[reducerName];
    const partialState = newState[reducerName];
    const initial = initialState[reducerName as keyof TReducerMap];

    return {
      ...newState,
      [reducerName]: reducer(partialState, action, initial),
    };
  }, state);

export default appReducers({
  mainPage: mainReducer,
  formPage: formReducer,
  searchPage: searchReducer,
});
