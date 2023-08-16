import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EditUser from './components/js/EditUser';
import AddUser from './components/js/AddUser';
import Home from './components/js/Home';
import { UserProvider } from './components/js/UserContext';

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<AddUser />} />
            <Route path="/edit" element={<EditUser />} />
        </Routes> 
    </BrowserRouter>
  );
}

export default App;
