import React, { useContext, useState } from 'react';
import './App.css';
import { AppContext } from './AppContext';
import { writeVersion } from './utils/firebaseUtils';

function App() {
  const {state} = useContext(AppContext);

  const onClickDone = () => {
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
                <button>Done</button>
              </div>
            </li>
            <li>
              <div>
                <h2>Mark</h2>
                <button onClick={onClickDone}>Done</button>
              </div>
            </li>
          </ul>
        <i>{state.version}</i>
        </div>
      </div>
      <div className="input-group">
        <div className="customer-name-input">
          <input id="customer-name" type="text" placeholder="Customer Name"/>
        </div>
        <div className="customer-name-button">
          <button id="submit" type="submit">Add</button>
        </div>
      </div>
    </div>
  );
}

export default App;
