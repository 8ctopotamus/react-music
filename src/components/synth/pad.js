import React from "react";
import styled from 'styled-components'
import { darken } from 'polished'
import useKeyPress from "../../hooks/useKeyPress";

const Pad = styled.button`
  width: 120px;
  height: 120px;
  border-radius: 8px;
  margin-bottom: 10px;
  background: ${({color}) => color};
  border: none;
  cursor: pointer;
  font-size: 20px;
  position: relative;
  transition: all .1s ease;
  box-shadow: 0px 9px 0px ${({color}) => darken(.1, color)}, 0px 9px 25px rgba(0, 0, 0, .7);
  &:active {
    box-shadow: 0px 3px 0px ${({color}) => darken(.1, color)}, 0px 3px 6px rgba(0, 0, 0, .9);
    position: relative;
    top: 6px;
  }
  ${({ isPressed }) => isPressed && `
    box-shadow: 0px 3px 0px ${({color}) => darken(.1, color)}, 0px 3px 6px rgba(0, 0, 0, .9);
    position: relative;
    top: 6px;
  `}
`

export default ({ letter, note, color, playSound }) => {
  const isPressed = useKeyPress(letter);
  console.log(isPressed)
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
