import React, {useEffect} from "react";
import { PolySynth, MonoSynth, Distortion, Chorus, BitCrusher } from 'tone';
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
    }, [state.theme]);

    let synth;
    const distortedTone = new Distortion(0.8).toDestination();
    const chorusTone = new Chorus(3, 2, .5).toDestination();
    const bitCrusherTone = new BitCrusher(4).toDestination();

    if (state.theme === 'light') {
        synth = new PolySynth();
        synth.connect(distortedTone);
    } else {
        synth = new MonoSynth();
        synth.connect(bitCrusherTone);
    }



    // synth.toDestination();

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
