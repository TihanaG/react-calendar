import { BrowserRouter } from "react-router-dom"
import React from 'react';
import './App.css';
// import { SingleDatePickerController } from "./SingleDatePickerController";
import { DateRangePickerController } from "./DateRangePickerController";
// import { EventTrackerController } from "./EventTrackerController";


function App() {
  return (
    <div>
      <BrowserRouter>
        <DateRangePickerController />
      </BrowserRouter>
    </div>
  );
}

export default App;
