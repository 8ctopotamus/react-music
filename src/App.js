import React from 'react';
import { AppContextProvider } from './context';
import Layout from './components/layout';
import ModeSwitch from './components/mode-switch'

function App() {

  return (
      <AppContextProvider>
          <Layout>
<ModeSwitch/>
          </Layout>
      </AppContextProvider>
  );
}

export default App;
