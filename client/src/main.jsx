import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './style/index.css';
import initMocks from './test/server';

initMocks();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
