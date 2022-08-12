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

export const DateRangePickerController = () => {
    const [shouldShowDropdown, setShouldShowDropdown] = useState(false) //hidden
    const [selectedStartDate, setSelectedStartDate] = useState(null)
    const [selectedEndDate, setSelectedEndDate] = useState(null)

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
        if (startDateInputIsActive) {
            setSelectedStartDate(moment(`${date}${month}${year}`, 'DD/MM/YYYY'))
            setStartDateInputIsActive(false)
            setEndDateInputIsActive(true)
        } else {
            setSelectedEndDate(moment(`${date}${month}${year}`, 'DD/MM/YYYY'))
            setEndDateInputIsActive(false)
            //setStartDateInputIsActive(true)
            //setShouldShowDropdown(false) // kada se klikne na datum kalendar nestane
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