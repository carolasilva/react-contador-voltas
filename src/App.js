import React, { useState, useEffect } from 'react';
import './styles.css';

import MostraVoltas from './MostraVoltas';
import MostraTempo from './MostraTempo';
import Button from './Button';


function App() {
  const [numVoltas, setNumVoltas] = useState(0);
  const [running, setRunning] = useState(false);
  const [tempo, setTempo] = useState(0);

  useEffect(() => {
    let timer = 0;
    
    if(running) {
      timer = setInterval(() => {
        setTempo(old => old + 1)
      }, 1000)
    }
    
    return () => {
      if(timer) {
        clearInterval(timer);
      }
    }

  }, [running]);

  const toggleRunning = () => {
    setRunning(!running);
  }

  const increment = () => {
    if (numVoltas === 0 && !running)
      toggleRunning();
    setNumVoltas(numVoltas + 1);
  }

  const decrement = () => {
    if(numVoltas > 0)
      setNumVoltas(numVoltas - 1);
  }

  const reset = () => {
    setNumVoltas(0);
    setTempo(0);
  }

  const getTempo = () => {
    if (!running)
      return 0;
    if (numVoltas === 0)
      return tempo;
    return Math.round(tempo/numVoltas);
  }

  return ( 
    <div className='App'>
      <MostraVoltas voltas={numVoltas} />
      <Button text='+' className='bigger' onClick={increment} />
      <Button text='-' className='bigger' onClick={decrement} />
      <MostraTempo tempo={getTempo()} />
      <Button text={ running ? 'Pausar' : 'Iniciar'} onClick={toggleRunning} />
      <Button onClick={reset} text='Reiniciar' />
    </div>
  );
}

export default App;
