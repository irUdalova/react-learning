/* eslint-disable  @typescript-eslint/no-explicit-any */

import { formReducer } from './formReducer';
import { mainReducer } from './mainReducer';

const appReducers = (reducersMap: any) => (state: any, action: any) =>
  Object.keys(reducersMap).reduce((newState, reducerName) => {
    const reducer = reducersMap[reducerName];
    const partialState = newState[reducerName];
    return {
      ...newState,
      [reducerName]: reducer(partialState, action),
    };
  }, state);

export default appReducers({ mainPage: mainReducer, formPage: formReducer });
