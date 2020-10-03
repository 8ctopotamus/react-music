import React from 'react'
import { AppContextProvider } from './context'
import Layout from './components/layout'
import ThemeSwitcher from './components/theme-switcher'
import Synth from './components/synth'

export default () => (
  <AppContextProvider>
    <Layout>
      <ThemeSwitcher />
      <Synth />
    </Layout>
  </AppContextProvider>
)
