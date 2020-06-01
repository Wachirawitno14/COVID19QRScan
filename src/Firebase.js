import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBw1Eq5cgPHZY2dyTnWghSyGmD0fdQ_7d0",
    authDomain: "covid19detector-e590e.firebaseapp.com",
    databaseURL: "https://covid19detector-e590e.firebaseio.com",
    projectId: "covid19detector-e590e",
    storageBucket: "covid19detector-e590e.appspot.com",
    messagingSenderId: "380806971238",
    appId: "1:380806971238:web:2d02c69dfef84b2d7c92a7",
    measurementId: "G-67PM71LX2C"
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export default firebase;