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

export const SingleDatePickerController = () => {
    const [shouldShowDropdown, setShouldShowDropdown] = useState(false) //hidden
    const [selectedDate, setSelectedDate] = useState(null)    
    
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
        setSelectedDate(moment(`${date}${month}${year}`, 'DD/MM/YYYY'))
        setShouldShowDropdown(false) // kada se klikne na datum kalendar nestane
    }

    return (
        <Container>
            <DateInput
                readOnly
                onClick={() => setShouldShowDropdown(true)}
                value={selectedDate ? selectedDate.format('MM/DD/YYYY') : ''} />
            <DropdownWindow
                shouldShow={shouldShowDropdown}
                onRequestClose={() => {
                    setShouldShowDropdown(false)
                }}>
                <CalendarContainer>
                    <Calendar
                        getCellProps={(dayMoment) => {
                            return {
                                isSelected: dayMoment.isSame(selectedDate, 'date')
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