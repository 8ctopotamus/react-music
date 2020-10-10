import React, { useEffect } from "react";
import { useAppContext } from "../../context";
import Pad from './pad';
import Bass from './bass';
import TestButton from './testButton';
import { now, BitCrusher, PingPongDelay, Tremolo, Phaser } from 'tone';

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
            synth.dispose()
            window.removeEventListener('keydown', handleKeyDown)
        };
    }, [state.instrument, state.scale, state.effects]);

    // Volume
    synth.volume.value = state.volume

    // Effects
    if (state.effects.BitCrusher) {
        const crusher = new BitCrusher(4).toDestination();
        synth.chain(crusher);
    }

    if (state.effects.PingPongDelay) {
        const pingPong = new PingPongDelay("4n", 0.2).toDestination();
        synth.chain(pingPong);
    }

    if (state.effects.Tremelo) {
        const tremelo = new Tremolo(9, 0.75).toDestination().start();
        synth.chain(tremelo);
    }

    if (state.effects.Phaser) {
        const phaser = new Phaser({
            frequency: 15,
            octaves: 5,
            baseFrequency: 100
        }).toDestination();
        synth.chain(phaser);
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
                {/* {state.chord.map(allNotes => <Bass {...allNotes} playChord={playChord} key={allNotes.letters} />)} */}
            </div>
            <TestButton playAll={playAll} />
        </>
    )
}
