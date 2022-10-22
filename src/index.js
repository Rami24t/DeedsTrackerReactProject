import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

// in root.render we can render multiple things by adding commas

root.render(
  
    <BrowserRouter>
      <App />
    </BrowserRouter>
);
