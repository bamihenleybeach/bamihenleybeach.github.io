import React, { useContext, useState } from 'react';
import './App.css';
import { AppContext } from './AppContext';
import { writeNewOrder, writeVersion } from './utils/firebaseUtils';

function App() {
  const {state} = useContext(AppContext);

  const onClickDone = () => {
    writeVersion();
  }

  const onSubmitNewOrder = () => {
    writeNewOrder(new Date().getTime());
    writeVersion();
  }

  return (
    <div className="container">
      <div className="row">
        <div className="column">
          <h1 className="title done">DONE</h1>
          <ul className="done">
            <li>
              <div className="record">
                <h2>Mark</h2>
                <button>Delivered</button>
              </div>
            </li>
            <li>
              <div className="record">
                <h2>Mark</h2>
                <button>Delivered</button>
              </div>
            </li>
          </ul>
        </div>
        <div className="column">
          <h1 className="title doing">DOING</h1>
          <ul className="doing">
            <li>
              <div className="record">
                <h2>Mark</h2>
                <button>Done</button>
              </div>
            </li>
            <li>
              <div className="record">
                <h2>Mark</h2>
                <button onClick={onClickDone}>Done</button>
              </div>
            </li>
          </ul>
        <i>{state.version}</i>
        </div>
      </div>
      <form onSubmit={onSubmitNewOrder}>
        <div className="input-group">
          <div className="customer-name-input">
            <input id="customer-name" type="text" placeholder="Customer Name"/>
          </div>
          <div className="customer-name-button">
            <button id="add-order" type="submit">Add</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default App;
