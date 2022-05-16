import firebase from 'firebase';

// eslint-disable-next-line no-unused-vars
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyANJNAZ_YyZ0tOcw3GxRpcIqggKSJcO5CI",
    authDomain: "insta-clone-91559.firebaseapp.com",
    projectId: "insta-clone-91559",
    storageBucket: "insta-clone-91559.appspot.com",
    messagingSenderId: "209421020205",
    appId: "1:209421020205:web:c8e2da217dff7c65325ca4",
    measurementId: "G-K2SWH0QE9L"
  });

  const db = firebase.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();
  const functions = firebase.functions();

  export {db, auth, storage, functions};

