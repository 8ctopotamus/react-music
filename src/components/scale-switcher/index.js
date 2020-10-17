import React from 'react';
import { useAppContext } from '../../context';

export default () => {
    const { state, dispatch } = useAppContext();
    const notes = state.noteOptions;
    const chords = state.chordOptions;

    return (
        <>
            <select onChange={e => dispatch({ type: 'CHANGE_SCALE', payload: e.target.value })} value={state.noteType}>
                {notes.map( s => <option key={s} value={s}>{s}</option>)}
            </select>

            <select onChange={e => dispatch({ type: 'CHANGE_CHORD', payload: e.target.value })} value={state.chordType}>
                {chords.map( c => <option key={c} value={c}>{c}</option>)}
            </select>
        </>
    );
}
