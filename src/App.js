// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './HRM/AuthForm';
import Register from './HRM/Register';
import HRMSApp from './hrms';
import './App.css';

function App() {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/AuthForm" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/hrms" element={<HRMSApp/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
