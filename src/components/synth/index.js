import React, {useEffect} from "react";
import { MetalSynth, PluckSynth } from 'tone';
import { useAppContext } from "../../context";
import Pad from './pad';

const styles = {
    display: 'grid',
    gridGap: 10,
    gridTemplateColumns: 'repeat(4, 1fr)',
};

export default () => {
    const { state } = useAppContext();
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [state.mode]);

    const synth = state.mode === 'light' ? new PluckSynth() : new MetalSynth();
    synth.toDestination();

    const handleKeyDown = e => {
        console.log(e.key);
        playSound(e.key);
    };

    const playSound = targetLetter => {
        const foundNote = state.notes.find(({letter}) => letter === targetLetter);
        console.log(foundNote);
        if (foundNote) {
            synth.triggerAttackRelease(foundNote.note, '8n');
        }
    };

    return (
        <div style={styles}>
           {state.notes.map(note => <Pad {...note} playSound={playSound} key={note.letter} /> )}
        </div>
    )
}
