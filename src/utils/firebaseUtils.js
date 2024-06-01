import { initializeApp } from "@firebase/app";
import {
  child,
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
  const starCountRef = ref(db, 'settings/version');
  return onValue(starCountRef, (snapshot) => {
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



function writeNewOrder(customerName) {
  // A post entry.
  const orderData = {
    customerName,
    status: 'NEW',
  };

  // Get a key for a new Post.
  const newPostKey = push(child(ref(db), 'orders')).key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  const updates = {};
  updates['/orders/' + newPostKey] = orderData;
  // updates['/user-posts/' + uid + '/' + newPostKey] = orderData;

  return update(ref(db), updates);
}

export {
  readVersion,
  writeVersion,
  writeNewOrder,
}