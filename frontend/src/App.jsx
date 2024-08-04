import React from 'react'
import './App.css';
import Data from './components/Data';
import Home from './components/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/data' element={<Data />} />
        
      </Routes>
    </Router>
  );
}
export default App;