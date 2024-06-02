import React, { useContext, useState } from 'react';
import './App.css';
import { AppContext } from './AppContext';
import { updateOrderStatus, writeNewOrder, writeVersion } from './utils/firebaseUtils';

function App() {
  const params = new URLSearchParams(window.location.hash.replace('#', ''));
  const mode = params.get('mode');
  const {
    state: {
      version,
      orders,
    },
  } = useContext(AppContext);

  const onClickDone = () => {
    updateOrderStatus(orders[0].key, "DONE");
    writeVersion();
  }

  const onSubmitNewOrder = () => {
    writeNewOrder(new Date().getTime());
    writeVersion();
  }

  const renderList = () => {

  }

  const filteredStatus = (status: string) => {
    if (orders) {
      return orders.filter((o:any={}) => o && o.status === status);
    }
    return [];
  }

  return (
    <div className="container">
      <div className="row">
        <div className="column">
          <h1 className="title done">DONE</h1>
          <ul className="done">
            {
              filteredStatus('DONE').map((order:any) =>
                <li key={order.key}>
                  <div className="record">
                    <h2>{order && order.customerName}</h2>
                    {
                      mode === 'admin' ? <button>Delivered</button> : null
                    }
                  </div>
                </li>
              )
            }
          </ul>
        </div>
        <div className="column">
          <h1 className="title doing">DOING</h1>
          <ul className="doing">
            {
              filteredStatus('NEW').map((order:any) =>
                <li key={order.key}>
                  <div className="record">
                    <h2>{order && order.customerName}</h2>
                    {
                      mode === 'admin' ? <button onClick={onClickDone}>Done</button> : null
                    }
                  </div>
                </li>
              )
            }
          </ul>
        <i>{version}</i>
        </div>
      </div>
      {
        mode === 'admin' ? 
        <form onSubmit={onSubmitNewOrder}>
          <div className="input-group">
            <div className="customer-name-input">
              <input id="customer-name" type="text" placeholder="Customer Name"/>
            </div>
            <div className="customer-name-button">
              <button id="add-order" type="submit">Doing</button>
            </div>
          </div>
        </form>
        :
        null
      }
    </div>
  );
}

export default App;
