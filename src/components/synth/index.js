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

    return (
        <div style={styles}>
           {state.notes.map(note => <Pad {...note} key={note.letter}/>)}
        </div>
    )
}
