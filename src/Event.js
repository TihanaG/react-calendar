import styled from "styled-components";

const EventBox = styled.div`
    background-color: black;
    border-radius: 4px;
    color: white;
    padding: 8px;
    margin-bottom: 4px;
`;

export const Event = ({ name, time }) => {
    return (
        <EventBox>{name} - {time}</EventBox>
    )
}