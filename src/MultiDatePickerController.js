import moment from "moment";
import styled from "styled-components";
import { useState } from 'react'
import { Calendar } from "./Calendar"
// import { DatePickerCell } from "./DatePickerCell";
import { DropdownWindow } from "./DropdownWindow";
// import { PillCell } from "./PillCell";
import { MultiPillCell } from "./MultiPillCell";

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

const getPreviousDateIsSelected = (dateMoment, selectedDates) => {
    const oneDayBefore = dateMoment.clone().subtract(1, 'day')
    return selectedDates.some(date => date.isSame(oneDayBefore, 'date'))
}

const getNextDateIsSelected = (dateMoment, selectedDates) => {
    const oneDayAfter = dateMoment.clone().add(1, 'day')
    return selectedDates.some(date => date.isSame(oneDayAfter, 'date'))
}

const getDatePosition = (dateMoment, selectedDates) => {
    const previousIsSelected = getPreviousDateIsSelected(dateMoment, selectedDates)
    const nextIsSelected = getNextDateIsSelected(dateMoment, selectedDates)
    const isSelected = selectedDates.some(date => date.isSame(dateMoment, 'date'))
    
    return {
        isSelected,
        isStart: isSelected && !previousIsSelected && nextIsSelected,
        isEnd: isSelected && previousIsSelected && !nextIsSelected,
        isInBetween: isSelected && previousIsSelected && nextIsSelected
    }
}

export const MultiDatePickerController = () => {
    const [shouldShowDropdown, setShouldShowDropdown] = useState(false) //hidden
    const [selectedDates, setSelectedDates]  = useState([])
    
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
        const clickedMoment = moment(`${date}${month}${year}`, 'DD/MM/YYYY')
        

        const isSelected = selectedDates.some(date => date.isSame(clickedMoment, 'date'))

        if (isSelected) {
            setSelectedDates(selectedDates.filter(date => !date.isSame(clickedMoment, 'date')))
        } else {
            setSelectedDates(selectedDates.concat(clickedMoment))
        }
    }

    return (
        <Container>
            <DateInput
                readOnly
                onClick={() => {
                    setShouldShowDropdown(true)
                }}
                value={selectedDates.map(date => date.format('MM/DD/YYYY')).join(', ')} />
            <DropdownWindow
                shouldShow={shouldShowDropdown}
                onRequestClose={() => {
                    setShouldShowDropdown(false)
                }}>
                <CalendarContainer>
                    <Calendar
                        getCellProps={(dayMoment) => {
                            const { isSelected, isStart, isEnd, isInBetween } = getDatePosition(dayMoment, selectedDates)

                            return {
                                isSelected,
                                isStart,
                                isEnd,
                                isInBetween
                            }
                        }}
                        onCellClicked={onDateSelected}
                        month={currentMonthMoment.format('MM')}
                        year={currentMonthMoment.format('YYYY')}
                        onPrev={decrementMonth}
                        onNext={incrementMonth}
                        cellComponent={MultiPillCell} />
                </CalendarContainer>
            </DropdownWindow>
        </Container>
    )
}