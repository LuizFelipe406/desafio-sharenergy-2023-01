import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import RandomUsers from './pages/RandomUsers';
import HttpCat from './pages/HttpCat';
import RandomDog from './pages/RandomDog';
import Clients from './pages/Clients';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />}/>
      <Route path="/randomUsers" element={<RandomUsers />}/>
      <Route path="/httpCat" element={<HttpCat />}/>
      <Route path="/randomDog" element={<RandomDog />}/>
      <Route path="/clients" element={<Clients />}/>
    </Routes>
  );
}

export default App;
