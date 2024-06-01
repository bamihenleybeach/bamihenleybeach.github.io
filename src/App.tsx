import React from 'react';
import './App.css';

function App() {
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
                <button>Done</button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
