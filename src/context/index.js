import React, { createContext, useContext, useReducer } from "react";
import { AMSynth, DuoSynth, FMSynth, MembraneSynth, MetalSynth, MonoSynth, PluckSynth } from 'tone'; // synth instruments
import scales from './scales';

const synthInstruments = {
    "AMSynth": new AMSynth(),
    "DuoSynth": new DuoSynth(),
    "FMSynth": new FMSynth(),
    "MembraneSynth": new MembraneSynth(),
    "MetalSynth" : new MetalSynth(),
    "MonoSynth": new MonoSynth(),
    "PluckSynth": new PluckSynth()
};

const instruments = Object.keys(synthInstruments);
const notes = Object.keys(scales);

const initialState = {
    theme: 'light',
    noteOptions: notes,
    noteType: 'chromatic',
    scale: scales['chromatic'],
    instrumentOptions: instruments,
    instrument: 'AMSynth',
    synth: synthInstruments['AMSynth']
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
        case 'CHANGE_INSTRUMENT':
            console.log(action.payload)
            if (instruments.includes(action.payload)) {
                return {
                    ...state,
                    instrument: [action.payload],
                    synth: synthInstruments[action.payload]
                }
            } else {
                return state
            }
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
