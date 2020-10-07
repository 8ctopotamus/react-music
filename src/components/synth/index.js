import React, {useEffect} from "react";
import { useAppContext } from "../../context";
import Pad from './pad';

const styles = {
    display: 'grid',
    gridGap: 10,
    gridTemplateColumns: 'repeat(4, 1fr)',
};

export default () => {
    const { state } = useAppContext();
    let synth = state.synth;
    
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [state.instrument, state.scale]);

    synth.toDestination();

    const handleKeyDown = e => {
        playSound(e.key);
    };

    const playSound = targetLetter => {
        const foundNote = state.scale.find(({letter}) => letter === targetLetter);
        if (foundNote) {
            synth.triggerAttackRelease(foundNote.note, '4n');
        }
    };

    return (
        <div style={styles}>
           {state.scale.map(note => <Pad {...note} playSound={playSound} key={note.letter} /> )}
        </div>
    )
}
