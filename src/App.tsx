import React, { useContext, useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './App.css';
import { AppContext } from './AppContext';
import {
  updateOrderStatus,
  writeNewOrder,
  deleteOrder,
  updateCustomerName,
} from './utils/firebaseUtils';
import { useOrderModule } from './useOrderModule';

function App() {
  const params = new URLSearchParams(window.location.hash.replace('#', ''));
  const mode = params.get('mode');
  const {orders} = useOrderModule();

  const [openPopupDone, setOpenPopupDone] = useState(false);
  const [openPopupDoing, setOpenPopupDoing] = useState(false);
  const closeModalDone = () => setOpenPopupDone(false);
  const closeModalDoing = () => setOpenPopupDoing(false);

  const onClickDone = (key: string) => {
    updateOrderStatus(key, "DONE");
  }

  const onClickDelivered = (key: string) => {
    deleteOrder(key);
  }

  const onClickDoneChangeCustomerName = (key: string) => {
    const customerNameElm = (document.getElementById('customer-name-edit-input') as HTMLInputElement);
    const customerName = customerNameElm ? customerNameElm.value : '';
    if (customerName) {
      updateCustomerName(key, customerName);
      customerNameElm.value = '';
    }
    closeModalDone();
  }

  const onClickDoingChangeCustomerName = (key: string) => {
    const customerNameElm = (document.getElementById('customer-name-edit-input') as HTMLInputElement);
    const customerName = customerNameElm ? customerNameElm.value : '';
    if (customerName) {
      updateCustomerName(key, customerName);
      customerNameElm.value = '';
    }
    closeModalDoing();
  }

  const onSubmitNewOrder = () => {
    const customerNameElm = (document.getElementById('customer-name') as HTMLInputElement);
    const customerName = customerNameElm ? customerNameElm.value : '';
    if (customerName) {
      writeNewOrder(customerName);
      customerNameElm.value = '';
    }
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
                    {
                      mode === 'admin' ?
                      <Popup modal
                        open={openPopupDone}
                        trigger={<h2>{order && order.customerName}</h2>}
                        onClose={closeModalDone}
                      >
                        <div className="input-group">
                          <div className="customer-name-input">
                            <input
                              id="customer-name-edit-input"
                              type="text"
                              placeholder="Customer Name"
                              defaultValue={order.customerName}
                            />
                          </div>
                          <div className="customer-name-button">
                            <button id="customer-name-edit-submit" type="submit" onClick={() => onClickDoneChangeCustomerName(order.key)}>Change</button>
                          </div>
                        </div>
                      </Popup>
                      :
                      <h2>{order && order.customerName}</h2>
                    }
                    {
                      mode === 'admin' ?
                      <button onClick={() => onClickDelivered(order && order.key)}>Delivered</button>
                      :
                      null
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
                    {
                      mode === 'admin' ?
                      <Popup modal
                        open={openPopupDoing}
                        trigger={<h2>{order && order.customerName}</h2>}
                        onClose={closeModalDoing}
                      >
                        <div className="input-group">
                          <div className="customer-name-input">
                            <input
                              id="customer-name-edit-input"
                              type="text"
                              placeholder="Customer Name"
                              defaultValue={order.customerName}
                            />
                          </div>
                          <div className="customer-name-button">
                            <button id="customer-name-edit-submit" type="submit" onClick={() => onClickDoingChangeCustomerName(order.key)}>Change</button>
                          </div>
                        </div>
                      </Popup>
                      :
                      <h2>{order && order.customerName}</h2>
                    }
                    {
                      mode === 'admin' ?
                      <button onClick={() => onClickDone(order && order.key)}>Done</button>
                      :
                      null
                    }
                  </div>
                </li>
              )
            }
          </ul>
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
