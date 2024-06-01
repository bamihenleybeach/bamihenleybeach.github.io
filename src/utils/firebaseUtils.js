import { initializeApp } from "@firebase/app";
import { getDatabase, onValue, ref, set } from "@firebase/database";

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
 return set(ref(db,'settings', {
  version: 'v0.1.1'
 }));
}

export {
  writeVersion, 
  readVersion,
}