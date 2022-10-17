import { Layout } from 'components/Layout';
import About from 'pages/About';
import Games from 'pages/Games';
import NotFound from 'pages/NotFound';
import { Player } from 'pages/Player';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
// import './App.css';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Games />} />
          <Route path="/about" element={<About />} />
          <Route path="/player" element={<Player />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
