import moment from "moment";
import styled from "styled-components";
import { useState } from 'react'
import { Calendar } from "./Calendar"
// import { DatePickerCell } from "./DatePickerCell";
import { DropdownWindow } from "./DropdownWindow";
import { PillCell } from "./PillCell";
import { momentToNumbers } from "./util";

const Container = styled.div`
    position: relative;    
`;

const DateInput = styled.input`
    cursor: pointer;
`;

const CalendarContainer = styled.div`
    height: 600px;
    width: 600px;
`;

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

export const DateRangePicker = ({
    selectedStartDate,
    selectedEndDate,
    onStartDateSelected,
    onEndDateSelected }) => {

    const selectedStartDateMoment = selectedStartDate && moment(selectedStartDate, 'DDMMYYYY')
    const selectedEndDateMoment = selectedEndDate && moment(selectedEndDate, 'DDMMYYYY')

    const [shouldShowDropdown, setShouldShowDropdown] = useState(false) //hidden
    
    const selectedDates = (selectedStartDateMoment && selectedEndDateMoment && getDatesBetween(selectedStartDateMoment, selectedEndDateMoment)) || []

    const [startDateInputIsActive, setStartDateInputIsActive] = useState(false)
    const [/*endDateInputIsActive*/, setEndDateInputIsActive] = useState(false)
    
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
        const selectedMoment = moment(`${date}${month}${year}`, 'DDMMYYYY')
        if (startDateInputIsActive) {
            if ((selectedEndDateMoment && selectedMoment.diff(selectedEndDateMoment)) > 0) {
                // setSelectedStartDate(selectedEndDate)
                onStartDateSelected(...momentToNumbers(selectedEndDateMoment))
                onEndDateSelected(...momentToNumbers(selectedMoment))
                // setSelectedEndDate(selectedMoment)
            } else {
                onStartDateSelected(...momentToNumbers(selectedMoment))
                setStartDateInputIsActive(false)
                setEndDateInputIsActive(true)
            }
        } else {
            if ((selectedStartDateMoment && selectedMoment.diff(selectedStartDateMoment)) < 0) {
                onEndDateSelected(...momentToNumbers(selectedStartDateMoment))
                onStartDateSelected(...momentToNumbers(selectedMoment))
            } else {
                onEndDateSelected(...momentToNumbers(selectedMoment))
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
                value={selectedStartDateMoment ? selectedStartDateMoment.format('MM/DD/YYYY') : ''} />
                <DateInput
                readOnly
                onClick={() => {
                    setShouldShowDropdown(true)
                    setEndDateInputIsActive(true)
                    setStartDateInputIsActive(false)
                }}
                value={selectedEndDateMoment ? selectedEndDateMoment.format('MM/DD/YYYY') : ''} />
            <DropdownWindow
                shouldShow={shouldShowDropdown}
                onRequestClose={() => {
                    setShouldShowDropdown(false)
                    setStartDateInputIsActive(false)
                    setEndDateInputIsActive(false)
                }}>
                <CalendarContainer>
                    <Calendar
                        getCellProps={(date, month, year) => {
                            const dayMoment = moment(`${date}${month}${year}`, 'DDMMYYYY')
                            return {
                                isSelected:
                                    dayMoment.isSame(selectedStartDateMoment, 'date')
                                    || dayMoment.isSame(selectedEndDateMoment, 'date')
                                    || selectedDates.some(selectedDate => selectedDate.isSame(dayMoment, 'date')),
                                isStart: dayMoment.isSame(selectedStartDateMoment, 'date'),
                                isEnd: dayMoment.isSame(selectedEndDateMoment, 'date')
                            }
                        }}
                        onCellClicked={onDateSelected}
                        month={currentMonthMoment.format('MM')}
                        year={currentMonthMoment.format('YYYY')}
                        onPrev={decrementMonth}
                        onNext={incrementMonth}
                        cellComponent={PillCell} />
                </CalendarContainer>
            </DropdownWindow>
        </Container>
    )
}