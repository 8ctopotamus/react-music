import React from 'react';
import { AMSynth } from 'tone';

const synth = new AMSynth().toMaster();


function App() {
  return (
    <div className="App">
      App
        <button onClick={() =>synth.triggerAttackRelease('C4', '8n')}>Play</button>
    </div>
  );
}

export default App;
