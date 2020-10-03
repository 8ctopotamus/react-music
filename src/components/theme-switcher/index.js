import React from "react";
import { useAppContext } from "../../context";

const styles = {
    marginBottom: 20
};

export default ()=> {
    const { state, dispatch } = useAppContext();

    return (
        <select
            onChange={e => dispatch({ type: 'TOGGLE_THEME', payload: e.target.value })}
            value={state.theme}
            style={styles}
        >
            <option value='dark'>dark</option>
            <option value='light'>light</option>
        </select>
    )
}
