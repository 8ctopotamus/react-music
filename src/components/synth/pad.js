import React from "react";
import styled from 'styled-components'
import useKeyPress from "../../hooks/useKeyPress";

const Pad = styled.button`
  width: 100%;
  height: 120px;
  border-radius: 8px;
  background: ${({color}) => color};
  cursor: pointer;
  opacity: ${(isPressed) => isPressed ? 1 : .75}
`

export default ({ letter, note, color, playSound }) => {
  const isPressed = useKeyPress(letter);

  return (
    <Pad
      onClick={() => playSound(letter)}
      isPressed={isPressed}
      color={color}
    >
      {note}
    </Pad>
  )
}
