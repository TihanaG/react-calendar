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

export const SingleDatePicker = ( { selectedDate, onDateSelected }) => {
    const [shouldShowDropdown, setShouldShowDropdown] = useState(false) //hidden
    
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
                        getCellProps={(date, month, year) => {
                            const dayMoment = moment(`${date}${month}${year}`, 'DDMMYYYY')
                            
                            return {
                                isSelected: dayMoment.isSame(selectedDate, 'date')
                            }
                        }}
                        onCellClicked={ (day, month, year) => {
                            onDateSelected(day, month, year)
                            setShouldShowDropdown(false) // kada se klikne na datum kalendar nestane
                        }}
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