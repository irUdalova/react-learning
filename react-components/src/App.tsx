import { Layout } from 'components/Layout';
import About from 'pages/About';
import Home from 'pages/Home';
import NotFound from 'pages/NotFound';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
// import './App.css';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
