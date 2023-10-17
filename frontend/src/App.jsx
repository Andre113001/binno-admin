import { useState } from 'react'
import './App.css'

import { Routes, Route } from "react-router-dom";

// Pages
import Login from './pages/Login';
import Members from './pages/Members';
import Dashboard from './pages/Dashboard';
import SystemSettings from './pages/SystemSettings';
import Announce from './pages/Announce';
import Contents from './pages/Contents';
import TestComponents from './pages/TestComponents';
import Missing from './pages/Missing';
import Requests from './pages/Requests';
import Calendar from './pages/Calendar';

function App() {

  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<Login/>} />

        {/* Private Route */}
        <Route path='/members' element={<Members/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/test' element={<TestComponents/>} />
        <Route path='/contents' element={<Contents/>} />
        <Route path='/settings' element={<SystemSettings/>} />
        <Route path='/announce' element={<Announce />}/>
        <Route path='/members/requests' element={<Requests />}/>
        <Route path='/calendar' element={<Calendar />}/>

        {/* Catch */}
        <Route path='/missing' element={<Missing />}/>
      </Routes>
    </>
  )
}

export default App
