import styled from "styled-components";

const TransparentBackground = styled.div`
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: transparent;
`;

const Window = styled.div`
    background-color: white;
    border-radius: 8px;
    box-shadow: 0px 5px 15px #aaa;
    padding: 20px;
    width: fit-content;
    position: absolute;
    z-index: 2;
`;

export const DropdownWindow = ({ children, shouldShow, onRequestClose }) => {
    return (
        <>
        {shouldShow && (
            <>
            <TransparentBackground onClick={onRequestClose} />
            <Window onClick={e => e.stopPropagation()/* Event stays in Modal when user click */}>
                {children}
            </Window>
            </>
        )}
        </>
    )
}
