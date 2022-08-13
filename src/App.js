import moment from "moment";
import { BrowserRouter } from "react-router-dom"
import './App.css';
import { SingleDatePicker } from "./SingleDatePicker";
import { DateRangePickerController } from "./DateRangePickerController";
import { MultiDatePickerController } from "./MultiDatePickerController";
import { useState } from "react";

// import { EventTrackerController } from "./EventTrackerController";

function App() {
  const [selectedDate, setSelectedDate] = useState(null)

  const onDateSelected = (date, month, year) => {
    setSelectedDate(moment(`${date}${month}${year}`, 'DDMMYYYY'))
  }

  return (
    <div>
      <BrowserRouter>
        {selectedDate
          ? <h1>You have selected the date: {selectedDate.format('dddd, MMMM DD, YYYY')}</h1>
          : ''}
        <SingleDatePicker
          selectedDate={selectedDate}
          onDateSelected={onDateSelected}/>
        <DateRangePickerController />
        <MultiDatePickerController />
      </BrowserRouter>
    </div>
  );
}

export default App;
