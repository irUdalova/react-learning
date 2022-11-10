import { Layout } from 'components/layout/Layout';
import About from 'pages/about/About';
import { Movies } from 'pages/movies/Movies';
import NotFound from 'pages/notFound/NotFound';
import { Member } from 'pages/member/Member';
import React from 'react';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Movies />} />
          <Route path="/about" element={<About />} />
          <Route path="/member" element={<Member />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
