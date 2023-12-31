import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyCUuVPKIIokyXpoX9m0oM5Syc-6dFpl0tc",
  authDomain: "crwn-db-4bdc4.firebaseapp.com",
  databaseURL: "https://crwn-db-4bdc4.firebaseio.com",
  projectId: "crwn-db-4bdc4",
  storageBucket: "crwn-db-4bdc4.appspot.com",
  messagingSenderId: "201668846382",
  appId: "1:201668846382:web:b846f8050f7a7884aad0bf",
  measurementId: "G-75FCGE5DSS"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
