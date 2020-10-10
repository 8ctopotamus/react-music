import React from 'react'
import { AppContextProvider } from './context'
import Layout from './components/layout'

export default () => (
  <AppContextProvider>
    <Layout />
  </AppContextProvider>
)
