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
    
    background-color: ${props => props.isInCurrentMonth
        ? props.isSelected ? 'red' : 'white'
        : props.isSelected ? 'lightpink' : 'white'};
    color: ${props => props.isSelected
        ? 'white'
        :props.isInCurrentMonth
            ? 'black'
            : '#aaa'};
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
    isInCurrentMonth,
    dateNumber = '' }) => {
    return (
        <Container>
            <Cell
                isSelected={isSelected}
                isStart={isStart}
                isEnd={isEnd}
                isInBetween={isInBetween}
                isInCurrentMonth={isInCurrentMonth}>
                    {dateNumber}
            </Cell>
        </Container>
    )
}