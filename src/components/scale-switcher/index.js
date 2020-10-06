import React from 'react';
import { useAppContext } from '../../context';
import scales from '../../context/scales';

export default () => {
    const { state, dispatch } = useAppContext();
    const notes = state.noteOptions;
    return (
        <select onChange={e => dispatch({ type: 'CHANGE_SCALE', payload: e.target.value })} value={state.noteOptions}>
            {notes.map( s => <option key={s} value={s}>{s}</option>)}
        </select>
    );
}
