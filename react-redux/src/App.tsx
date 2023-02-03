/* eslint-disable @typescript-eslint/no-explicit-any */
import { Layout } from 'components/layout/Layout';
import About from 'pages/about/About';
import { MainPage } from 'pages/mainPage/MainPage';
import NotFound from 'pages/notFound/NotFound';
import { Member } from 'pages/member/Member';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { SearchPage } from 'pages/searchPage/SearchPage';
import { MoviePage } from 'pages/moviePage/MoviePage';
import { store } from 'store/store';
import { Provider } from 'react-redux';

export default function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="/:id" element={<MoviePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/member" element={<Member />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Provider>
  );
}
