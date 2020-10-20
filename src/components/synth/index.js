import React, {useEffect} from "react";
import {useAppContext} from "../../context";
import Pad from './pad';
import Bass from './bass';
import TestButton from './testButton';
import SongLibrary from './songLibrary';
import {BitCrusher, start, now, Phaser, PingPongDelay, Tremolo, Chorus, PolySynth, Transport, Part} from 'tone';

const styles = {
    display: 'grid',
    gridGap: 15,
    gridTemplateColumns: 'repeat(4, 1fr)',
};

export default () => {
    const { state } = useAppContext();

    // Set-up when component is mounted
    useEffect( () => {
        Transport.bpm.value = 90;
        console.log('bpm default is', Transport.bpm.value);
    }, []);

    let poly
    // Instrument
    let synth = new state.synth();
    synth.toDestination();

    // "part"
    let part = new Part;

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            synth.dispose();
            window.removeEventListener('keydown', handleKeyDown)
        };
    }, [state.instrument, state.scale, state.effects]);

    // Volume
    synth.volume.value = state.volume;

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
    if (state.instrument === 'AMSynth') {
        poly = new PolySynth().toDestination();
        poly.set({ detune: -1200 });
    }

    const handleKeyDown = e => {
        playSound(e.key);
    };

    const playSound = targetLetter => {
        const foundNote = state.scale.find(({letter}) => letter === targetLetter);
        if (foundNote) {
            synth.triggerAttackRelease(foundNote.note, '4n');
        }
        if (poly) {
            poly.triggerAttackRelease(['C3', 'E3', 'G3'], 1);
        }
    };

    const playChord = targetChord => {
        const foundChord = state.chord.find(({triad}) => triad === targetChord);
        console.log(foundChord.notes);
        if (foundChord) {
            const chorus = new Chorus(4, 2.5, 0.5);
            const polySynth = new PolySynth(4, synth).connect(chorus);
            polySynth.triggerAttackRelease(['C3', 'E3', 'G3'], '4n');
        }
    };

    const playAll = () => {
        for (let n = 0; n < state.scale.length; n++) {
            //console.log(state.scale[0].note, '8n', now() + ( n * .25))
            synth.triggerAttackRelease(state.scale[n].note, '8n', now() + ( n * .25) );
        }
    };

    const playScore= (score) => {
        part.clear();
        part.dispose();
        Transport.clear();
        Transport.timeSignature = score.timeSignature;
        part = new Part(((time, note) => {
            // the notes given as the second element in the array
            // will be passed in as the second argument
            synth.triggerAttackRelease(note, "16n", time);
        }), score.songArray).start(0);
        part.loop = 1;
        part.loopEnd = score.totalMeasures;
        Transport.start();
    }

    return (
        <>
            <div style={styles}>
                {state.scale.map(note => <Pad {...note} playSound={playSound} key={note.note} /> )}
                {/* {state.chord.map(allNotes => <Bass {...allNotes} playChord={playChord} key={allNotes.notes} />)} */}
            </div>

            <TestButton playAll={playAll} />
            <SongLibrary playScore={playScore} />
        </>
    )
}
