import React from "react";
import styled from 'styled-components';
import useKeyPress from "../../hooks/useKeyPress";

const Bass = styled.button`
  width: 100%;
  height: 120px;
  border-radius: 8px;
  background: ${({color}) => color};
  cursor: pointer;
  opacity: ${(isPressed) => isPressed ? 1 : .75}
`;

export default ({ letter, chord, color, playChord }) => {
    const isPressed = useKeyPress(letter);

    return (
        <Bass
            onClick={() => playChord(chord)}
            isPressed={isPressed}
            color={color}
        >
            {chord}
        </Bass>
    )
}
