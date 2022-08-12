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
    
    ${props => props.isSelected
        ? props.isStart
            ? 'border-radius: 50% 0 0 50%;'
            : props.isEnd
                ? 'border-radius: 0 50% 50% 0;'
                : props.isInBetween
                    ? 'border-radius: 0;'
                    : 'border-radius: 50%;'
        : 'border-radius: 50%;'}
    
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

export const MultiPillCell = ({
    isSelected,
    isStart,
    isEnd,
    isInBetween,
    dateNumber = '' }) => {
    return (
        <Container>
            <Cell
                isSelected={isSelected}
                isStart={isStart}
                isEnd={isEnd}
                isInBetween={isInBetween}>
                    {dateNumber}
            </Cell>
        </Container>
    )
}