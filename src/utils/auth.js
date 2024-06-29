import {
  getAuth,
  /*createUserWithEmailAndPassword,*/
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from 'firebase/auth';

const auth = getAuth();
const USERNAME = 'admin@henley.com';
const PASSWORD = 'hlb@500';

const login = async (email, password) => {
  let user = null;
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    // console.log(userCredential);
    // Signed in
    const user = userCredential.user;
    // console.log(user);
    console.log(user.uid);
    // console.log(user.accessToken);
    // console.log(user.refreshToken);
  } catch (error) {
    console.log(error);
    // const errorCode = error.code;
    // const errorMessage = error.message;
    // console.log(errorCode);
    // console.log(errorMessage);
  }
  return user;
}

onAuthStateChanged(auth, async (user) => {
  // console.log('onAuthStateChanged', user);
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    console.log('onAuthStateChanged', uid);
    // ...
  } else {
    await login(USERNAME, PASSWORD);
  }
});

const initAuth = async () => {
  // await login(USERNAME, PASSWORD);
}

/*const createUser = async (email, password) => {
  let user = null;
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log(userCredential);
    // Signed up
    user = userCredential.user;
    console.log(user);
  } catch (error) {
    console.log(error);
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
  }
  return user;
}*/

export {
  initAuth,
  // createUser,
  // login,
}