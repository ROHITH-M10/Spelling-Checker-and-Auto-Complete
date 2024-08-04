import React from 'react';
import ReactDOM from "react-dom/client";
import App from './App';
import Data from './Data';
import Home from './Home';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';


ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);

