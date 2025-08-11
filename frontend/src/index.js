import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.js';
import './tailwind.css';

// Standard React 18 entry point that mounts the entire application.
createRoot(document.getElementById('root')).render(<App />);
