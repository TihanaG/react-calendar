import moment from "moment"
import styled from "styled-components"
import { getDaysForWeeksInMonth,
    segmentIntoWeeks,
    daysOfTheWeek } from "./util"

const CalendarControlsWrap = styled.div`
    height: 15%;
`;
const CalendarControls = styled.div`
    margin: auto;
    max-width: 400px;
    text-align: center;

    button {
        width: 45%;
        margin: 0 2%;
    }
`;

/*const CalendarTableWrap = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
`;*/

const CalendarTable = styled.div`
    height: 85%;
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const CalendarRow = styled.div`
    display: flex;
    flex: 1;
`;

const CalendarHeading = styled.div`
    display: flex;
    flex-direction: row;
`;

const CalendarHeadingCell = styled.div`
    flex: 1;
    text-align: center;
`;

const CalendarCellWrap = styled.div`
    padding: 0px;
    flex: 1;
`;

export const Calendar = ({
    onCellClicked,
    month,
    year,
    onPrev,
    onNext,
    getCellProps,
    cellComponent: CellComponent }) => {
    const currentMonthMoment = moment(`${month}${year}`, 'MMYYYY')

    const weeks = segmentIntoWeeks(getDaysForWeeksInMonth(currentMonthMoment))

    return (
        <>
        <CalendarControlsWrap>
            <CalendarControls>
                <h1>{currentMonthMoment.format('MMMM YYYY')}</h1>
                <button onClick={onPrev}>Prev</button>
                <button onClick={onNext}>Next</button>
            </CalendarControls>
        </CalendarControlsWrap>
        <CalendarTable>
            <CalendarHeading>
                {daysOfTheWeek.map(day => <CalendarHeadingCell key={day}>{day}</CalendarHeadingCell>)}
            </CalendarHeading>
            {weeks.map((week, i) => {
                return (
                    <CalendarRow key={i}>
                        {week.map((dayMoment, j) => {
                            return (
                                <CalendarCellWrap
                                    key={dayMoment.format('MM/DD/YYYY')}
                                    onClick={() => onCellClicked(
                                        dayMoment.format('DD'),
                                        dayMoment.format('MM'),
                                        dayMoment.format('YYYY')
                                    )}>
                                    <CellComponent
                                        dateNumber={dayMoment.format('D')}
                                        isInCurrentMonth={dayMoment.isSame(currentMonthMoment, 'month')}
                                        {...getCellProps(
                                            dayMoment.format('DD'),
                                            dayMoment.format('MM'),
                                            dayMoment.format('YYYY')
                                        )} />
                                </CalendarCellWrap>
                            )  
                        })}
                    </CalendarRow>
                )
            })}
        </CalendarTable>
        </>
    )
}