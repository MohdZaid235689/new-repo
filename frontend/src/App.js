import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import Task from './components/Task';
import SignUpPage from './components/Signup';
import LoginPage from './components/login';
import { Toaster } from 'react-hot-toast';
import Mainapp from './components/mainapp';

function App() {
  console.log('render app..');

  return (
    
      <Routes>
        <Route path="/dashboard" element={<Mainapp/>} />
        <Route path="/" element={<LoginPage/>} />

        <Route path="dashboard/:projectId" element={<Task />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    
  );
}

export default App;
