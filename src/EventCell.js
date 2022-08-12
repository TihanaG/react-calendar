import styled from "styled-components";
import { Event } from "./Event"

const Cell = styled.div`
    border: 1px solid #eee;
    position: relative;
    height: 100%;

    :hover {
        background-color: #eee;
    }
`;

export const EventCell = ({ dateNumber = '', events = [] }) => {
    return (
        <Cell>
            {dateNumber}
            {events.map(event => <Event key={event.name} name={event.name} time={event.time} />)}
        </Cell>
    )
}