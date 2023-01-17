import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import RandomUsers from './pages/RandomUsers';
import HttpCat from './pages/HttpCat';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />}/>
      <Route path="/randomUsers" element={<RandomUsers />}/>
      <Route path="/httpCat" element={<HttpCat />}/>
    </Routes>
  );
}

export default App;
