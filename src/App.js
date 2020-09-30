import React from 'react';
import { AppContextProvider } from './context';
import Layout from './components/layout';

function App() {

  return (
      <AppContextProvider>
          <Layout>

          </Layout>
      </AppContextProvider>
  );
}

export default App;
