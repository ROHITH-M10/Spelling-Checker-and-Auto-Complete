import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Data from './Data';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';


// Render the root component, which includes the Router and Routes setup
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Data />
  </React.StrictMode>
);
