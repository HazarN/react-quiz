// Libs
import React from 'react';
import ReactDOM from 'react-dom/client';

// Files
import './index.css';
import App from './App';
import { QuizProvider } from './contexts/QuizContext';

// Core render of the project
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QuizProvider>
      <App />
    </QuizProvider>
  </React.StrictMode>
);
