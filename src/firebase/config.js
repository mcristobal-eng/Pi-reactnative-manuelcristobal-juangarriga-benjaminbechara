import app from 'firebase/app';
import firebase from 'firebase';


const firebaseConfig = {
  apiKey: "AIzaSyDQaqomcGJ642D11aNaW0i9qbAoTx9EYT0",
  authDomain: "pi-reactnative.firebaseapp.com",
  projectId: "pi-reactnative",
  storageBucket: "pi-reactnative.firebasestorage.app",
  messagingSenderId: "710892978642",
  appId: "1:710892978642:web:2e3e8b9392bd90c6ed880b"
};


app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = app.firestore();
