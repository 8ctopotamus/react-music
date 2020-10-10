import React, { useEffect } from "react";
import { useAppContext } from "../../context";
import Pad from './pad';
import TestButton from './testButton';
import { now, PingPongDelay, Tremolo, Phaser } from 'tone';

const styles = {
    display: 'grid',
    gridGap: 10,
    gridTemplateColumns: 'repeat(4, 1fr)',
};

export default () => {
    const { state } = useAppContext();
    
    // Instrument
    let synth = new state.synth();
    synth.toDestination();

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        };
    }, [state.instrument, state.scale, state.effects]);

    // Volume
    synth.volume.value = state.volume

    // Effects
    if (state.effects.PingPongDelay) {
        const pingPong = new PingPongDelay("4n", 0.2).toDestination();
        synth.connect(pingPong);
    }

    if (state.effects.Tremelo) {
        const tremolo = new Tremolo(9, 0.75).toDestination().start();
        synth.connect(tremolo);
    }

    if (state.effects.Phaser) {
        const phaser = new Phaser({
            frequency: 15,
            octaves: 5,
            baseFrequency: 100
        }).toDestination();
        synth.connect(phaser);
    }

    const handleKeyDown = e => {
        playSound(e.key);
    };

    const playSound = targetLetter => {
        const foundNote = state.scale.find(({letter}) => letter === targetLetter);
        if (foundNote) {
            synth.triggerAttackRelease(foundNote.note, '4n');
        }
    };

    const playAll = () => {
        for (let n = 0; n < state.scale.length; n++) {
            synth.triggerAttackRelease(state.scale[n].note, '8n', now() + ( n * .25) );
        }
    }

    return (
        <>
        <div style={styles}>
           {state.scale.map(note => <Pad {...note} playSound={playSound} key={note.letter} /> )}
        </div>
        <TestButton playAll={playAll} />
        </>
    )
}
