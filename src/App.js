import React, { useState } from 'react';
import './App.css'

function App() {
  const [intervalId, setintervalId] = useState(null)
  const [isStarted, setIsStarted] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [pausedTime, setPausedTime] = useState(0)
  const [clockFace, setClockFace] = useState({hours: "00", mins: "00", secs: "00"})

  function startAndStop(evt) {
    
    if (isStarted === false | evt.target.name === 'reset') {
      
      if (evt.target.name === 'reset') {
        clearInterval(intervalId);
      }

      const startTime = Date.now();
      setIsStarted(true);
      
      setintervalId(setInterval(() => {
        if (isPaused === false) {
          const currentTime = Date.now();
          const deltaTime = currentTime - startTime;
          setPausedTime(deltaTime)
          setClockFace(getTimeComponents(deltaTime))
        }
        if (isPaused === true) {
          setIsPaused(false);
          const currentTime = Date.now();
          const deltaTime = currentTime - startTime + pausedTime;
          setClockFace(getTimeComponents(deltaTime))
        }
    }, 1000))
    }
    
    if (isStarted === true && isPaused === false) {
      clearInterval(intervalId)
      setClockFace({hours: "00", mins: "00", secs: "00"})
      setIsStarted(false)
    }
  }

  function wait(evt) {
    if (evt.target.name === 'wait' && evt.detail === 2) {
      clearInterval(intervalId)
      setIsPaused(true)
      setIsStarted(false);
      }
  }

  function getTimeComponents(time) {
  const hours = pad(
    Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
  );
  const mins = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
  const secs = pad(Math.floor((time % (1000 * 60)) / 1000));

  return { hours, mins, secs };
}

  function pad(value) {
    return String(value).padStart(2, '0');
  }

  return (
    <div className='wrapper'>
      <span className='clock-face'>{clockFace.hours}:{clockFace.mins}:{clockFace.secs}</span>
      <div className='buttons-wrapper'>
        <button onClick={startAndStop} className='button'>Start/Stop</button>
        <button className='button' onClick={wait} name='wait'>Wait</button>
        <button onClick={startAndStop} name='reset' className='button'>Reset</button>
      </div>
    </div>
  );
}

export default App;
