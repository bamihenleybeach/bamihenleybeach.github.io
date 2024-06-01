import React, { useContext, useState } from 'react';
import './App.css';
import { AppContext } from './AppContext';
import { writeVersion } from './utils/firebaseUtils';

function App() {
  const {state} = useContext(AppContext);

  const onPressDone = () => {
    console.log('here')
    writeVersion();
  }

  return (
    <div className="container">
      <div className="row">
        <div className="column">
          <h1 className="title">DONE</h1>
          <ul>
            <li>
              <div>
                <h2>Mark</h2>
                <button>Delivered</button>
              </div>
            </li>
            <li>
              <div>
                <h2>Mark</h2>
                <button>Delivered</button>
              </div>
            </li>
          </ul>
        </div>
        <div className="column">
          <h1 className="title">DOING</h1>
          <ul>
            <li>
              <div>
                <h2>Mark</h2>
                <button onClick={() => {
                  alert('213')
                }}>Done</button>
              </div>
            </li>
            <li>
              <div>
                <h2>Mark</h2>
                <button>Done</button>
              </div>
            </li>
          </ul>
        <b>{state.version}</b>
        </div>
      </div>
    </div>
  );
}

export default App;
