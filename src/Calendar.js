import moment from "moment"
import styled from "styled-components"
import { getDaysInMonth, segmentIntoWeeks, padWeekFront, padWeekBack, daysOfTheWeek } from "./util"
import { CalendarCell } from "./CalendarCell";

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

const CalendarTableWrap = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
`;

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

export const Calendar = ({ onCellClicked, month, year, onPrev, onNext, events }) => {
    const currentMonthMoment = moment(`${month}${year}`, 'MMYYYY')

    const weeks = segmentIntoWeeks(getDaysInMonth(currentMonthMoment))

    return (
        <>
        <CalendarTableWrap >
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
                    const displayWeek = i === 0
                        ? padWeekFront(week)
                        : i === weeks.length - 1
                            ? padWeekBack(week)
                            : week
                    return (
                        <CalendarRow key={i}>
                            {displayWeek.map((dayMoment, j) => {
                                const eventsForDay = events.filter(event => {
                                    return event.date.isSame(dayMoment, 'day')
                                })

                                return (
                                    <CalendarCellWrap onClick={() => onCellClicked(
                                        dayMoment.format('DD'),
                                        dayMoment.format('MM'),
                                        dayMoment.format('YYYY')
                                    )}>
                                        {dayMoment
                                            ? <CalendarCell dateNumber={dayMoment.format('D')} events={eventsForDay} key={dayMoment.format('D')} />
                                            : <CalendarCell key={`${i}${j}`} />}
                                    </CalendarCellWrap>
                                )  
                            })}
                        </CalendarRow>
                    )
                })}
            </CalendarTable>
        </CalendarTableWrap>
        </>
    )
}