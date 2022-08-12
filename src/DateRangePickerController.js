import moment from "moment";
import styled from "styled-components";
import { useState } from 'react'
import { Calendar } from "./Calendar"
import { DatePickerCell } from "./DatePickerCell";
import { DropdownWindow } from "./DropdownWindow";

const Container = styled.div`
    position: relative;    
`;

const DateInput = styled.input`
    cursor: pointer;
`;

const CalendarContainer = styled.div`
    height: 400px;
    width: 600px;
`;

/* const dateIsBetween = (startDate, endDate, targetDate) => {
    return targetDate.diff(startDate, 'days') > 0
        && targetDate.diff(endDate, 'days') < 0
}*/

const getDatesBetween = (startDate, endDate) => {
    let currentDate = startDate.clone()
    let dates = []

    if (endDate.diff(startDate)> 0) {
        while (endDate.diff(currentDate) >= 0) {
            dates.push(currentDate.clone())
            currentDate.add(1, 'days')
        }
    }

    return dates
}

export const DateRangePickerController = () => {
    const [shouldShowDropdown, setShouldShowDropdown] = useState(false) //hidden
    const [selectedStartDate, setSelectedStartDate] = useState(null)
    const [selectedEndDate, setSelectedEndDate] = useState(null)
    const selectedDates = (selectedStartDate && selectedEndDate && getDatesBetween(selectedStartDate, selectedEndDate)) || []

    const [startDateInputIsActive, setStartDateInputIsActive] = useState(false)
    const [endDateInputIsActive, setEndDateInputIsActive] = useState(false)

    const today = moment();
    const [currentMonthMoment, setCurrentMonthMoment] = useState(today)

    const incrementMonth = () => {
        const newMonth = moment(currentMonthMoment.add(1, 'months'))
        setCurrentMonthMoment(newMonth)
    }

    const decrementMonth = () => {
        const newMonth = moment(currentMonthMoment.subtract(1, 'months'))
        setCurrentMonthMoment(newMonth)
    }

    const onDateSelected = (date, month, year) => {
        const selectedMoment = moment(`${date}${month}${year}`, 'DD/MM/YYYY')
        if (startDateInputIsActive) {
            if ((selectedEndDate && selectedMoment.diff(selectedEndDate)) > 0) {
                setSelectedStartDate(selectedEndDate)
                setSelectedEndDate(selectedMoment)
            } else {
                setSelectedStartDate(selectedMoment)
                setStartDateInputIsActive(false)
                setEndDateInputIsActive(true)
            }
        } else {
            if ((selectedStartDate && selectedMoment.diff(selectedStartDate)) < 0) {
                setSelectedEndDate(selectedStartDate)
                setSelectedStartDate(selectedMoment)
            } else {
                setSelectedEndDate(selectedMoment)
                setEndDateInputIsActive(false)
                setStartDateInputIsActive(true)
                //setShouldShowDropdown(false) // kada se klikne na datum kalendar nestane
            }
        }
    }

    return (
        <Container>
            <DateInput
                readOnly
                onClick={() => {
                    setShouldShowDropdown(true)
                    setStartDateInputIsActive(true)
                    setEndDateInputIsActive(false)
                }}
                value={selectedStartDate ? selectedStartDate.format('MM/DD/YYYY') : ''} />
                <DateInput
                readOnly
                onClick={() => {
                    setShouldShowDropdown(true)
                    setEndDateInputIsActive(true)
                    setStartDateInputIsActive(false)
                }}
                value={selectedEndDate ? selectedEndDate.format('MM/DD/YYYY') : ''} />
            <DropdownWindow
                shouldShow={shouldShowDropdown}
                onRequestClose={() => {
                    setShouldShowDropdown(false)
                    setStartDateInputIsActive(false)
                    setEndDateInputIsActive(false)
                }}>
                <CalendarContainer>
                    <Calendar
                        getCellProps={(dayMoment) => {
                            return {
                                isSelected:
                                    dayMoment.isSame(selectedStartDate, 'date')
                                    || dayMoment.isSame(selectedEndDate, 'date')
                                    || selectedDates.some(selectedDate => selectedDate.isSame(dayMoment, 'date'))
                            }
                        }}
                        onCellClicked={onDateSelected}
                        month={currentMonthMoment.format('MM')}
                        year={currentMonthMoment.format('YYYY')}
                        onPrev={decrementMonth}
                        onNext={incrementMonth}
                        cellComponent={DatePickerCell} />
                </CalendarContainer>
            </DropdownWindow>
        </Container>
    )
}