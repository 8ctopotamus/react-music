import React, {useEffect} from "react";
import { AMSynth, DuoSynth, FMSynth, MembraneSynth, MetalSynth, MonoSynth, PluckSynth } from 'tone'; // synth instruments
import { Distortion, Chorus, BitCrusher } from 'tone'; // effects
import { useAppContext } from "../../context";
import Pad from './pad';
import { Tone } from 'tone/build/esm/core/Tone';

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

    // jd - commented out to permit changing inststument to match state
    //
    // if (state.theme === 'light') {
    //     synth = new PolySynth();
    //     synth.connect(distortedTone);
    // } else {
    //     synth = new MonoSynth();
    //     synth.connect(bitCrusherTone);
    // }

    switch (state.instrument[0]) {
        case "AMSynth":
            synth = new AMSynth();
            break;
        case "DuoSynth":
            synth = new DuoSynth();
            break;
        case "FMSynth":
            synth = new FMSynth();
            break;            
        case "MembraneSynth":
            synth = new MembraneSynth();
            break;
        case "MetalSynth":
            synth = new MetalSynth();
            break;
        case "MonoSynth":
            synth = new MonoSynth();
            break;            
        case "PluckSynth":
            synth = new PluckSynth();
            break;            
        default:
            synth = new AMSynth();
    }
    
    // jd - note, add effects here?

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
