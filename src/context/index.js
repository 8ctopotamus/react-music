import React, { createContext, useContext, useReducer } from "react";
import { AMSynth, DuoSynth, FMSynth, MembraneSynth, MetalSynth, MonoSynth, PluckSynth } from 'tone'; // synth instruments
import scales from './scales';
import chords from './chords';

const synthInstruments = {
    AMSynth,
    DuoSynth,
    FMSynth,
    MembraneSynth,
    MetalSynth,
    MonoSynth,
    PluckSynth
};

const instruments = Object.keys(synthInstruments);
const notes = Object.keys(scales);
const triads = Object.keys(chords);

const initialState = {
    theme: 'light',
    noteOptions: notes,
    chordOptions: triads,
    noteType: 'major',
    chordType: 'majorChords',
    scale: scales['major'],
    chord: chords['majorChords'],
    instrumentOptions: instruments,
    instrument: 'AMSynth',
    synth: synthInstruments['AMSynth'],
    volume: 0,
    effects: {
        BitCrusher: false,
        Phaser: false,
        PingPongDelay: false,
        Tremelo: false,
    }
};

const AppContext = createContext(initialState);

const { Provider } = AppContext;

const reducer = (state, action) => {
    switch (action.type) {
        case 'TOGGLE_THEME':
            return {
                ...state,
                theme: action.payload === 'dark' ? 'dark' : 'light'
            };
        case 'CHANGE_SCALE':
            if (action.payload) {
                return {
                    ...state,
                    noteType: [action.payload],
                    scale: scales[action.payload]
                }
            } else {
                return state
            }
        case 'CHANGE_CHORD':
            if (action.payload) {
                return {
                    ...state,
                    chordType: [action.payload],
                    chord: chords[action.payload]
                }
            } else {
                return state
            }
        case 'CHANGE_INSTRUMENT':
            if (instruments.includes(action.payload)) {
                return {
                    ...state,
                    instrument: [action.payload],
                    synth: synthInstruments[action.payload]
                }
            } else {
                return state
            }
        case 'CHANGE_VOLUME':
            return {
                ...state,
                volume: action.payload,
            };
        case 'TOGGLE_EFFECT':
            return {
                ...state,
                effects: {
                    ...state.effects,
                    [action.payload.name]: action.payload.value,
                }
            };
        default:
            return state;
    }


};

const AppContextProvider = props => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return <Provider value={{ state, dispatch }}>{props.children}</Provider>;
};

const useAppContext = () => {
    return useContext(AppContext);
};

export { AppContextProvider, useAppContext };
