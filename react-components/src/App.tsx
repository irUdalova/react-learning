/* eslint-disable @typescript-eslint/no-explicit-any */
import { Layout } from 'components/layout/Layout';
import About from 'pages/about/About';
import { Movies } from 'pages/movies/Movies';
import NotFound from 'pages/notFound/NotFound';
import { Member } from 'pages/member/Member';
import React, { useReducer } from 'react';
import { Routes, Route } from 'react-router-dom';
import appReducer from './reducers/appReducer';

const initialState = {
  mainPage: {
    search: '',
    isSearching: false,
    movies: [],
    isPopupOpen: false,
    popupMovieID: 0,
    totalResults: 0,
    isError: false,
    isLoading: false,
  },
  formPage: {
    cards: [],
    cardForm: {
      url: '',
      name: '',
      date: '',
      country: '',
      isAgreeTerms: false,
      isAgreePromo: false,
    },
    submitSuccess: false,
  },
};

export const AppStateContext = React.createContext<any>(initialState);
export const AppDispatchContext = React.createContext({} as React.Dispatch<any>);

export default function App() {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Movies />} />
            <Route path="/about" element={<About />} />
            <Route path="/member" element={<Member />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
}
