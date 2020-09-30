import React from "react";
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

    const synth = state.mode === 'light' ? new PluckSynth() : new MetalSynth();
    synth.toDestination();

    const playSound = targetLetter => {
        const foundNote = state.notes.find(({letter}) => letter === targetLetter);
        console.log(note);
        if (note) {
            synth.triggerAttackRelease(foundNote.note, '8n');
        }
    };

    return (
        <div style={styles}>
           {state.notes.map(note => <Pad {...note} playSound={playSound} key={note.letter} /> )}
        </div>
    )
}
