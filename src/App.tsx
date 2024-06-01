import React, { useContext, useState } from 'react';
import './App.css';
import { AppContext } from './AppContext';
import { writeNewOrder, writeVersion } from './utils/firebaseUtils';

function App() {
  const params = new URLSearchParams(window.location.hash.replace('#', ''));
  const mode = params.get('mode');
  const {state} = useContext(AppContext);
  console.log(mode)
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
                {
                  mode == 'admin' ? <button>Delivered</button> : null
                }
              </div>
            </li>
            <li>
              <div className="record">
                <h2>Mark</h2>
                {
                  mode == 'admin' ? <button>Delivered</button> : null
                }
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
                {
                  mode == 'admin' ? <button>Done</button> : null
                }
              </div>
            </li>
            <li>
              <div className="record">
                <h2>Mark</h2>
                {
                  mode == 'admin' ? <button onClick={onClickDone}>Done</button> : null
                }
              </div>
            </li>
          </ul>
        <i>{state.version}</i>
        </div>
      </div>
<<<<<<< HEAD
      <form onSubmit={onSubmitNewOrder}>
=======
      {
        mode == 'admin' ? 
>>>>>>> 7e9acc8 (Update UI)
        <div className="input-group">
          <div className="customer-name-input">
            <input id="customer-name" type="text" placeholder="Customer Name"/>
          </div>
          <div className="customer-name-button">
<<<<<<< HEAD
            <button id="add-order" type="submit">Add</button>
          </div>
        </div>
      </form>
=======
            <button id="add-order" type="submit">Doing</button>
          </div>
        </div> : null
      }
>>>>>>> 7e9acc8 (Update UI)
    </div>
  );
}

export default App;
