import React, { createContext, useContext, useReducer } from "react";

const lightState = {
    mode: 'light',
    notes: [
        {
            letter: 'a',
            note: 'C4',
            color: '#345995',
        },
        {
            letter: 's',
            note: 'D4',
            color: '#e40066',
        },
        {
            letter: 'd',
            note: 'E4',
            color: '#03cea4',
        },
        {
            letter: 'f',
            note: 'F4',
            color: '#f4b333',
        },
        {
            letter: 'g',
            note: 'G4',
            color: '#fb4d3d',
        },
        {
            letter: 'h',
            note:  'A4',
            color: '#DABECA',
        },
        {
            letter: 'j',
            note:  'B4',
            color: '#ACACDE',
        },
        {
            letter: 'k',
            note:  'C5',
            color: '#87FF65',
        }
    ]
};
const darkState = {
    mode: 'dark',
    notes: [
        {
            letter: 'a',
            note: 'E3',
            color: '#251e3e',
        },
        {
            letter: 's',
            note: 'F#3',
            color: '#451e3e',
        },
        {
            letter: 'd',
            note: 'G3',
            color: '#651e3e',
        },
        {
            letter: 'f',
            note: 'A3',
            color: '#851e3e',
        },
        {
            letter: 'g',
            note: 'B3',
            color: '#007a80',
        },
        {
            letter: 'h',
            note:  'C4',
            color: '#fb4d3d',
        },
        {
            letter: 'j',
            note:  'D#4',
            color: '#3EAB3B',
        },
        {
            letter: 'k',
            note:  'E4',
            color: '#03cea4',
        }
    ]
};

const AppContext = createContext(lightState);

const { Provider } = AppContext;

const reducer = (state, action) => {
  switch(action.type){
      case 'TOGGLE_MODE':
          return action.payload === 'light' ? lightState : darkState;
      default:
          return state;
  }
};

const AppContextProvider = props => {
    const [state, dispatch] = useReducer(reducer, lightState);
    return <Provider value={{state, dispatch}}>{props.children}</Provider>;
};

const useAppContext = () => {
    return useContext(AppContext);
};

export { AppContextProvider, useAppContext };
