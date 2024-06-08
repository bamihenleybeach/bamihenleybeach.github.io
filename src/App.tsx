import { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './App.css';
import { useOrderModule } from './useOrderModule';
import {
  deleteOrder,
  updateCustomerName,
  updateOrderStatus,
  writeNewOrder,
} from './utils/firebaseUtils';

function App() {
  const params = new URLSearchParams(window.location.hash.replace('#', ''));
  const mode = params.get('mode');
  const {orders} = useOrderModule();

  const [openPopup, setOpenPopup] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerKey, setCustomerKey] = useState('');
  const closePopup = () => setOpenPopup(false);

  const onClickDone = (key: string) => {
    updateOrderStatus(key, "DONE");
  }

  const onClickDelivered = (key: string) => {
    deleteOrder(key);
  }

  const onClickChangeCustomerName = (key: string) => {
    const customerNameElm = (document.getElementById('customer-name-edit-input') as HTMLInputElement);
    const customerName = customerNameElm ? customerNameElm.value : '';
    if (customerName) {
      updateCustomerName(key, customerName);
      customerNameElm.value = '';
    }
    closePopup();
  }

  const onClickOpenPopup = (key: string, customerName: string) => {
    setCustomerName(customerName);
    setCustomerKey(key);
    setOpenPopup(true);
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
      <Popup
        modal
        open={openPopup}
        onClose={closePopup}
      >
        <div className="input-group">
          <div className="customer-name-input">
            <input
              id="customer-name-edit-input"
              type="text"
              placeholder="Customer Name"
              defaultValue={customerName}
            />
          </div>
          <div className="customer-name-button">
            <button
              id="customer-name-edit-submit"
              type="submit"
              onClick={() => {
                onClickChangeCustomerName(customerKey);
              }}
            >
              Change
            </button>
          </div>
        </div>
      </Popup>
      <div className="row">
        <div className="column">
          <h1 className="title done">Order Ready To Collect</h1>
          <ul className="done">
            {
              filteredStatus('DONE').map((order:any) =>
                <li key={order.key}>
                  <div className="record">
                    {
                      mode === 'admin' ?
                      <h2 onClick={() => onClickOpenPopup(order.key, order.customerName)}>{order && order.customerName}</h2>
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
          <h1 className="title doing">Preparing Order Number</h1>
          <ul className="doing">
            {
              filteredStatus('NEW').map((order:any) =>
                <li key={order.key}>
                  <div className="record">
                    {
                      mode === 'admin' ?
                      <h2 onClick={() => onClickOpenPopup(order.key, order.customerName)}>{order && order.customerName}</h2>
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
