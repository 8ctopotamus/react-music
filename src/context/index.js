import React, { createContext, useContext, useReducer } from "react";
import scales from './scales';

const initialState = {
    theme: 'dark',
    scale: scales['chromatic'],
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
                    scale: scales[action.payload]
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
