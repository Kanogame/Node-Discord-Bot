import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './routes/header';
import "./styles.css"

const rootEl = document.getElementById("root");
const root = ReactDOM.createRoot(rootEl);
root.render(
  <App />
)
