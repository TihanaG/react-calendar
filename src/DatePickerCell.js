import styled from "styled-components";

const Cell = styled.div`
    background-color: ${props => props.isSelected ? 'black' : 'white'};
    color: ${props => props.isSelected ? 'white' : 'black'};
    border: 1px solid #eee;
    position: relative;
    height: 100%;

    :hover {
        background-color: ${props => props.isSelected ? 'black' : '#eee'};
    }
`;

export const DatePickerCell = ({ isSelected, dateNumber = '' }) => {
    return (
        <Cell isSelected={isSelected}>
            {dateNumber}
        </Cell>
    )
}