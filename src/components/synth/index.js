import React, {useEffect} from "react";
import { useAppContext } from "../../context";
import Pad from './pad';
import Bass from './bass';
import TestButton from './testButton';
import {now} from 'tone';

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

    const playChord = targetChord => {
        const foundChord = state.chord.find(({simultaneousNotes}) => simultaneousNotes === targetChord);
        if (foundChord) {
            synth.triggerAttackRelease(foundChord.chord, '4n');
        }
    };

    const playAll = () => {
        for (let n = 0; n < state.scale.length; n++) {
            synth.triggerAttackRelease(state.scale[n].note, '8n', now() + ( n * .25) );
        }
    };

    return (
        <>
        <div style={styles}>
           {state.scale.map(note => <Pad {...note} playSound={playSound} key={note.letter} /> )}
            {state.chord.map(allNotes => <Bass {...allNotes} playChord={playChord} key={allNotes.letters} />)}
        </div>
        <TestButton playAll={playAll} />
        </>
    )
}
