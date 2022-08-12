import { BrowserRouter } from "react-router-dom"
import React from 'react';
import './App.css';
// import { SingleDatePickerController } from "./SingleDatePickerController";
// import { DateRangePickerController } from "./DateRangePickerController";
import { MultiDatePickerController } from "./MultiDatePickerController";

// import { EventTrackerController } from "./EventTrackerController";


function App() {
  return (
    <div>
      <BrowserRouter>
        <MultiDatePickerController />
      </BrowserRouter>
    </div>
  );
}

export default App;
