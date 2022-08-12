import styled from "styled-components";

const Container = styled.div`
    box-sizing: border-box;
    cursor: pointer;
    height: 100%;
    min-height: 40px;
    padding: 4px 0;
`;

const Cell = styled.div`
    align-items: center;
    border-radius: 50%;
    ${props => props.isSelected && 'border-radius: 0;'}
    ${props => props.isStart && 'border-radius: 50% 0 0 50%;'}
    ${props => props.isEnd && 'border-radius: 0 50% 50% 0;'}
    
    background-color: ${props => props.isSelected ? 'red' : 'white'};
    color: ${props => props.isSelected ? 'white' : 'black'};
    display: flex;
    font-weight: bold;
    justify-content: center;
    height: 100%;

    :hover {
        color: white;
        background-color: ${props => props.isSelected ? 'red' : 'black'};
    }
`;

export const PillCell = ({
    isSelected,
    isStart,
    isEnd,
    dateNumber = '' }) => {
    return (
        <Container>
            <Cell
                isSelected={isSelected}
                isStart={isStart}
                isEnd={isEnd}>
                    {dateNumber}
            </Cell>
        </Container>
    )
}