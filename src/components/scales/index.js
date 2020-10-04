import React from 'react';
import { useAppContext } from '../../context';

export default () => {
    const { state, dispatch } = useAppContext();
    const scales = state.scale;
    return (
        <select onChange={e => dispatch({ type: 'CHANGE_SCALE', payload: e.target.value })} value={state.scale}>
            {scales.map( s => <option key={s} value={s}>{s}</option>)}
        </select>
    );
}
