import { BrowserRouter } from "react-router-dom"
import { QueryParamsCalendarControler } from './QueryParamsCalendarControler';
import React from 'react';
import './App.css';

function App() {
  return (
    <div>
      <BrowserRouter>
        <QueryParamsCalendarControler />
      </BrowserRouter>
    </div>
  );
}

export default App;
