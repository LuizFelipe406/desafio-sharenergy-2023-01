import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import RandomUsers from './pages/RandomUsers';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/randomUsers" element={<RandomUsers />}/>
      </Routes>
    </div>
  );
}

export default App;
