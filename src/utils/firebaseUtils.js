import { initializeApp } from '@firebase/app';
import { getAnalytics } from 'firebase/analytics';
import {
  child,
  // get,
  getDatabase,
  onValue,
  push,
  ref,
  set,
  update,
} from '@firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyA3OFpaKU8cmYxfGrRRPSyU3wqQtj0kDeA',
  // authDomain: 'henley-f45f3.firebaseapp.com',
  authDomain: 'bamihenleybeach.github.io',
  databaseURL: 'https://henley-f45f3-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'henley-f45f3',
  storageBucket: 'henley-f45f3.appspot.com',
  messagingSenderId: '516130321206',
  appId: '1:516130321206:web:8787d52e079fce2a177997',
  measurementId: 'G-FNKC8YEN60',
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);

const readVersion = (onValueChange) => {
  const myRef = ref(db, 'settings/version');
  return onValue(myRef, (snapshot) => {
    const data = snapshot.val();
    onValueChange(data);
  });
}

const writeVersion = () => {
 return set(
   ref(db, 'settings'), {
     version: new Date().toISOString(),
   });
}

const readOrders = (onValueChange) => {
  const myRef = ref(db, 'orders');
  return onValue(myRef, (snapshot) => {
    const data = [];
    snapshot.forEach((childSnapshot) => {
      const childKey = childSnapshot.key;
      const childData = childSnapshot.val();
      data.push({
        key: childKey,
        ...childData,
      });
    });
    onValueChange(data);
  });
}

const writeNewOrder = (customerName) => {
  // A post entry.
  const createdDate = new Date();
  const orderData = {
    customerName,
    status: 'NEW',
    createdDate,
    updatedDate: createdDate,
  };

  // Get a key for a new Post.
  const newPostKey = push(child(ref(db), 'orders')).key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  const updates = {};
  updates['/orders/' + newPostKey] = orderData;
  // updates['/user-posts/' + uid + '/' + newPostKey] = orderData;

  return update(ref(db), updates);
}

const updateCustomerName = (key, newCustomerName) => {
  return set(ref(db, `orders/${key}/customerName`), newCustomerName);
}

const updateOrderStatus = async (key, status) => {
  return set(ref(db, `orders/${key}/status`), status);
}

const deleteOrder = (key) => {
  const updates = {};
  updates['/orders/' + key] = null;
  return update(ref(db), updates);
}

export {
  readVersion,
  writeVersion,
  readOrders,
  writeNewOrder,
  updateCustomerName,
  updateOrderStatus,
  deleteOrder,
}