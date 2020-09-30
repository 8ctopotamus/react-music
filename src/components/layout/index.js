import React from "react";
import { useAppContext } from '../../context';

export default ({ children }) => {
    const { state } = useAppContext();

    const styles = {
        display: 'grid',
        placeItems: 'center',
        height: '100vh',
        background: state.mode === 'light' ? 'rgba(39,62,6,0.49)' : '#061E3E'
    };
    return (
        <div style={styles}>
            <div>{children}</div>
        </div>
    )
};
