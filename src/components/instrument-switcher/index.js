import React from 'react';
import { useAppContext } from '../../context';

import instruments from '../../context/instruments'

export default () => {
    const { state, dispatch } = useAppContext();

    return (
        <select onChange={e => dispatch({ type: 'CHANGE_INSTRUMENT', payload: e.target.value })} value={state.instrument}>
            {instruments.map( i => <option value={i}>{i}</option>)}
        </select>
    );
}
