import React from 'react';
import { AppContextProvider } from './context';
import Layout from './components/layout';
import ModeSwitch from './components/mode-switch'
import Synth from './components/synth';

function App() {

  return (
      <AppContextProvider>
          <Layout>
            <ModeSwitch/>
            <Synth/>
          </Layout>
      </AppContextProvider>
  );
}

export default App;
