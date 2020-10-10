import React from "react";
import styled from 'styled-components'
import { useAppContext } from '../../context';
import ThemeSwitcher from '../theme-switcher'
import Synth from '../synth'
import InstrumentSwitcher from '../instrument-switcher';
import ScaleSwitcher from '../scale-switcher';
import Volume from '../volume';
import Effects from '../effects';

const Layout = styled.div`
    display: grid;
    place-items: center;
    height: 100vh;
    background: ${({ theme }) => theme === 'dark' ? '#061E3E' : 'rgba(39,62,6,0.49)'};
`

const Grid = styled.div`
    display: grid;
    grid-template-columns: 3fr 1fr;
    grid-gap: 30px;
    max-width: 800px;
    @media(max-width: 820px) {
        display: block;
    }
`

export default ({ children }) => {
    const { state } = useAppContext();

    return (
        <Layout theme={state.theme}>
            <div>
                <Grid>         
                    <div>
                        <ThemeSwitcher />
                        <ScaleSwitcher />
                        <InstrumentSwitcher />
                        <Synth />
                        {children}
                    </div>
                    <div>
                        <Volume/>
                        <Effects />
                    </div>
                </Grid>
            </div>
        </Layout>
    )
};
