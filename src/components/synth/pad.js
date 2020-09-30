import React from "react";
import useKeyPress from "../../hooks/useKeyPress";

export default ({ letter, note, color, playSound }) => {
 const isPressed = useKeyPress(letter);

 const styles = {
  width: 100,
  height: 100,
  borderRadius: 8,
  background: color,
  cursor: 'pointer',
  opacity: isPressed ? 1 : .75
 };

 return (
     <button style={styles} onClick={() => playSound(letter)}> {note} </button>
 )
}
