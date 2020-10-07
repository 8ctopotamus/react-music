import React from 'react';
import { useAppContext } from '../../context';

// import instruments from '../../context/instruments'

export default () => {
    const { state, dispatch } = useAppContext();
    const instruments = state.instrumentOptions
    return (
        <select onChange={e => {
            dispatch({ type: 'CHANGE_INSTRUMENT', payload: e.target.value })
            e.target.blur()
        }} value={state.instrument}>
            {instruments.map( i => <option key={i} value={i}>{i}</option>)}
        </select>
    );
}
