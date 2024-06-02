import { initializeApp } from "@firebase/app";
import {
  child,
  get,
  getDatabase,
  onValue,
  push,
  ref,
  set,
  update,
} from "@firebase/database";

const firebaseConfig = {
  databaseURL: "https://henley-f45f3-default-rtdb.asia-southeast1.firebasedatabase.app",
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
   ref(db, "settings"), {
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
}

const updateOrderStatus = async (key, status) => {
  const dbRef = ref(getDatabase());
  return get(child(dbRef, `orders/${key}`)).then((snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      return set(ref(db, `orders/${key}`), {
        ...data,
        status,
        updatedDate: new Date(),
      });
    } else {
      console.log("No data available");
    }
  })
}

const deleteOrder = () => {

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