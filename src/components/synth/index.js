import React, {useEffect} from "react";
// import { AMSynth, DuoSynth, FMSynth, MembraneSynth, MetalSynth, MonoSynth, PluckSynth } from 'tone'; // synth instruments
import { Distortion, Chorus, BitCrusher } from 'tone'; // effects
import { useAppContext } from "../../context";
import Pad from './pad';
// import { Tone } from 'tone/build/esm/core/Tone';

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
        console.log(e.key);
        playSound(e.key);
    };

    const playSound = targetLetter => {
        const foundNote = state.scale.find(({letter}) => letter === targetLetter);
        console.log(foundNote);
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
