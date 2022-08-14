import moment from "moment";
import { BrowserRouter } from "react-router-dom"
import './App.css';
import { SingleDatePicker } from "./SingleDatePicker";
import { useState } from "react";
import { DateRangePicker } from "./DateRangePicker";
import { MultiDatePicker } from "./MultiDatePicker";

// import { EventTrackerController } from "./EventTrackerController";

function App() {
  /** Single Date Picker */
  const [selectedDate, setSelectedDate] = useState(null)

  const onDateSelected = (date, month, year) => {
    setSelectedDate(moment(`${date}${month}${year}`, 'DDMMYYYY'))
  }

  /** Date Range Picker */
  const [selectedStartDate, setSelectedStartDate] = useState(null)
  const [selectedEndDate, setSelectedEndDate] = useState(null)

  const onStartDateSelected = (date, month, year) => {
    setSelectedStartDate(moment(`${date}${month}${year}`, 'DDMMYYYY'))
  }

  const onEndDateSelected = (date, month, year) => {
    setSelectedEndDate(moment(`${date}${month}${year}`, 'DDMMYYYY'))
  }

  /** Multi Date Picker */
  const [selectedMultiDates, setSelectedMultiDates] = useState([])

  const onMultiDateSelected = (date, month, year) => {
        const clickedMoment = moment(`${date}${month}${year}`, 'DD/MM/YYYY')
        

        const isSelected = selectedMultiDates.some(date => date.isSame(clickedMoment, 'date'))

        if (isSelected) {
          setSelectedMultiDates(selectedMultiDates.filter(date => !date.isSame(clickedMoment, 'date')))
        } else {
          setSelectedMultiDates(selectedMultiDates.concat(clickedMoment))
        }
    }


  return (
    <div>
      <BrowserRouter>
        {selectedDate
          ? <h1>You have selected the date: {selectedDate.format('dddd, MMMM DD, YYYY')}</h1>
          : ''}
        <SingleDatePicker
          selectedDate={selectedDate ? selectedDate.format('DDMMYYYY') : ''}
          onDateSelected={onDateSelected}/>
        {(selectedStartDate && selectedEndDate)
        ? <h1>Your vacation goes from {selectedStartDate.format('dddd, MMMM DD, YYYY')} to {selectedEndDate.format('dddd, MMMM DD, YYYY')}</h1>
        : <h1>Select dates for your vacation</h1>}
        <DateRangePicker
          selectedStartDate={selectedStartDate ? selectedStartDate.format('DDMMYYYY') : ''}
          selectedEndDate={selectedEndDate ? selectedEndDate.format('DDMMYYYY') : ''}
          onStartDateSelected={onStartDateSelected}
          onEndDateSelected={onEndDateSelected} />
        {(selectedMultiDates.length > 0)
        ? <h1>You are busy on {selectedMultiDates.map(date => date.format('DD/MM/YYYY')).join(', ')}</h1>
        : <h1>Select some dates you will be unavailable</h1>}
        <MultiDatePicker
          selectedDates={selectedMultiDates}
          onMultiDateSelected={onMultiDateSelected} />
      </BrowserRouter>
    </div>
  );
}

export default App;
