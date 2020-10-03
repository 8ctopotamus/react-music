import React from 'react'
import { AppContextProvider } from './context'
import Layout from './components/layout'
import ThemeSwitcher from './components/theme-switcher'
import Synth from './components/synth'
import InstrumentSwitcher from './components/instrument-switcher';

export default () => (
  <AppContextProvider>
    <Layout>
      <ThemeSwitcher />
      <InstrumentSwitcher />
      <Synth />
    </Layout>
  </AppContextProvider>
)
