import React from "react";
import useKeyPress from "../../hooks/useKeyPress";

export default ({ letters, chord, color, playChord }) => {
    const isPressed = useKeyPress(letters);

    const styles = {
        width: 100,
        height: 100,
        borderRadius: 8,
        background: color,
        cursor: 'pointer',
        opacity: isPressed ? 1 : .75
    };

    return (
        <button style={styles} onClick={() => playChord(letters)}> {chord} </button>
    )
}
